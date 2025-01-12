// 'use client'
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import LayoutAdmin from '../components/Layout_admin'
import HomepageAdmin from '../components/HomePage_admin'
// import { useCookies } from 'next-client-cookies';
import { cookies } from 'next/headers';
// import { isTokenExpired } from '../lib/token';


const Homepage = async () => {
  let post = []; 
  // const cookies = useCookies();
  // const myCookieValue = cookies.get('myCookieName');
  const token = (await cookies()).get('token')?.value;
  try {
    const response = await axios.get('http://localhost:2000/');
    post = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

  return (
    (
    <LayoutAdmin>
      <HomepageAdmin post={post} />
    </LayoutAdmin>)
  );
};

export default Homepage;