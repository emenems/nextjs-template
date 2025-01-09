import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials.password === "admin"
        ) {
          return { id: "1", name: "admin", email: "admin@admin.com" }
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user }
    },
    session: async ({ session, token }) => {
      session.user = token
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: process.env.AUTH_TOKEN_EXPIRES
      ? parseInt(process.env.AUTH_TOKEN_EXPIRES, 10)
      : 3600,
  },
}

export default auth
