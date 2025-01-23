"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [ analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading ]= useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const GetData = async () => {
      try {
        console.log
        const result = await axios.get('/api/analytics');
        console.log('result analytics', result.data);
        setAnalyticsData(result.data);
        setLoading(false);

      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    GetData();
  }, []);

  

  if(loading) {
    return <div>Loading....</div>;
  }

  if(error) {
    return <div>{error}</div>;
  }
  return (
    <div className='p-4'>
      <h2 className='font-bold text-xl mt-5'>Product Analytics</h2>

    {analyticsData.length > 0 ?(
 <div className='mt-4'>
 <table className='min-w-full border-collapse border border-gray-300'>
   <thead>
     <tr>
       <th className='p2 border border-gray-300 text-left'>Product Title</th>
       <th className='p2 border border-gray-300 text-left'>Price ($)</th>
       <th className='p2 border border-gray-300 text-left'>Category</th>
       <th className='p2 border border-gray-300 text-left'>Description</th>
       <th className='p2 border border-gray-300 text-left'>Order ID</th>
       <th className='p2 border border-gray-300 text-left'>User name</th>
       <th className='p2 border border-gray-300 text-left'>User Email</th>
       <th className='p2 border border-gray-300 text-left'>Product Image</th>
     </tr>
   </thead>
   <tbody>
    {analyticsData.map(item => {
      const { products, orders, users} = item;

      return (
        <tr key={orders.id}>
        <td className='p2 border border-gray-300'>{products.title}</td>
        <td className='p2 border border-gray-300'>{products.price}</td>
        <td className='p2 border border-gray-300'>{products.category}</td>
        <td className='p2 border border-gray-300'>{products.description}</td>
        <td className='p2 border border-gray-300'>{orders.id}</td>
        <td className='p2 border border-gray-300'>{users.name}</td>
        <td className='p2 border border-gray-300'>{users.email}</td>
        <td className='p2 border border-gray-300'>
          <img src={products.imageUrl} alt={products.title} className='w-20 h-20 object-cover' />
        </td>
      </tr>
      );
    })}
   
   </tbody>
 </table>
</div>
    ) : (
      <p className='mt-4 text-gray-500'>No Product analytics data available.</p>
    )}
     
    </div>
  )
}

export default Analytics;