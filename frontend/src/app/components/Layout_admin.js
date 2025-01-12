import React from 'react'
import HeaderAdmin from '../components/Header_admin';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderAdmin />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout