import { NextResponse } from "next/server";
import { storage } from "@/configs/firebaseConfig"; // Firebase storage import
import { supabase } from '@/configs/client';
export async function POST(req) {

    //Get FormData
    const formData = await req.formData();
  const image = formData.get('image');
    const file = formData.get('file');
    const data = JSON.parse(formData.get('data'));

    console.log('file.name',file.name);

    // Save Product Image to Firebase Storage
   // const imageName = image+ ".png";
   // const storageRef = ref(storage,'file/'+imageName); 

  // const fileName: string = Date.now() + '_' + file.name;

    await supabase.storage.from('documents')
    .upload(`${image.name}`, image).then(snapshot =>{
        console.log('image upload!!');
    });

    await supabase.storage.from('documents')
    .upload(`${file.name}`, image).then(snapshot =>{
        console.log('file upload!!');
    })

    const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(`${image.name}`);
      console.log('publicURL',publicUrl);

      

    //Save Product File/Document to Firebase Storage

    //Save FormData along With URL into Database

    return NextResponse.json({})
}