"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header"; // Header component
import { useUser } from "@clerk/nextjs"; // Clerk authentication hook
import axios from "axios";
import { CartContext } from "./_context/CartContext";

const Provider = ({ children }) => {
  const { user } = useUser(); // Get the current authenticated user from Clerk
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // If a user is logged in, check if they are new
    user && CheckIsNewUser();
    user && GetCartItems();
  }, [user]);

  // Function to check if the user is new by making an API call
  const CheckIsNewUser = async () => {
    // POST request to the '/api/user' endpoint with the user data
    const result = await axios.post("/api/user", {
      user: user,
    });
    console.log(result.data); // Log the result from the server
  };

  const GetCartItems = async () => {
    console.log('user getcartitems', user?.primaryEmailAddress.emailAddress)
    try {
      const result = await axios.get(
        "/api/cart?email=" + user?.primaryEmailAddress.emailAddress
      );
      console.log('result getcart items', result.data);
      setCart(result.data);
    } catch (error) {
      console.error("Error fetching cart items", error);
    }
  };

  return (
    <div>
      <CartContext.Provider value={{ cart, setCart }}>
        <Header /> {/* Render the Header component */}
        <div>
          {children} {/* Render children components inside */}
        </div>
      </CartContext.Provider>
    </div>
  );
};

export default Provider;
