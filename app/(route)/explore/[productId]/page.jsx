"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetails = () => {
  const [ProductDetail, setProductDetail] = useState();
  const { productId} = useParams();

  useEffect(() => {
    GetProductDetail();
  }, []);

  const GetProductDetail = async () => {
    const result = await axios.get('/api/products?id='+productId);
    console.log('result get product id', result.data);
  }

  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails