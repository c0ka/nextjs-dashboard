import type { CollectionConfig } from "payload";

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

import { isAnyone, isAuthenticated } from "@/lib/access";

import { Banner } from "@/blocks/Banner/config";
import { Code } from "@/blocks/Code/config";
import { MediaBlock } from "@/blocks/MediaBlock/config";
import { Quote } from "@/blocks/Quote/config";
import { YouTube } from "@/blocks/YouTube/config";

import { populateAuthors } from "./hooks/populateAuthors";
import { revalidateDelete, revalidatePost } from "./hooks/revalidatePost";
import { slugField } from "@/fields/slug";

// todo: SEO from plugin-seo, preview, slugField
export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt", "publishedAt"],
  },
  access: {
    create: isAuthenticated,
    read: isAnyone,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    // meta: {
    //   image: true,
    //   description: true,
    // },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      index: true,
    },
    ...slugField(),
    {
      name: "description",
      type: "textarea",
      label: "Description / subtitle",
      admin: {
        description: "Appears as subheading in the blog post preview.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    BlocksFeature({
                      blocks: [Banner, Code, MediaBlock, Quote, YouTube],
                    }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: "Content",
        },
        {
          fields: [
            {
              name: "thumb",
              type: "upload",
              relationTo: "media",
              required: false,
              admin: {
                description: "Will show up as the blog post cover. Required.",
              },
            },
            {
              name: "authors",
              type: "relationship",
              relationTo: "authors",
              hasMany: true,
              admin: {
                description: "Authors must be one or more. Required.",
              },
            },
            {
              name: "categories",
              type: "relationship",
              hasMany: true,
              relationTo: "categories",
              admin: {
                description: "Select only one category. Required.",
              },
            },
            {
              name: "readingTime",
              type: "number",
              admin: {
                hidden: true,
              },
            },
            {
              name: "tags",
              type: "relationship",
              relationTo: "tags",
              hasMany: true,
              admin: {
                description: "Tags can be one or more. Optional.",
              },
            },
            {
              name: "toc_depth",
              type: "number",
              defaultValue: 3,
              admin: {
                hidden: true,
              },
            },
          ],
          label: "Metadata",
        },
      ],
    },
    /**
     * "publishedAt" is only internal to cms to determine if the blog post is published or not, but it's not used for sorting blog posts in www
     * */
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            /**
             * Set the "date" field to the current date if user doesn't set it
             */
            if (!siblingData.date) {
              siblingData.date = new Date();
            }
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    /**
     * "date" is used to determine the chronological order of the blog post in www
     */
    {
      name: "date",
      type: "date",
      label: "Blog Post Date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        description:
          "This date will determine the chronological order of the blog post. Required.",
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      // NOTE: disabled autosave as it might overload connections if many users are editing at the same time
      // autosave: {
      //   interval: 200,
      // },
      // TODO: enable schedulePublish to work with cron job
      // schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};

export default Posts;
