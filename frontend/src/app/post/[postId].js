import React, { useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Post';

// Fetch a single post from the Flask API based on postId
const PostPage = async ({ params }) => {
    const { postId } = params;  // Get postId from URL parameters

    console.log("Post ID:", postId);

    useEffect(() => {
        console.log("Post ID:", postId);
      }, [postId]);    
  
    try {
      // Fetch a single post from the Flask API using the postId
      const response = await axios.get(`http://localhost:2000/post/${postId}`);
      const post = response.data;
  
      // If the post exists, render the Post component
      return (
        <div>
          <h1>Post Details</h1>
          <Post post={post} />
        </div>
      );
    } catch (error) {
      console.error('Error fetching post:', error);
      return <p>Post not found.</p>;  // Show error message if post is not found
    }
  };
  
  export default PostPage;