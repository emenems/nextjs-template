import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string
    access_token?: string
    surname?: string
    role?: string
    language?: string
    avatar_url?: string
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      idToken?: string
      access_token?: string
      surname?: string
      role?: string
      language?: string
      avatar_url?: string
    } & DefaultSession["user"]
  }

  interface User {
    idToken?: string
    access_token?: string
    surname?: string
    role?: string
    language?: string
    avatar_url?: string
  }
}
