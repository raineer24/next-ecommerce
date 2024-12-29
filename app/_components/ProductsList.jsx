"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Products from '../_mockData/Products';
import ProductCartItem from './ProductCartItem';
import axios from "axios";

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
          Featured  <span><Button>View All</Button></span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-8">
            {productsList?.length > 0 ? (productsList.map((product, index)=>(
                <ProductCartItem product={product} key={product.id || index}/>
            ))
            ): (
              // Displaying loading skeletons
              [1,2,3,4,5,6].map((item, index) => (
                <div className='h-[200px] w-full bg-slate-200 rounded-lg animate-pulse' key={index}></div>
              ))

            )}
        </div>
    </div>
  )
}

export default ProductsList