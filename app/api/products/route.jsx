import { NextResponse } from "next/server";

export async function POST(req) {

    //Get FormData
    const formData = await req.formData();
    const image = formData.get('image');
    const file = formData.get('file');
    const data = JSON.parse(formData.get('data'));

    console.log(image.file.data);


    // Save Product Image to Firebase Storage

    //Save Product File/Document to Firebase Storage

    //Save FormData along With URL into Database

    return NextResponse.json()
}