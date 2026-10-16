# Converso

Converso is a real-time AI teaching platform. Browse learning companions, create a tutor for a subject and topic, and practice through a voice session with a live transcript. Sign in to track your companions and completed sessions.

## Features

- Browse and search AI learning companions by subject and topic.
- Create personalized companions with a voice, conversation style, and session duration.
- Have real-time voice sessions and view the conversation transcript.
- View your created companions and completed sessions.
- Sign in and manage plan access with Clerk.

## Tech stack

- [Next.js](https://nextjs.org/) 16 with the App Router and TypeScript
- [React](https://react.dev/) 19 and [Tailwind CSS](https://tailwindcss.com/) 4
- [Clerk](https://clerk.com/) for authentication and billing
- [Supabase](https://supabase.com/) for companion and session-history data
- [Vapi](https://vapi.ai/) for real-time voice sessions
- [Sentry](https://sentry.io/) for error monitoring

## Prerequisites

- [Node.js](https://nodejs.org/) 20.9 or newer
- npm (included with Node.js)
- Accounts/projects for Clerk, Supabase, and Vapi

## Getting started

1. Clone this repository and open its project directory:

   ```bash
   git clone https://github.com/ShreeyashShrestha/saas-app.git
   cd saas-app
   ```

2. Install the dependencies:

   ```bash
   npm ci
   ```

3. Create a `.env.local` file in the project root:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key

   NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
   ```

   Get the Clerk keys from your Clerk application, the URL and publishable key from your Supabase project, and the web token from your Vapi account. Keep `CLERK_SECRET_KEY` private; never commit real credentials. `.env.local` is ignored by Git.

4. Set up Supabase:

   - Create `public.companions` with a UUID `id` and columns for `name`, `subject`, `topic`, `voice`, `style`, `duration`, and `author`.
   - Create `public.session_history` with columns for `companion_id`, `user_id`, and `created_at`. `companion_id` references `companions.id`; `created_at` should have a default timestamp.
   - Configure Supabase to accept Clerk session tokens and set appropriate row-level security policies for reading the companion library and recording/viewing session history.

   The app writes the signed-in Clerk user ID to the `author` and `user_id` fields. Ensure those columns can store Clerk IDs (text), and that your policies use the Clerk identity from the token. Review your policies before exposing a production database.

5. In Clerk, configure the sign-in/sign-up experience and its integration with Supabase. If you use companion creation limits and the pricing page, configure the Clerk Billing plan `pro` and features `3_companion_limit` and `10_companion_limit`; the app checks these exact identifiers.

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000).

Restart the development server after changing `.env.local`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |

Run `npm run build` before `npm run start`.

## Main pages

| Path | Description |
| --- | --- |
| `/` | Popular companions and recent sessions |
| `/companions` | Companion library and search |
| `/companions/new` | Create a learning companion (requires sign-in) |
| `/companions/[id]` | Companion details and voice session |
| `/my-journey` | Your companions and session history |
| `/subscription` | Clerk pricing table |
| `/sign-in` and `/sign-up` | Clerk authentication |

## Project structure

```text
app/             Next.js routes and layouts
components/      Reusable UI and companion components
constants/       Subjects, voices, and session configuration
lib/actions/     Supabase-backed companion and session actions
lib/             Supabase, Vapi, and shared utilities
public/          Static icons and images
types/           Shared TypeScript types
```

## Deployment

Deploy as a Next.js application (for example, on [Vercel](https://vercel.com/)). Add the same required environment variables to your hosting provider, configure the production Clerk and Supabase integrations and policies, and set the production site URL in Clerk. Never expose secret keys in client-side code or publish them in the repository.
