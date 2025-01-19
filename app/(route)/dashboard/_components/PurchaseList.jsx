"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DisplayProductList from "@/app/_components/DisplayProductList";

const PurchaseList = ({purchase}) => {
  const [productsList, setProductList] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    const getPurchaseList = async () => {
      try {
        const result = await axios.get("/api/orderhistory");  // Assuming this returns products purchased by the user
        console.log(result.data);

        // Assuming the API returns a list of purchased product IDs or product data
        const purchasedProductsIds = result.data.map((order) => order.productId); // Example: Get purchased product IDs
        
        setPurchasedProducts(purchasedProductsIds);  // Store purchased product IDs in state
        setProductList(result.data); // Assuming this is the product list
      } catch (error) {
        console.error("Error fetching purchase list:", error);
      }
    };

    getPurchaseList();
  }, []);

  return (
    <div>
      <h1>Purchase List</h1>

      {/* Pass purchase flag for each product based on whether it's in the purchasedProducts list */}
      <DisplayProductList 
        productsList={productsList}
        purchase={purchasedProducts} 
      />
    </div>
  );
};

export default PurchaseList;