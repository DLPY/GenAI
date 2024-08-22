'use client';

import Link from 'next/link';
import React from 'react';
import { useUser } from '../context/UserContext';

const Login: React.FC = () => {

  const {isLoggedIn, toggleUser} = useUser();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <Link href='/projects'>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md transition-all duration-300 hover:bg-blue-600"
              onClick={toggleUser}
            >
              Login
            </button>
          </Link>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">Dont have an account? <Link href="/login" className="text-blue-500 hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
