import React from 'react';
import Link from 'next/link'

const Header = () => {
  return (
    <nav className="bg-gray-700 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between">
        <Link href="/" className="text-lg font-bold">My Blog</Link>
        <Link href="/login" className="text-lg font-bold">SignIn</Link>
        <Link href="/register" className="text-lg font-bold">SignUp</Link>
      </div>
    </nav>
  );
};

export default Header;