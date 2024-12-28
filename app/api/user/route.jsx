import { NextResponse } from "next/server";
import { db } from "@/configs/db"; // Database connection configuration
import { usersTable } from "@/configs/schema"; // Schema definition for the users table
import { eq } from "drizzle-orm"; // SQL condition help

export async function POST(req) {
    
    const {user} =await req.json();
    // Check Is User already exist
    const userData = await db.select().from(usersTable)
        .where((eq(usersTable.email, user?.primaryEmailAddress.emailAddress)))

        if(userData?.length <=0) {
            //If not then insert new user to DB
            const result = await db.insert(usersTable).values({
                name: user?.fullName,
                email: user?.primaryEmailAddress.emailAddress,
                image:user?.imageUrl
            }).returning(usersTable)

            return NextResponse.json(result[0]);
        }
    return NextResponse.json(userData[0]);
}