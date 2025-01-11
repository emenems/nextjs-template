import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null
        }

        const result = await sql`
          SELECT * FROM auth.users WHERE email = ${credentials.username};
        `
        let data: any

        try {
          data = await result
          const user = data.rows[0]
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return {
              id: user.id,
              name: user.name,
              surname: user.surname,
              email: user.email,
              role: user.role,
              avatar_url: user.avatar_url,
            }
          }
        } catch (error) {
          console.error(error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.name = user.name
        token.surname = user.surname
        token.email = user.email
        token.role = user.role
        token.avatar_url = user.avatar_url
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user = {
        name: token.name,
        surname: token.surname,
        email: token.email,
        role: token.role,
        avatar_url: token.avatar_url,
      }
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
