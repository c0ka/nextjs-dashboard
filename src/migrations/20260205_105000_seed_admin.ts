import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.create({
    collection: "users",
    data: {
      email: "admin@payloadcms.com",
      password: "v8_X9#kL2mP$qR5t",
      roles: ["admin"],
    },
  });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  await payload.delete({
    collection: "users",
    where: {
      email: {
        equals: "admin@payloadcms.com",
      },
    },
  });
}
