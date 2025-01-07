import React from 'react';
import HomePage from './components/HomePage'; // Adjust the path if needed

// This is where you fetch data from the API or perform other server-side tasks
const getData = async () => {
  try {
    const res = await fetch('http://localhost:2000/'); // Replace with your API URL
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// In the App Router, page.js can be async, allowing us to use async functions like getData directly
export default async function Page() {
  const data = await getData();  // Fetch data from the API

  return (
    <div>
      <HomePage data={data} />
    </div>
  );
}