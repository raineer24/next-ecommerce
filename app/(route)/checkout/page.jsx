"use client";
import CheckoutProductItem from "@/app/_components/CheckoutProductItem";
import { CartContext } from "@/app/_context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";
//import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
    const { cart, setCart } = useContext(CartContext);
    const { user} = useUser();
  return (
    <div>
        <h1 className="font-bold">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
                { cart.map((product, index) => (
                    <CheckoutProductItem product={product} key={index}/>
                ))}
            </div>

            <div>

            </div>
        </div>
    </div>
  )
}

export default Checkout;