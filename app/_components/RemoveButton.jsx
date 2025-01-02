import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import { Button } from "@/components/ui/button";
import axios from "axios"; // <-- Make sure axios is imported
import { toast } from "sonner"; // Make sure toast is correctly imported


const RemoveButton = ({product}) => {
const { cart, setCart } = useContext(CartContext);
  const removeItem = async () => {

    try {
      //Send delete request to the backend
      const response = await axios.delete(`/api/cart?recordId=${product.id}`);
      console.log('responseDATA', response.data);
      if(response?.data?.message === 'Item deleted successfully') {
        //Update cart state after successful deletion

        const updatedCart = cart.filter((item) => item.id !== product.id);
       
        setCart(updatedCart);
       toast('Item Deleted');
       
      } else {
        console.log('response data', response.data)
        toast.error('failed to delete item.');
      }
      
    } catch (error) {
      toast.error('Error deleting item:', error);
    }
  };
  return (
    <div>
        <Button onClick={removeItem}>
            <h2 className="text-red-500 cursor-pointer">Remove</h2>
        </Button>
    </div>
  )
}

export default RemoveButton