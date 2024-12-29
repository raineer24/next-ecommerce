"use client";
import DisplayProductList from "@/app/_components/DisplayProductList";
import SortProducts from "@/app/_components/SortProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const Explore = () => {
  const [productList, setProductList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    GetProductList();
  }, []);

  const GetProductList = async (offset_) => {
    try {
      const result = await axios.post("/api/all-products", {
        limit: 6,
        offset:offset_,
        searchInput: searchText,
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
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-2 mb-4">
          <h4 className="text-lg sm:text-base">Search:</h4>
          <Input className='w-full sm:w-80' placeholder='Search products'
          onChange={(e)=>setSearchText(e.target.value)}/>
          <Button onClick={() => {
            GetProductList(0);
            setProductList([]);
          }} className='w-full sm:w-auto mt-2 sm:mt-0'> <Search /> Search</Button>
           <SortProducts />
        </div>
       
      </div>
      <DisplayProductList productsList={productList} />
      <div className="flex items-center justify-center mt-5">
        <Button onClick={()=>GetProductList(offset + 6)} className='w-full sm:w-auto'>Load More</Button>
      </div>
    </div>
  );
};

export default Explore;
