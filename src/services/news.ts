import postgres from "postgres";
import { News, NewsTable, NewsForm } from "@/types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredNews(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const news = await sql<NewsTable[]>`
      SELECT
        news.id,
        news.title,
        news.slug,
        news.excerpt,
        news.status,
        news.published_at,
        news.created_at,
        users.name AS author_name
      FROM news
      JOIN users ON news.author_id = users.id
      WHERE
        news.title ILIKE ${`%${query}%`} OR
        news.content ILIKE ${`%${query}%`} OR
        news.excerpt ILIKE ${`%${query}%`} OR
        users.name ILIKE ${`%${query}%`}
      ORDER BY news.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return news;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch news posts.");
  }
}

export async function fetchNewsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM news
    JOIN users ON news.author_id = users.id
    WHERE
      news.title ILIKE ${`%${query}%`} OR
      news.content ILIKE ${`%${query}%`} OR
      news.excerpt ILIKE ${`%${query}%`} OR
      users.name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of news pages.");
  }
}

export async function fetchNewsById(id: string) {
  try {
    const data = await sql<NewsForm[]>`
      SELECT
        id,
        title,
        slug,
        content,
        excerpt,
        status
      FROM news
      WHERE id = ${id}
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch news post.");
  }
}

export async function fetchNewsBySlug(slug: string) {
  try {
    const data = await sql<NewsTable[]>`
      SELECT
        news.*,
        users.name AS author_name
      FROM news
      JOIN users ON news.author_id = users.id
      WHERE news.slug = ${slug} AND news.status = 'published'
    `;

    return data[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch news article.");
  }
}

export async function fetchLatestNews(limit: number = 5) {
  try {
    const data = await sql<NewsTable[]>`
      SELECT
        news.*,
        users.name AS author_name
      FROM news
      JOIN users ON news.author_id = users.id
      WHERE news.status = 'published'
      ORDER BY news.published_at DESC
      LIMIT ${limit}
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch latest news.");
  }
}
