import { db } from "@/configs/db";
import { OrderTable, productsTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const user = await currentUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized'}, { status: 401});
    }

    //query the database for orders and their associated products
    const result = await db
        .select({
            ...getTableColumns(productsTable)
        })
        .from(OrderTable)
        .innerJoin(productsTable, eq(productsTable.id, OrderTable.productId))
        .where(eq(OrderTable.email, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(OrderTable.id));

        return NextResponse.json(result);
}