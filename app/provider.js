"use client"
import React, { useEffect } from 'react';
import Header from './_components/Header'; // Header component
import { useUser } from '@clerk/nextjs'; // Clerk authentication hook
import axios from 'axios';

const Provider = ({ children }) => {
    const { user } = useUser(); // Get the current authenticated user from Clerk

    useEffect(() => {
        // If a user is logged in, check if they are new
        user && CheckIsNewUser();
    }, [user]);

    // Function to check if the user is new by making an API call
    const CheckIsNewUser = async () => {
        // POST request to the '/api/user' endpoint with the user data
        const result = await axios.post('/api/user', {
            user: user
        });
        console.log(result.data); // Log the result from the server
    };

    return (
        <div>
            <Header /> {/* Render the Header component */}
            <div>
                {children} {/* Render children components inside */}
            </div>
        </div>
    );
};

export default Provider;