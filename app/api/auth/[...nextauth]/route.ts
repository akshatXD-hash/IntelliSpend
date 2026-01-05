import { prisma } from "@/app/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { NextResponse } from "next/server";



const handler = NextAuth({
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
                  email:user.email,
                  name:user.username
                }
            }
        }),
        
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  

    ],

    callbacks: {
    async jwt({ token, user }:any) {
      if (user) {
        token.id = user.id; // ✅ store id in token
      }
      return token;
    },

    async session({ session, token }:any) {
      if (session.user) {
        session.user.id = token.id as string; // ✅ expose id to session
      }
      return session;
    },
  },

    secret:process.env.NEXTAUTH_SECRET

    
})

export const GET = handler;
export const POST = handler;