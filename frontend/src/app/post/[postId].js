import React from 'react';
import axios from 'axios';
import Post from '../components/Post';

// Fetch a single post from the Flask API based on postId
export async function getServerSideProps({ params }) {
  const { postId } = params;  // Extract postId from the URL parameters

  try {
    const response = await axios.get(`http://localhost:2000/post/${postId}`);
    const post = response.data;

    return {
      props: { post },  // Pass the post data to the component
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      props: { post: null },  // If there's an error, pass null as post
    };
  }
}

const PostPage = ({ post }) => {
  return (
    <div>
      <h1>Post Details</h1>
      <Post post={post} />  {/* Pass the fetched post to the Post component */}
    </div>
  );
};

export default PostPage;