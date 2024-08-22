'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const NavBar: React.FC = () => {
  const {isLoggedIn, toggleUser} = useUser();

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center">
      <div>
        <Link href="/" passHref>
          <button className="bg-gray-300 text-black py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:border hover:border-gray-500">
            Home
          </button>
        </Link>
      </div>
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <Link href="/projects" passHref>
              <button className="bg-gray-300 text-black py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:border hover:border-gray-500">
                Projects
              </button>
            </Link>
            <Link href="/" passHref>
              <button 
                className="bg-red-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:text-black hover:bg-red-300 hover:border hover:border-gray-500"
                onClick={toggleUser}
              >
                Log Out
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" passHref>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-gray-500">
                Login
              </button>
            </Link>
            <Link href="/signup" passHref>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-gray-500">
                Signup
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;