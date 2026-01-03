import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials :{
                email:{label:'Email',type:'text',placeholder:"Enter your email"},
                password:{label:"Password",type:"password",placeholder:'Enter Your Password'},
            },
            async authorize(credentials:any){
                return{
                  id:"1"
                }
            }
        })
    ]
})

export const GET = handler;
export const POST = handler;