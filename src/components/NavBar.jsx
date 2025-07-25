import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-white shadow flex items-center justify-between px-6 py-3">
      <div className="font-bold text-indigo-700 text-xl">
        <Link to="/">MarketSim</Link>
      </div>
      <div className="space-x-4">
        <Link to="/cases" className="text-gray-700 hover:text-indigo-600">Cases</Link>
        <Link to="/simulation" className="text-gray-700 hover:text-indigo-600">Simulation</Link>
        <Link to="/feedback" className="text-gray-700 hover:text-indigo-600">Feedback</Link>
        <Link to="/news" className="text-gray-700 hover:text-indigo-600">News</Link>
      </div>
    </nav>
  );
}
