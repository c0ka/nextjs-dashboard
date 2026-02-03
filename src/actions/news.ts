"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { auth } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const NewsSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Please enter a title." }),
  slug: z.string().min(1, { message: "Please enter a slug." }),
  content: z.string().min(1, { message: "Please enter content." }),
  excerpt: z.string().nullable(),
  status: z.enum(["draft", "published"], {
    invalid_type_error: "Please select a status.",
  }),
});

const CreateNews = NewsSchema.omit({ id: true });
const UpdateNews = NewsSchema.omit({ id: true });

export type NewsState = {
  errors?: {
    title?: string[];
    slug?: string[];
    content?: string[];
    excerpt?: string[];
    status?: string[];
  };
  message: string | null;
};

export async function createNewsPost(
  prevState: NewsState,
  formData: FormData,
): Promise<NewsState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Unauthorized. Please log in." };
  }

  const validatedFields = CreateNews.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    excerpt: formData.get("excerpt"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create News Post.",
    };
  }

  const { title, slug, content, excerpt, status } = validatedFields.data;
  const publishedAt = status === "published" ? new Date().toISOString() : null;

  try {
    await sql`
      INSERT INTO news (title, slug, content, excerpt, status, author_id, published_at)
      VALUES (${title}, ${slug}, ${content}, ${excerpt}, ${status}, ${session.user.id}, ${publishedAt})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create News Post.",
    };
  }

  revalidatePath("/dashboard/news");
  redirect("/dashboard/news");
}

export async function updateNewsPost(
  id: string,
  prevState: NewsState,
  formData: FormData,
): Promise<NewsState> {
  const validatedFields = UpdateNews.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    excerpt: formData.get("excerpt"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update News Post.",
    };
  }

  const { title, slug, content, excerpt, status } = validatedFields.data;
  const publishedAt = status === "published" ? new Date().toISOString() : null;

  try {
    // We only update published_at if it was previously null and now it's published
    await sql`
      UPDATE news
      SET title = ${title}, slug = ${slug}, content = ${content}, excerpt = ${excerpt}, status = ${status}, 
          published_at = COALESCE(published_at, ${publishedAt}),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update News Post.",
    };
  }

  revalidatePath("/dashboard/news");
  redirect("/dashboard/news");
}

export async function deleteNewsPost(
  id: string,
  formData: FormData,
): Promise<void> {
  try {
    await sql`DELETE FROM news WHERE id = ${id}`;
    revalidatePath("/dashboard/news");
  } catch (error) {
    console.error("Database Error: Failed to Delete News Post.", error);
    // Returning nothing (void) to satisfy React 19 form action requirements
  }
}
