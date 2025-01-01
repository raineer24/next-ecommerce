import { Card } from "@/components/ui/card";
import Image from "next/image";
import React, { useContext } from "react";
import axios from "axios";
import { CartContext } from "../_context/CartContext";

const CartProductItem = ({product}) => {
  const { cart, setCart } = useContext(CartContext);

  const removeItem = async () => {

    try {
      //Send delete request to the backend
      const response = await axios.delete(`/api/cart?recordId=${product.id}`);
      console.log('responseDATA', response.data);
      if(response?.data?.message === 'Item deleted successfully') {
        //Update cart state after successful deletion

        const updatedCart = cart.filter((item) => item.id !== product.id);
        console.log('Item Deleted');
        setCart(updatedCart);
       
      } else {
        console.log('response data', response.data)
        console.error('failed to delete item.');
      }
      
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  return (
    <Card className='flex gap-5'>
        { /* Product Image */}
        <Image 
        src={product?.imageUrl}
        alt={product?.title}
        width={70}
        height={70}
        className="h-[100px] w-[100px] object-cover"
        />

        { /* Product Details */}
        <div className="flex flex-col items-start justify-start">
            <h2 className="font-bold">{product?.title}</h2>
            <h3 className="font-bold text-yellow-600 text-lg">${product?.price}</h3>
            <h2 className="text-red-500 cursor-pointer" onClick={removeItem}>Remove</h2>
        </div>

        
    </Card>
  )
}

export default CartProductItem