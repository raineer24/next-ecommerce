import React from "react";
import { Button } from '@/components/ui/button';
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="bg-green-700 p-10 px-28 lg:px-36">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-20">
        <div>
            <h2 className="font-extrabold text-5xl text-white">Speed Up your Creative worflow</h2>
            <p className="text-gray-200 mt-5 font-bold">Join a growing family of 24,135 designers, creator and maker around the world</p>
            <div className="flex gap-5 mt-8">
                <Button>Explore</Button>

                <Link href={'/dashboard'}>
                <Button className="bg-red-500 hover:bg-red-600 text-white">Sell</Button>
                </Link>
                
            </div>
        </div>
        <div className="flex items-center justify-center">
            <img src="/image.png" alt="pc" width={300} height={300} className="scale-x-[-1]"/>
        </div>
      </div>
    </div>
  );
};

export default Hero;
