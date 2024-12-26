"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

function ImageUpload() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
  };



  return (
    <div>
      <h2>Upload Product Image</h2>
      <Input type="file" id="imageUpload" name="image" className="hidden" onChange={handleFileChange} />
      <label htmlFor="imageUpload">
        <div className="p-2 flex justify-center items-center cursor-pointer border-4 border-black border-dotted bg-slate-200">
          <Image src={"/image.png"} alt="image" width={70} height={70} />
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
