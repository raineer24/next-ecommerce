import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { productsTable, usersTable } from "@/configs/schema";
import { desc, asc, eq, getTableColumns, like } from "drizzle-orm";

export async function POST(req) {
    const { limit, offset, searchInput, sort } = await req.json();
    console.log('sort', sort);

    const result = await db.select({
        ...getTableColumns(productsTable),
        user: {
          name: usersTable.name,
          image: usersTable.image,
        },
      })
      .from(productsTable)
      .innerJoin(usersTable, eq(productsTable.createdBy, usersTable.email))
      .where(like(productsTable.title,'%' + searchInput +'%'))
      .orderBy(sort.order==='desc' ? desc(productsTable[sort?.field]):asc(productsTable[sort?.field]))
      .limit(Number(limit))
      .offset(offset);
    

    return NextResponse.json(result);
}