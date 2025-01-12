import React from 'react';
import Link from 'next/link'
import logout from '../logout/page';

const Header = () => {
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="bg-gray-700 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between">
        <Link href="/admin" className="text-lg font-bold">My Blog</Link>
        <Link onClick={handleLogout} href="/" className="text-lg font-bold">Logout</Link>
      </div>
    </nav>
  );
};

export default Header;