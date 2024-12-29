import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { productsTable, usersTable } from "@/configs/schema";
import { desc, asc, eq, getTableColumns, like } from "drizzle-orm";

export async function POST(req) {
    const { limit } = await req.json();

    const result = await db.select({
        ...getTableColumns(productsTable),
        user: {
          name: usersTable.name,
          image: usersTable.image,
        },
      })
      .from(productsTable)
      .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
      .orderBy(desc(productsTable.id))
      .limit(limit);
    

    return NextResponse.json(result);
}