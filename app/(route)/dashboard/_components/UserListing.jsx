"use client"
import { Button } from '@/components/ui/button';
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";



const UserListing = () => {
    const [listing, setListing] = useState([]);

    const { user } = useUser();

    const getUserListing = async () => {
      try {
        const result = await axios.get(
          '/api/products?email=' + user?.primaryEmailAddress?.emailAddress
        );
        console.log('API Result:', result.data);
      } catch (error) {
        console.error('Error fetching user listings:', error);
        alert('Failed to load product listimgs. Please try again.')
      }
    };

  return (
    <div className='mt-5'>
        <h2 className='font-bold text-xl flex justify-between items-center'>Listing
          <Link href={'/add-product'}>
          <Button>+ Add New Product</Button>
          </Link>
            
        </h2>

        <div>
            {listing?.length == 0 && <h2 className='font-medium mt-10 text-2xl text-center text-gray-300'>No Listing Found</h2>}
        </div>
    </div>
  )
}

export default UserListing