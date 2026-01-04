import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/app/lib/db"; 


export async function POST(req:NextRequest){
  
   try{
  const body = await req.json();
  const existingUser = await prisma.user.findUnique({
    where:{
      email:body.email 
    }
  });

  if(!body.email||!body.password||!body.username){
    return NextResponse.json({
      message:"Missing Input fields"
    },{status:400})
  }

  if(existingUser){
    return NextResponse.json({
      message:"User Already Exists in database"
    },{status:409})
  }

  const user = await prisma.user.create({
    data:{
      username:body.username,
      email:body.email,
      password:body.password
    }
  });

  return NextResponse.json({
    message:"User Created Successfully"
  },{status:201})
   }catch(error){
     console.error("Internal errore occured",error);
     return NextResponse.json({
      message:"Internal Error occured"
     },{status:500})
   }
      

  
}