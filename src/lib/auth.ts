import { cache } from "react"
import { headers } from "next/headers"
import { db } from "@/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { apiKey } from "better-auth/plugins"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    modelName: "user",
    additionalFields: {
      isOnboarded: {
        type: "boolean",
        required: false,
        nullable: false,
        defaultValue: false,
      },
    },
  },
  rateLimit: {
    enabled: true,
  },
  plugins: [nextCookies(), apiKey()],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
})
export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  })
})
