"use client"
import React, { useEffect } from 'react';
import Header from './_components/Header';
import { useUser } from '@clerk/nextjs'; // Clerk authentication hook
import axios from 'axios';

const provider = ({children}) => {

  const {user } = useUser();

  useEffect(() => {
    user&&CheckIsNewUser();
  }, [user]);

  // const CheckIsNewUser = async () => {
  //   const result = await axios.post('/api/user', {
  //     user:user
  //   });

  //   console.log(result);

  //   try {
  //     let result = await axios.post(          // any call like get
  //       "http://localhost:3000/api/user",         // your URL
  //       {                                     // data if post, put
  //         some: "data",
  //       }
  //     );
  //     console.log(result.response.data);
  //   } catch (error) {
  //     console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
  //   }
  // }

   // Function to check if the user is new by making an API call
   const CheckIsNewUser = async () => {

    try {
          // POST request to the '/api/user' endpoint with the user data
    const result = await axios.post('/api/user', {
      user: user
  });
  console.log(result); // Log the result from the server

    } catch (error) {
      console.error('error', error);     
    }
  }

  return (
    <div>
        <Header />
        <div>
            {children}
        </div>
    </div>
  )
}

export default provider