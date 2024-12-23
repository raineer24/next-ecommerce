import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {

    const MenuList = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Store',
            path: '/store'
        },
        {
            name: 'Explore',
            path: '/explore'
        }
    ]
  return (
    <div className='flex p-4 px-10 md:px-32 lg:px-48 bg-primary border-b-4 border-black justify-between items-center'>
        <h2 className='font-bold text-lg bg-black text-white px-2 p-1'>DIGI STORE</h2>
        <ul className='md:flex gap-5'>
            {MenuList.map((menu, index)=> (
                <li className='px-2 p-1 cursor-pointer hover:border-2 hover:border-white'>{menu?.name}</li>
            ))}
        </ul>

        <div className='flex gap-5 items-center'>
            <ShoppingBag/>
            <Button className="bg-red-500 hover:bg-red-600 text-white font-bold">Start Selling</Button>
        </div>
    </div>
  )
}

export default Header