import React from "react";
import ProductCartItem from "./ProductCartItem";
import { useUser } from "@clerk/nextjs";

const DisplayProductList = ({productsList}) => {

  const user = useUser();
  console.log('user displayproductlist', user.user?.primaryEmailAddress);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-8">
      {productsList?.length > 0
        ? productsList.map((product, index) => (
            <ProductCartItem product={product} key={product.id || index} alt user={user?.user} />
          ))
        : // Displaying loading skeletons
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              className="h-[200px] w-full bg-slate-200 rounded-lg animate-pulse"
              key={index}
            ></div>
          ))}
    </div>
  );
};

export default DisplayProductList;
