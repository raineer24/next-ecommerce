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
        console.log('result analytics', result);
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
      <h2>Product Analytics</h2>

      <div>
        <table>
          <thead>
            <tr>
              <th className='p2 border border-gray-300 text-left'>Product Title</th>
              <th className='p2 border border-gray-300 text-left'>Product Title</th>
              <th className='p2 border border-gray-300 text-left'>Product Title</th>
              <th className='p2 border border-gray-300 text-left'>Product Title</th>
              <th className='p2 border border-gray-300 text-left'>Product Title</th>
              <th className='p2 border border-gray-300 text-left'>Product Title</th>
              <th className='p2 border border-gray-300 text-left'>Product Title</th>
              <th className='p2 border border-gray-300 text-left'>Product Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='p2 border border-gray-300'>lorem ipsum</td>
              <td className='p2 border border-gray-300'>lorem ipsum</td>
              <td className='p2 border border-gray-300'>lorem ipsum</td>
              <td className='p2 border border-gray-300'>lorem ipsum</td>
              <td className='p2 border border-gray-300'>lorem ipsum</td>
              <td className='p2 border border-gray-300'>lorem ipsum</td>
              <td className='p2 border border-gray-300'>lorem ipsum</td>
              <td className='p2 border border-gray-300'>lorem ipsum</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Analytics;