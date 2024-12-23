import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const ProductCartItem = ({ product }) => {
  return (
    <div>
      <Card className="p-4">
        <Image
          src={product?.image}
          alt="user"
          width={300}
          height={300}
          className="rounded-full"
        />
      </Card>
      <div className="mt-3 md:flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">{product.name}</h2>
          <h2 className="font-bold text-2xl text-yellow-500">
            ${product.price}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProductCartItem;
