import { db } from "@/configs/db";
import { cartTable, productsTable } from "@/configs/schema";
import { eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, productId } =  await req.json();
    console.log('email', email);
    console.log('productid', productId);
    // Validate input
    if (!email || !productId) {
      return NextResponse.json(
        { error: "Email and productId are required" },
        { status: 400 }
      );
    }

   
    const result = await db
      .insert(cartTable)
      .values({
        email,
        productId,
      })
      .returning(cartTable);
      console.log("cart api", result);
    // Return the result as a JSON response
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error inserting into cart:", error);
    return NextResponse.json(
      { error: "An error occurred while adding the product to the cart" },
      { status: 500 }
    );
  }
}
