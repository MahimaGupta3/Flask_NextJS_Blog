'use client'
 
import Link from 'next/link';
import React from 'react';

const HomePage = ({ posts }) => {
  return 
    (<div className="space-y-8">
      <h2 className="text-2xl font-bold">Recent Posts</h2>

        {/* Render posts list */}
        {post.length === 0 ? (
          <p className="text-gray-500">No posts available.</p>
        ) : (
          post.map((item) => (
            <div key={post._id}>
              {/* Use Link to navigate to dynamic post page */}
              <Link href={`/admin/post/${item._id}`}>
              

                <h2 className="text-2xl font-bold">{item.Title}</h2>
              </Link>
              <p className="text-gray-500">{item.Content}</p>
            </div>
          ))
        )}
      </div>
  );
};

export default HomePage;