import { useParams } from 'next/navigation'
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductDetails = () => {
  const { productId} = useParams();
  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails