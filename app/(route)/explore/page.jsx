"use client";
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
    const result = await axios.post('/api/all-products', {
      limit: 6
    });
    console.log(result.data);
    setProductList(result.dta);
  }

  return (
    <div className='mt-10 px-4 md:px-8'>
      <h2 className='font-bold text-3xl text-center md:text-left'>Explore</h2>
    </div>
  )
}

export default Explore;