import { NextRequest, NextResponse } from "next/server";

export function POST(req:NextRequest){
  return NextResponse.json({
    message:"Hi user",
    success:true,
  },{status:201})
    

  
}