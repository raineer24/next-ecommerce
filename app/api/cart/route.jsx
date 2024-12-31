import { db } from "@/configs/db";
import { cartTable, productsTable } from "@/configs/schema";
import { eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {email, productId} = req.json();

    //Insert
    const result = await db
    .insert((cartTable))
    .values({
        email,
        productId,
    })
    .returning(cartTable);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error inserting into cart:", error);
    return NextResponse.json(
      { error: "An error occurred while adding the product to the cart" },
      { status: 500 }
    );
  }
}
