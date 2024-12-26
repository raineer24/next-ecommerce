import { Input } from '@/components/ui/input';
import React from 'react';

const AddProduct = () => {
  return (
    <div className='mt-10'>
      <h2 className='text-3xl font-bold'>Add New Product</h2>
      <p>Start adding product details to sell your item</p>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>

        </div>
        <div className='flex flex-col gap-5'>
            <div>
              <h2>Product Title</h2>
            </div>
        </div>
      </div>
    </div>
    
    
  )
}

export default AddProduct