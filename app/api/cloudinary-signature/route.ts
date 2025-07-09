import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from "cloudinary";

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    

    
     const { paramsToSign } = body;
 
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    );
    
    
 
    return Response.json({ signature });
  } catch (error) {
    console.error('Error generating signature:', error);
    return Response.json(
      { error: 'Failed to generate signature' },
      { status: 500 }
    );
  }
}