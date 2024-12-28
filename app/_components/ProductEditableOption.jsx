import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChartArea, PenBox, Trash2 } from "lucide-react";

const ProductEditableOption = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <ul>
          <li className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer">
            {" "}
            <PenBox />
            Edit
          </li>
          <li className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer text-green-500">
            
            <ChartArea />
            Analytics
          </li>
          <li className="flex gap-2 hover:bg-gray-100 p-2 cursor-pointer text-red-500">
            
            <Trash2 />
            Delete
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ProductEditableOption;
