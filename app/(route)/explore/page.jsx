"use client";
import DisplayProductList from "@/app/_components/DisplayProductList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [productList, setProductList] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    GetProductList();
  }, []);

  const GetProductList = async (offset_) => {
    try {
      const result = await axios.post("/api/all-products", {
        limit: 6,
        offset:offset_
      });
      console.log("explore result data", result.data);
     
      if(productList?.length==0) {
         setProductList(result.data);
      }
      else {
   setProductList(prev=>[...prev,...result.data]);
      }
   
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <div className="mt-10 px-4 md:px-8">
      <h2 className="font-bold text-3xl text-center md:text-left">Explore</h2>
      <DisplayProductList productsList={productList} />
      <div className="flex items-center justify-center mt-5">
        <Button onClick={()=>GetProductList(offset + 6)} className='w-full sm:w-auto'>Load More</Button>
      </div>
    </div>
  );
};

export default Explore;
