import { prisma } from "@/app/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";



export const authOptions :NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials :{
                email:{label:'Email',type:'text',placeholder:"Enter your email"},
                password:{label:"Password",type:"password",placeholder:'Enter Your Password'},
            },
            async authorize(credentials:any){
              if (!credentials?.email || !credentials?.password) {
    return null;
  }
                const user = await prisma.user.findUnique({
                  where:{
                    email:credentials.email
                  }
                })
                if(!user){
                  return null;
                }
                return {
                  id:user.id,
                  email:user.email, //mapping will happen here where navbar logic will be applied
                  name:user.username,
                  createdAt:user.createdAt
                }
            }
        }),
        
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  

    ],
    pages:{
      signIn:"/signin"
    },

    callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id; // ✅ store id in token
        token.createdAt = user.createdAt;
      }
      return token;
    },

    async session({ session, token }:any) {
      if (session.user) {
        session.user.id = token.id as string; // ✅ expose id to session
        session.user.createdAt = token.createdAt;
      }
      return session;
    },
  },

    secret:process.env.NEXTAUTH_SECRET

    
}

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;