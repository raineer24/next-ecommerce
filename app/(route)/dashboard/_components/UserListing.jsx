"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react'


const UserListing = () => {
    const [listing, setListing] = useState([]);

  return (
    <div>UserListing
        <h2 className='font-bold'>Listing
            <Button>+ Add New Product</Button>
        </h2>
    </div>
  )
}

export default UserListing