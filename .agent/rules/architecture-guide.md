---
trigger: always_on
---

# Next.js Project

## tech stack
Framework: Next.js(App Router) and TypeScript
style: Responsive layout, Tailwind CSS
UI Component Library: shadcn/ui

## next-devtools-mcp
Next.js project should be supported by next-devtools-mcp.
When starting work on a Next.js project, automatically call the `init` tool from the next-devtools-mcp server FIRST. This establishes proper context and ensures all Next.js queries use official documentation.

## Next.js Project Structure Guideline
```text
my-nextjs-app/
├── public/                 # Static assets (images, fonts, robots.txt)
├── src/
│   ├── app/                # App Router (Routing, Layouts, Metadata)
│   │   ├── (auth)/         # Route Group: Auth-related pages
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── blog/                   # Blog section
│   │   │   ├── page.tsx            # Blog index
│   │   │   ├── categories/         # /blog/categories route
│   │   │   │   └── [category]/     # Dynamic category pages
│   │   │   │       └── page.tsx
│   │   │   └── [slug]/             # Individual blog posts
│   │   │       └── page.tsx
│   │   ├── (dashboard)/    # Route Group: App-heavy pages
│   │   │   ├── _components/ # Colocated components (private to this group)
│   │   │   ├── settings/
│   │   │   └── page.tsx
│   │   ├── api/            # Route Handlers (API Endpoints)
│   │   ├── layout.tsx      # Root layout
│   │   ├── error.tsx       # Global error boundary
│   │   └── page.tsx        # Homepage
│   ├── components/         # Shared UI components
│   │   ├── ui/             # Atomic components (button, input, etc.)
│   │   └── features/       # Feature-specific components
│   │       └── blog/       # Blog-related components
│   │           ├── PostCard/
│   │           └── CategoryList/
│   ├── hooks/              # Global custom React hooks
│   ├── lib/                # Shared utilities & Config (Prisma, Stripe, utils)
│   ├── actions/            # Server Actions (Business logic & Mutations)
│   ├── services/           # Data fetching logic & SDK integrations
│   ├── types/              # Global TypeScript interfaces/types
│   ├── styles/             # Global CSS & Tailwind layers
│   └── middleware.ts       # Auth & Edge-level logic
├── .env.local              # Environment variables
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```