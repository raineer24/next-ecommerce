import { db } from "@/configs/db";
import { cartTable, OrderTable } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { orderDetail, email} = await req.json();

    let orderList=[];
    orderDetail.forEach((order)=> {
        orderList.push({
            email: email,
            productId: order.productId
        })
    });

    const result = await db.insert(OrderTable).values(orderList);

    //Delete user cart items after order
    const deleteResult = await db.delete(cartTable).where(eq(cartTable.email, email))

    return NextResponse.json(result);
}