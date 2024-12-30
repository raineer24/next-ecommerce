import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { storage } from "@/configs/firebaseConfig"; // Firebase storage import
import { supabase } from "@/configs/client";
import { productsTable, usersTable } from "@/configs/schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
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
      console.log("fileurl", fileUrl.data.publicUrl);
      return fileUrl.data["publicUrl"];
    });

  const image1 = await supabase.storage
    .from("documents")
    .upload(`${image.name}`, image)
    .then(async (snapshot) => {
      const imgUrl = await supabase.storage
        .from("documents")
        .getPublicUrl(`${image.name}` && `${image.name}`);
      console.log("image url: ", imgUrl.data.publicUrl);
      return imgUrl.data["publicUrl"];
    });

  const result = await db
    .insert(productsTable)
    .values({
      title: data?.title,
      category: data?.category,
      description: data?.description,
      fileUrl: file1,
      imageUrl: image1,
      price: data?.price,
      about: data?.about,
      message: data?.message,
      createdBy: data?.userEmail,
    })
    .returning(productsTable);

  return NextResponse.json(result);
}

export async function GET(req) {

  try {
    const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const limit = searchParams.get("limit");
  const id = searchParams.get('id');

  if (email) {
    const result = await db
      .select({
        ...getTableColumns(productsTable),
        user: {
          name: usersTable.name,
          image: usersTable.image,
        },
      })
      .from(productsTable)
      .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
      .where(eq(productsTable.createdBy, email))
      .orderBy(desc(productsTable.id));

   // console.log("result get created by email :", result);
    return NextResponse.json(result);
  }

  if (id) {
    const result = await db
  .select({
    ...getTableColumns(productsTable),
    user: {
      name: usersTable.name,
      image: usersTable.image,
    },
  })
  .from(productsTable)
  .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
  .where(eq(productsTable.id, id))
  .orderBy(desc(productsTable.id))
  
  return NextResponse.json(result);
  };

  const result = await db
  .select({
    ...getTableColumns(productsTable),
    user: {
      name: usersTable.name,
      image: usersTable.image,
    },
  })
  .from(productsTable)
  .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
  .orderBy(desc(productsTable.id))
  .limit(Number(limit));

  return NextResponse.json(result);
  } catch (error) {
    console.log('Errpr fetching products:', error);
    return NextResponse.json(
      {message: 'Error fetching products', error: error.message},
      {status: 500}
    )
  }
  
}
