import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">Market Manipulation Simulation</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-8">
        Learn to spot institutional market manipulation, trade virtually, and get feedback on your trading behavior. Explore real-world case studies and improve your skills in a safe, educational environment.
      </p>
      <a href="/cases" className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">Start Exploring Cases</a>
      <p className="mt-8 text-xs text-gray-500">For educational use only. Not investment advice.</p>
    </div>
  );
}
