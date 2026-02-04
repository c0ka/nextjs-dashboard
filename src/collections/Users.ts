import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  dbName: "users", // Map to existing Supabase users table
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
