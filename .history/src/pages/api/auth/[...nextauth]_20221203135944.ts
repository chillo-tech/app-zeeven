import console from "console";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { add } from "../../../services/crud";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        axios.post(
          `${process.env.API_URL}/signin`, 
          credentials, 
          {
            headers: {"Content-Type": "application/json"}
          })
        const {data: {token}} = await add('signin', {email: req.body?.username, username: req.body?.username, password: req.body?.password});
        const user = {
          id: req.body?.username,
          name: req.body?.username,
          email: req.body?.username,
          image: null,
          accessToken: token
        };
        if (user) {
          return user;
        }
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    })
  ],
  pages:{
    signIn: '/auth/signin'
  },
  /*
  logger: {
    error(code, metadata) {
      console.log('====================================');
      console.error({code, metadata});
      console.log('====================================');
    },
    warn(code) {
      console.warn(code)
    },
    debug(code, metadata) {
      console.debug(code, metadata)
    }
  },*/
  callbacks: {
    async redirect() {
      return `${process.env.NEXTAUTH_URL}/me`
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return {
        ...token,
        ...user
      };
    },
    async session({ session, token }) {
      return { ...session, token };
    },
  }
}
export default NextAuth(authOptions)
