"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Products from '../_mockData/Products';
import ProductCartItem from './ProductCartItem';

const ProductsList = () => {

    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        //Setting the products list when the component mounts
        setProductsList(Products);
    }, []);
  return (
    <div>
        <h2 className='font-bold text-xl flex justify-between items-center'>
          Featured  <span><Button>View All</Button></span>
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-8">
            {productsList.map((product, index)=>(
                <ProductCartItem product={product} key={product.id || index}/>
            ))}
        </div>
    </div>
  )
}

export default ProductsList