import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
})
export const userAuthClient = (url: string) => {
  const authClient = createAuthClient({
    baseURL: url,
  })
  return authClient
}
