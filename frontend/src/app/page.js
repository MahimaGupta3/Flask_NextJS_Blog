import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from './components/Layout'

const Homepage = async () => {
  let posts = []; 

  try {
    const response = await axios.get('http://localhost:2000/');
    posts = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    (
      <Layout>
      <div className="space-y-8">
      <h2 className="text-2xl font-bold">Recent Posts</h2>

        {/* Render posts list */}
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id}>
              {/* Use Link to navigate to dynamic post page */}
              <Link href={`/post/${post._id}`}>
              

                <h2 className="text-2xl font-bold">{post.Title}</h2>
              </Link>
              <p className="text-gray-500">{post.Content}</p>
            </div>
          ))
        )}
      </div>
    </Layout>)
  );
};

export default Homepage;