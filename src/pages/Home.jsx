import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
          <span className="text-4xl">📈</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Market Manipulation Simulation
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master the art of trading by understanding institutional manipulation patterns
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={() => navigate('/presentation')}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🎯 Watch Presentation
        </button>
        <button
          onClick={() => navigate('/cases')}
          className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🚀 Start Exploring Cases
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
          <div className="text-3xl mb-3">🎓</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Educational</h3>
          <p className="text-gray-600">Learn from real market manipulation cases</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive</h3>
          <p className="text-gray-600">Real-time simulation with live trading</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20">
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Safe</h3>
          <p className="text-gray-600">Risk-free learning environment</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-500">For educational use only. Not investment advice.</p>
    </div>
  );
}
