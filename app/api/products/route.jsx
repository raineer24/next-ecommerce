import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { storage } from "@/configs/firebaseConfig"; // Firebase storage import
import { supabase } from "@/configs/client";
import { productsTable, usersTable } from "@/configs/schema";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
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
    const id = searchParams.get("id");
    const category = searchParams.get("category");

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
        .orderBy(desc(productsTable.id));

      return NextResponse.json(result[0]);
    }

    // Fetch products by category (new filter)
    if (category) {
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
        .where(eq(productsTable.category, category)) // Filter by category
        .orderBy(desc(productsTable.id))
        .limit(Number(limit)); // Limit results if specified

      return NextResponse.json(result);
    }


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
    console.log("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const productId  = searchParams.get('productId');
  const user = await currentUser();

  const result = await db
    .delete(productsTable)
    .where(
      and(eq(productsTable.id, productId)),
      eq(productsTable.createdBy, user?.primaryEmailAddress?.emailAddress)
    );

    return NextResponse.json({result:'DELETED !!!'});
}