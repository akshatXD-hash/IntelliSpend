
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/db";

export async function POST(req:NextRequest){
    try{
   
    const session = await getServerSession(authOptions);
    if(!session||!session.user){
        return NextResponse.json({
            message:"User must first log in to add expense"
        },{status:401})
    }

    const body = await req.json();
    const {title,amount,category,date} = body;

    if(!category||!date){
        return NextResponse.json({
            message:"Missing Input fields"
        },{status:400})
    }

    const expense = await prisma.record.create({
        data:{
           title: title || "Untitled",           // String
        amount: parseFloat(amount),            // Float
        //@ts-ignore
        category: category,                    // String
        date: new Date(date),                  // DateTime
        userId: (session.user as any).id       // String
        }
    });

    return NextResponse.json({
        message:"Record created Successfully",
        expense
    },{status:201})
    


    
    }catch(err){
         console.error("❌ Error:", err); // Log the error
      return NextResponse.json({
        message:"Some error occured"
      },{status:500})
     
    
    }
}