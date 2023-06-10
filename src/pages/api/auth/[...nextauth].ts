import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {add} from "@/services/crud";
import { axiosInstance } from "@/services/axios-instance";

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	debug: true,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: {label: "Username", type: "text", placeholder: "jsmith"},
				password: {label: "Password", type: "password"}
			},
			async authorize(credentials, req) {
				try {

					const {data: {token}} = await axiosInstance.post('/api/backend/signin', {
						email: req.body?.username,
						username: req.body?.username,
						password: req.body?.password
					});
					const user = {
						id: req.body?.username,
						name: req.body?.username,
						email: req.body?.username,
						image: null,
						accessToken: token
					};
					if (token) {
						return user;
					}
				} catch (e: any) {
					return null;
				}
				return null;

			}
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || '',
			clientSecret: process.env.GOOGLE_SECRET || '',
		})
	],
	pages: {
		signIn: '/auth/signin'
	},
	callbacks: {
		async redirect({url, baseUrl}) {
			const finalUrl = url ? url : `${process.env.NEXTAUTH_URL}/me`;
			return finalUrl;
		},
		async jwt({token, user, account, profile, isNewUser}) {
			return {
				...token,
				...user
			};
		},
		async session({session, token}) {
			return {...session, token};
		},
	}
}
export default NextAuth(authOptions)
