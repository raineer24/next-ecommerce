import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { storage } from "@/configs/firebaseConfig"; // Firebase storage import
import { supabase } from "@/configs/client";
import { productsTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
export async function POST(req) {
  //Get FormData
  const formData = await req.formData();
  const image = formData.get("image");
  const file = formData.get("file");
  const data = JSON.parse(formData.get("data"));

  console.log("file.name", file.name);


 const file1 = await supabase.storage
    .from("documents")
    .upload(`${file.name}`, file)
    .then(async (snapshot) => {
        const fileUrl = await supabase.storage
        .from("documents")
        .getPublicUrl(`${file.name}` && `${file.name}`);
console.log('fileurl', fileUrl.data.publicUrl)
        return fileUrl.data['publicUrl'];
    });


    const image1 = await supabase.storage
    .from("documents")
    .upload(`${image.name}`, image)
    .then(async (snapshot) => {
        const imgUrl = await supabase.storage
        .from("documents")
        .getPublicUrl(`${image.name}` && `${image.name}`);
console.log('image url: ', imgUrl.data.publicUrl)
        return imgUrl.data['publicUrl'];
    });
  

    const result = await db.insert(productsTable).values({
        title: data?.title,
        category: data?.category,
        description: data?.description,
        fileUrl: file1,
        imageUrl: image1,
        price: data?.price,
        about: data?.about,
        message: data?.message,
        createdBy: data?.userEmail,
    }).returning(productsTable)
    


  return NextResponse.json(result);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  
  const result=await db.select().from(productsTable).where(eq(productsTable.createdBy,email));

  console.log('result get created by email :', result);
  
  return NextResponse.json(result);
} 
