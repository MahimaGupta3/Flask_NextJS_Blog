// "use client"
import React from 'react';
import axios from 'axios';
import Post from '../../components/Post';

async function getPost(postId) {
  const res = await fetch(`http://localhost:2000/post/${postId}`)
  return res.json()
}

export default async function Page({ params }) {
  const { postId } = await params
  const Data = getPost(postId)
 
  // Initiate both requests in parallel
  const [post] = await Promise.all([Data])
 
  return (
    <>
      <h1>Post Details</h1>
      <Post post={post} />
    </>
  )
}