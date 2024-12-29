import React from "react";
import ProductCartItem from "./ProductCartItem";

const DisplayProductList = ({productsList}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mt-8">
      {productsList?.length > 0
        ? productsList.map((product, index) => (
            <ProductCartItem product={product} key={product.id || index} alt />
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
