'use client'
import React from 'react';
import PostAdmin from '../../../components/Post_admin';
import { useCookies } from 'next-client-cookies';
// import { isTokenExpired } from '../../../lib/token';

async function getPost(postId) {
  const cookies = useCookies();
  const myCookieValue = cookies.get('myCookieName');
  const res = await fetch(`http://localhost:2000/admin/post/${postId}`)
  return res.json()
}

export default async function Page({ params }) {
  const { postId } = await params
  const Data = getPost(postId)
 
  // Initiate both requests in parallel
  const [post] = await Promise.all([Data])
 
  return (
    <>
        <PostAdmin post={post} />
    </>
  )
}