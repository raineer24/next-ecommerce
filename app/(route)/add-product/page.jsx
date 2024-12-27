"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "./_components/ImageUpload";

const AddProduct = () => {
  const categories = [
    "Source Code",
    "Template",
    "UI/UX Design",
    "Logo Design",
    "Banner Design",
    "Icon Design",
    "Thumbnail Design",
    "Illustration",
    "3D Design",
    "Other",
  ];
  const [formData, setFormData] = useState([]);
  const handleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
    console.log(formData);
  };
  const handleAddProductClick= async()=>{
    console.log(formData);
    const formDataObj = new FormData();

    formDataObj.append('image', formData.image);
    formDataObj.append('file', formData.file);
    formDataObj.append('data', JSON.stringify(formData));

    const result = await axios.post('/api/products', formDataObj, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });

    console.log('Server Response', result.data);
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold">Add New Product</h2>
      <p>Start adding product details to sell your item</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        <div className="flex flex-col gap-5">
          <ImageUpload 
          onImageSelect={(e) => handleInputChange(e.target.name, e.target.files[0])}/>
          <div>
            <h3>Upload File</h3>
            <Input type="file" name="file" 
            onChange={(e) => handleInputChange(e.target.name, e.target.files[0])}/>
          </div>
          <div>
            <h3>Message to user (100 words only)</h3>
            <Textarea
              name="message"
              maxLength="100"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h2>Product Title</h2>
            <Input
              name="title"
              placeholder="Ex.UI Kit in Figma"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <h2>Price</h2>
            <Input
              type="number"
              name="price"
              placeholder="Ex. $42"
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <h2>Category</h2>
            <Select onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category, index) => (
                  <SelectItem key={index} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <h2>Description</h2>
            <Textarea
              name="description"
              placeholder={"Add a description for your product"}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div>
            <h2>About Product (Optional)</h2>
            <Textarea
              name="about"
              placeholder={"Add Product Information"}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <Button className='w-full' onClick={handleAddProductClick} >Add Product</Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
