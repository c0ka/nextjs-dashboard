import path from "path";
import { fileURLToPath } from "url";

import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import sharp from "sharp";

import { en } from "@payloadcms/translations/languages/en";
import { zh } from "@payloadcms/translations/languages/zh";

import { Posts } from "./collections/Posts";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Categories } from "./collections/Categories";
import { Tags } from "./collections/Tags";
import { Authors } from "./collections/Authors";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // configuration for the Admin Panel, including Custom Components, Live Preview, etc.
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // Collections & Globals for Payload to manage.
  // Access Control, Hools, Admin Options, etc.
  collections: [Users, Posts, Media, Categories, Tags, Authors],
  globals: [],
  // Internationalization: Localization for the data & i18n for the interface.
  i18n: {
    supportedLanguages: { en, zh },
    fallbackLanguage: "en",
  },

  editor: lexicalEditor(),
  plugins: [payloadCloudPlugin()],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    },
  }),
  sharp,
});
