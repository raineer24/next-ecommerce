"use client";
import CheckoutProductItem from "@/app/_components/CheckoutProductItem";
import { CartContext } from "@/app/_context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.price;
    });
    return total;
  };

  const onPaymentSuccess = async () => {
     setLoading(true);

     const result = await axios.post('/api/order', {
      orderDetail: cart,
      email: user?.primaryEmailAddress?.emailAddress
     });

     if(result) {
      setCart([]);
      toast('Order Created Successfully');
     }
     setLoading(false);
     console.log(result);
     router.replace('/dashboard');
  }
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          {cart.map((product, index) => (
            <CheckoutProductItem product={product} key={index} />
          ))}
        </div>

        <div>
          <Card className="flex flex-col p-2 gap-4">
            <h2 className="flex justify-between">
              Total: <span>${calculateTotal()}</span>
            </h2>
            <hr className="h-1 bg-black" />
            <p>
              Your payment receipt and product will be delivered to your
              registered email address:{" "}
              <span className="bg-yelllow-300 text-black p-1">
                {user?.primaryEmailAddress.emailAddress}
              </span>
            </p>

            <p>
              Don't worry if you don't have money! Click the button below to get
              your <span className="text-green-600">Free order</span> now!
            </p>
            <Button onClick={onPaymentSuccess}>Buy for Free</Button>
            <p>If create order but not works reload the page and try again!</p>

            {calculateTotal() && (
               <PayPalButtons 
               style={{ layout: "horizontal" }} 
               onApprove={() => onPaymentSuccess()}
               onCancel={() => toast('Payment Failed')}
               createOrder={(data, action) => {
                return action.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: calculateTotal(),
                        currency_code: "USD",
                      }
                    }
                  ]
                })
               }}
               />
            
            )}
           
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
