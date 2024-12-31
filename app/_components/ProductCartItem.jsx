import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { MoreVerticalIcon } from "lucide-react";
import ProductEditableOption from "./ProductEditableOption";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const ProductCartItem = ({ product, editable = false, user }) => {
    const { user } = useUser();

    const AddToCart = async() => {
        const result = await axios.post('/api/cart', {
            email: user?.primaryEmailAddress?.emailAddress,
            productId: product?.id
        });
        
        console.log('addtocart', result.data);
    }
  return (
    <div>
    <Card className="p-4 ">
        <Image src={product?.imageUrl} alt={product.title} width={300} height={300} className="h-[180px] object-cover"/>
        <div >
            <h2 className='font-bold text-xl md:text-xl line-clamp-1'>{product.title}</h2>
            <h2 className='font-bold text-2xl text-yellow-500'>{product?.price}$</h2>
            <div className='mt-3  md:flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                    <Image src={product?.user?.image} alt='user' width={20} height={20} className='rounded-full' />
                    <h2 className='text-sm text-gray-400'>{product?.user?.name}</h2>
                </div>
                {!editable ? (
                  <Button size="sm" className="mt-1">
                    Add to Cart
                  </Button>
                ) : (
                  <ProductEditableOption>
                    <MoreVerticalIcon/>
                  </ProductEditableOption>
                )}
            </div>
        </div>
    </Card >
</div >
  );
};

export default ProductCartItem;
