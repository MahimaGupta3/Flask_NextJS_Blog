'use client'; 
 
import Link from 'next/link';
import Layout from '../components/Layout'
import React from 'react';

const HomePage = ({ data }) => {
  return (
    <Layout>
      <div className="space-y-8">          
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          {data.length > 0 ? (
            <ul className="space-y-4">
              {data.map((item) => (
              <li key={item._id}>
                <Link href={`/post/${item._id}`}>
                    <a>
                        <h2 className="text-2xl font-bold">{item.Title}</h2>
                    </a>
                </Link>
                <p className="text-gray-500">{item.Content}</p>
              </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No records found</p>
          )}
        </div>
    </Layout>
  );
};

export default HomePage;