import React from 'react';
import Link from 'next/link'

const Header = () => {
  return (
    <nav className="bg-gray-700 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between">
        <Link href="/" className="text-lg font-bold">My Blog</Link>
        <Link href="/admin" className="text-lg font-bold">Admin</Link>
      </div>
    </nav>
  );
};

export default Header;