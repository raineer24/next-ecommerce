import React, { useContext, useState } from "react";
import { CartContext } from "../_context/CartContext";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import ProductEditableOption from "./ProductEditableOption";
import { MoreVerticalIcon } from "lucide-react";

const AddToCartButton = ({ product, editable = false }) => {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const addToCart = async () => {
    if (user && product) {
      setLoading(true);
      try {
      
        setCart((cart) => [...cart, product]);
        console.log(
          "user product cart titem",
          user?.primaryEmailAddress?.emailAddress
        );
        const result = await axios.post("/api/cart", {
          email: user?.primaryEmailAddress?.emailAddress,
          productId: product?.id,
        });
  
        //Handle Success
        if(result.data?.success) {
          toast('Item Added to Cart');
        } else {
          toast('Item Added to Cart');
        }
  
        console.log("addtocart", result);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast('Error adding item to Cart');
      } finally {
        setLoading(false);
      }
    } else {
      toast('Please login to add the item');
    }
   
  };
  return (
    <div>
      {editable ? (
        <ProductEditableOption product={product}>
        <MoreVerticalIcon />
      </ProductEditableOption>
      
      ) : (
        <Button
        className="font-semibold"
        onClick={addToCart}
        disabled={loading}
        size="sm"
      >
        Add to Cart
      </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
