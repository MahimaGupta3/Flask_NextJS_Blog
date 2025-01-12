"use client"
import { useRouter } from 'next/navigation'

export default async function Logout(req, res) {
    const router = useRouter()
    if (req.method === 'POST') {
      // Make the logout request to Flask backend
      const response = await fetch('http://localhost:2000/logout', {
        method: 'POST',
        credentials: 'same-origin', // Ensure cookies are sent with the request
      });
  
      if (response.ok) {
        res.status(200).json({ message: 'Logged out successfully' });
        router.push('/');
      } else {
        res.status(500).json({ error: 'Failed to log out' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }