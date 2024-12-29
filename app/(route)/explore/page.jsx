"use client";
import DisplayProductList from "@/app/_components/DisplayProductList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const Explore = () => {

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    GetProductList();
  },[]);

  const GetProductList = async () => {
    try {
      const result = await axios.post('/api/all-products', {
        limit: 6
      });
      console.log('explore result data',result.data);
      setProductList(result.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
   
  }

  return (
    <div className='mt-10 px-4 md:px-8'>
      <h2 className='font-bold text-3xl text-center md:text-left'>Explore</h2>
      <DisplayProductList productsList={productList}/>
    </div>
  )
}

export default Explore;