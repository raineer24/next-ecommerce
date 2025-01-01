import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, {useContext, useState} from "react";
import { MoreVerticalIcon } from "lucide-react";
import ProductEditableOption from "./ProductEditableOption";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { CartContext } from "../_context/CartContext";

const ProductCartItem = ({ product, editable = false, user  }) => {
  // const { user } = useUser();
  //  console.log('product cart item');
  //  console.log('productcartItem user', user?.primaryEmailAddress.emailAddress);
//  user1 = user.user;
  const {cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
    const addToCart = async() => {
        try {
          setLoading(true);
          setCart(cart=>[...cart,product]);
            console.log('user product cart titem', user?.primaryEmailAddress?.emailAddress);
            const result = await axios.post("/api/cart", {
              email: user?.primaryEmailAddress?.emailAddress,
              productId: product?.id,
            });
           
            setLoading(false);
      
    
            
            console.log('addtocart', result);
        } catch (error) {
            console.error('Error adding to cart:', error.response.data);

        }
       
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
                  <Button onClick={addToCart} disabled={loading} size="sm" className="mt-1">
                    Add to Cart
                  </Button >
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
