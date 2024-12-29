"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Products from '../_mockData/Products';
import ProductCartItem from './ProductCartItem';
import axios from "axios";
import Link from "next/link";
import DisplayProductList from './DisplayProductList';

const ProductsList = () => {

    const [productsList, setProductList] = useState([]);

    useEffect(() => {
        //Setting the products list when the component mounts
        //setProductsList(Products);
      //  GetProductList();
        GetProductlist();
    }, []);

   
  const GetProductlist = async () => {
    try {
      //const result = await axios.get("/api/products?limit=6");
      const result = await axios.get("/api/products?limit=6");
      
      // Assuming the product data is in result.data, update the state accordingly
      console.log('result.data', result.data);
      setProductList(result.data);  // Accessing data properly
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
        <h2 className='font-bold text-xl flex justify-between items-center'>
          Featured  <span>
            <Link href={"/explore"}>
            <Button >View All</Button>
            </Link>
            
            </span>
        </h2>

       <DisplayProductList productsList={productsList}/>
    </div>
  )
}

export default ProductsList