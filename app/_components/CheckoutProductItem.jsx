import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import RemoveButton from "./RemoveButton";

const CheckoutProductItem = ({product}) => {
  return (
    <Card className='flex'>
        {/* Product Image */}
        <Image 
        src={product?.imageUrl}
        alt={product?.title}
        width={100}
        height={100}
        className="h-[100px] w-[100px] object-cover"
        />

        {/* Product Details */}
        <div className="flex flex-col">
            <h2 className="font-serif text-xl">{product?.title}</h2>
            <h3 className="font-sans text-lg">{product?.category}</h3>
            <RemoveButton product={product} className='mt-2'/>
        </div>

        
        

        
    </Card>
  )
}

export default CheckoutProductItem