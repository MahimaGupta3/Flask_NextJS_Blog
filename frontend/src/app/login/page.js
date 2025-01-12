"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Layout from '../components/Layout'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        const response = await fetch('http://localhost:2000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
 
        if (response.ok) {
          let data = await response.json()
          setMessage(data.message);
          // Store access token in local storage or cookie
          // localStorage.setItem('access_token', data.access_token);
          document.cookie = `access_token=${data.access_token}; path=/; secure; SameSite=Strict`;
          router.push('/admin');
        } else {
          // Handle login error
          let data = await response.json()
          setError(data.message);
          setMessage('');
          router.push('/login');
        }
      };

    return (
      <Layout>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                placeholder="Enter Username"
                id="username"
                name="username"  // Ensure the name is 'username'
                required
                className="w-full border border-gray-300 py-2 px-3 rounded-lg mb-4"
                value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                placeholder="Enter Password"
                id="password"
                name="password"  // Ensure the name is 'password'
                required
                className="w-full border border-gray-300 py-2 px-3 rounded-lg mb-4"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >Login
              </button>
        </form>
        {/* Display the message or error */}
        {message && <div className="text-green-500 mt-4">{message}</div>}
        {error && <div className="text-red-500 mt-4">{error}</div>}
        </Layout>
    );
};

export default Login;