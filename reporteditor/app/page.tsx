'use client';

import Link from 'next/link';
import { FaChartLine, FaFileUpload, FaMagic } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Header */}
      <header className="py-16 bg-blue-2 text-white text-center w-full">
        <h1 className="text-5xl font-bold mb-4">
          Dynamic Report Editor
        </h1>
        <p className="text-lg">
          Transform your data into beautiful reports with our AI-powered report generator.
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl px-8 py-10 bg-white shadow-lg rounded-lg w-full mx-auto mt-10 mb-10">
        <div className="text-center">
          <p className="text-xl font-medium mb-6 text-gray-700">
            Upload your data files and let our cutting-edge models do the rest:
          </p>
          <ul className="list-none space-y-6">
            <li className="flex items-center justify-center space-x-3">
              <FaFileUpload size={36} />
              <span className="text-lg font-semibold">Generate detailed reports</span>
            </li>
            <li className="flex items-center justify-center space-x-3">
              <FaChartLine size={36} />
              <span className="text-lg font-semibold">Analyze trends and patterns</span>
            </li>
            <li className="flex items-center justify-center space-x-3">
              <FaMagic size={36} />
              <span className="text-lg font-semibold">Visualize data insights</span>
            </li>
          </ul>
        </div>
        <div className="text-center mt-10">
          <Link href="/signup">
            <p className="inline-block bg-blue-2 text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-blue-4 transition duration-300 shadow-md transform hover:scale-105">
              Sign Up Now
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;