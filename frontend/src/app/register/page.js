
"use client"
import { useState } from 'react';
import Layout from '../components/Layout'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,  // Update the relevant field in state
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("Form submitted", formData);
    try {
      const response = await fetch('http://localhost:2000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Registration successful
        let data = await response.json()
        setMessage(data.message);
      }
      else {
        // Handle registration error
        console.error('Registration failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold">Sign Up</h2>
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input 
          type="text"
          placeholder="Enter Username"
          id="username"
          name="username"  // Ensure the name is 'username'
          required
          className="w-full border border-gray-300 py-2 px-3 rounded-lg mb-4"
          value={formData.username}  // Bind input value to formData.username
          onChange={handleChange}     // Update state on input change
        />
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          placeholder="Enter Password"
          id="password"
          name="password"  // Ensure the name is 'password'
          required
          className="w-full border border-gray-300 py-2 px-3 rounded-lg mb-4"
          value={formData.password}  // Bind input value to formData.password
          onChange={handleChange}     // Update state on input change
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Register</button>
    </form>
    <div className="space-y-8">
      <p className="text-gray-500">{message}</p>
    </div>
    </Layout>
  );
};

export default Register;