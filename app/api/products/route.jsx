import { db } from "@/configs/db";
import { NextResponse } from "next/server";
import { storage } from "@/configs/firebaseConfig"; // Firebase storage import
import { supabase } from "@/configs/client";
import { productsTable } from "@/configs/schema";
export async function POST(req) {
  //Get FormData
  const formData = await req.formData();
  const image = formData.get("image");
  const file = formData.get("file");
  const data = JSON.parse(formData.get("data"));

  console.log("file.name", file.name);

  // Save Product Image to Firebase Storage
  // const imageName = image+ ".png";
  // const storageRef = ref(storage,'file/'+imageName);

  // const fileName: string = Date.now() + '_' + file.name;

//   await supabase.storage
//     .from("documents")
//     .upload(`${image.name}`, image)
//     .then((snapshot) => {
//       console.log("image upload!!");
//     });

 const file1 = await supabase.storage
    .from("documents")
    .upload(`${file.name}`, file)
    .then(async (snapshot) => {
        const fileUrl = await supabase.storage
        .from("documents")
        .getPublicUrl(`${file.name}` && `${file.name}`);
console.log('fileurl', fileUrl.data.publicUrl)
        return fileUrl.data['publicUrl'];
    });


    const image1 = await supabase.storage
    .from("documents")
    .upload(`${file.name}`, file)
    .then(async (snapshot) => {
        const imgUrl = await supabase.storage
        .from("documents")
        .getPublicUrl(`${image.name}` && `${image.name}`);
console.log('fileurl', imgUrl.data.publicUrl)
        return imgUrl.data['publicUrl'];
    });
    // if(image) {
    //     const {
    //         data: { publicUrl },
    //       } = supabase.storage
    //         .from("documents")
    //         .getPublicUrl(`${image.name}` && `${image.name}`);
    //       console.log("image publicURL", publicUrl);

    //       const imgUrl = publicUrl;
    //       console.log('imgUrl', imgUrl)
    // }
  

  
    // if (file) {
    //     const {
    //         data: { publicUrl },
    //       } = supabase.storage
    //         .from("documents")
    //         .getPublicUrl(`${file.name}` && `${file.name}`);
    //       console.log("file publicURL", publicUrl);

    //       const fileUrl = publicUrl;
    //       console.log('fileUrl', fileUrl)
    // }

    const result = await db.insert(productsTable).values({
        title: data?.title,
        category: data?.category,
        description: data?.description,
        fileUrl: file1,
        imageUrl: image1,
        price: data?.price,
        about: data?.about,
        message: data?.message,
        createdBy: data?.userEmail,
    }).returning(productsTable)
    


  //   const {
  //     data1,
  //   } = supabase.storage.from("documents").getPublicUrl(`${file.name}`);
  //  data1 = publicUrl;

  //  console.log(data1)

  //Save Product File/Document to Firebase Storage

  //Save FormData along With URL into Database

  return NextResponse.json(result);
}
