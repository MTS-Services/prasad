import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen bg-gray-50 w-full'>
      <Header />
      <main className='flex-grow w-full flex flex-col'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
