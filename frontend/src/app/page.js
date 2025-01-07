import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from './components/Layout'
import HomePage from './components/HomePage'; // Adjust the path if needed

// This is where you fetch data from the API or perform other server-side tasks
const Homepage = async () => {
  let posts = []; // Initialize posts as an empty array

  try {
    // Fetch posts from your Flask API
    const response = await axios.get('http://localhost:2000/');
    posts = response.data; // Assign the fetched posts to the posts variable
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    <Layout>
    <div className="space-y-8">
    <h2 className="text-2xl font-bold">Recent Posts</h2>

      {/* Render posts list */}
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
    </Layout>
  );
};

export default Homepage;