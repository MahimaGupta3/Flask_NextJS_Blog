'use client'; 
 
import Link from 'next/link';
import Layout from '../components/Layout'
import React from 'react';

const HomePage = ({ posts }) => {
  return (
    (<Layout>
      <div className="space-y-8">          
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          {posts.length === 0 ? (
        <p className="text-gray-500">No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.post_id}>
            {/* Use Link to navigate to dynamic post page */}
            <Link href={`/post/${post.post_id}`}>
              <a>
                <h2 className="text-2xl font-bold">{post.title}</h2>
              </a>
            </Link>
            <p className="text-gray-500">{post.content}</p>
          </div>
        ))
        )}
        </div>
    </Layout>)
  );
};

export default HomePage;









{/* {data.length > 0 ? (
            <div key={data._id}>
            <ul className="space-y-4">
              {data.map((item) => (
              <li key={item._id}>
                <Link href={`/post/${item.post_id}`}>

                  <h2 className="text-2xl font-bold">{item.Title}</h2>

                </Link>
                <p className="text-gray-500">{item.Content}</p>
              </li>
              ))}
            </ul>
            </div>
          ) : (
            <p className="text-gray-500">No records found</p>
          )} */}