import { db } from "@/configs/db";
import { OrderTable, productsTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {

}