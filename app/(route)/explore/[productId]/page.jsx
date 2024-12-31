"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import SimilarProduct from "./_component/SimilarProduct";

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState();
  const { productId } = useParams();
 

  useEffect(() => {
    GetProductDetail();
  }, []);

  const GetProductDetail = async () => {
    const result = await axios.get("/api/products?id=" + productId);
    console.log("result get product id", result.data);
    setProductDetail(result.data);
  };

  return (
    productDetail && (
      <div>
        <h2>BACK</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-10">
          <Card className="flex items-center justify-center max-h-[400px]">
            <Image
              src={productDetail?.imageUrl}
              alt="image"
              width={400}
              height={400}
              className="h-[400px] w-full object-contain"
            />
          </Card>

          <div className="flex flex-col gap-5">
            <h2 className="font-bold text-3xl">{productDetail?.title}</h2>
            <Badge className="text-black w-fit">
              {productDetail?.category}
            </Badge>
            <h2 className="font-bold text-3xl text-yellow-600">
              ${productDetail?.price}
            </h2>

            <p>
              The {productDetail?.category} will send to your register email id
              once you purchase this digital content
            </p>

            <Button className="w-full">Add to Cart</Button>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>{productDetail?.desciption}</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>About</AccordionTrigger>
                <AccordionContent>{productDetail?.about}</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
       
        </div>

          {/* Similar Products Section */}
        <div className="mt-10">
          <SimilarProduct category={productDetail?.category} />
        </div>
      </div>
    )
  );
};

export default ProductDetails;
