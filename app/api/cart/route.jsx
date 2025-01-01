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

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    console.log('email getcart items', email);

    const result = await db.select({
      ...getTableColumns(productsTable),
      ...getTableColumns(cartTable)
    }).from(cartTable)
    .innerJoin(productsTable, eq(cartTable.productId, productsTable.id))
    .where(eq(cartTable.email,email));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return NextResponse.json(
      {error: 'An error occurred while fetching the cart items'},
      { status: 500}
    );
  }
 
};

/* DELETE Cart item */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const recordId = searchParams.get('recordId');

    if (!recordId) {
      return NextResponse.json(
        { error: 'recordId is required'},
        { status: 400 }
      )
    }

    // Delete the cart item by recordId
    const result = await db.delete(cartTable)
    .where(eq(cartTable.id, recordId));

    if (result === 0) {
      return NextResponse.json(
        { error: 'No item found with the given recordId'},
        { status: 404}
      )
    }

    return NextResponse.json({ message: 'Item deleted successfully'});


  } catch (error) {
    console.error('Error deleting from cart:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the item'},
      { status: 500}
    );
  }
};

