import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';

export default function Presentation() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 0,
      title: "🎯 Market Manipulation Simulation",
      subtitle: "Educational Trading Platform",
      content: (
        <div className="space-y-6">
          <div className="text-center">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
              <div className="text-3xl mb-3">🎓</div>
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Educational</h3>
              <p className="text-blue-700">Learn from real market manipulation cases</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Interactive</h3>
              <p className="text-green-700">Real-time simulation with live trading</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Safe</h3>
              <p className="text-purple-700">Risk-free learning environment</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "🎭 The Problem",
      subtitle: "Why Retail Traders Lose Money",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-4">
              <span className="text-4xl">⚠️</span>
            </div>
            <h2 className="text-4xl font-bold text-red-600 mb-4">The Hidden Game</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="font-semibold text-red-800 mb-2">🎯 False Signals</h3>
                <p className="text-red-700">HNIs create bullish patterns to attract retail investors</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                <h3 className="font-semibold text-orange-800 mb-2">📊 Volume Manipulation</h3>
                <p className="text-orange-700">Artificial volume spikes to create momentum</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                <h3 className="font-semibold text-yellow-800 mb-2">💸 Pump & Dump</h3>
                <p className="text-yellow-700">Sell high after creating artificial demand</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Retail Trader Reality</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Follows technical indicators blindly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Ignores volume analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Falls for false breakouts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Lacks institutional perspective</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "🚀 Our Solution",
      subtitle: "Learn Through Simulation",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
              <span className="text-4xl">🎮</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Interactive Learning Platform
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-4">📚 Case Library</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• 15+ Real Market Manipulation Cases</li>
                  <li>• Adani Group, Jane Street, and More</li>
                  <li>• Detailed Analysis & Insights</li>
                  <li>• Historical Data & News Context</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-4">🎯 Live Simulation</h3>
                <ul className="space-y-2 text-green-100">
                  <li>• Real-time Candlestick Charts</li>
                  <li>• Volume Analysis & Indicators</li>
                  <li>• Buy/Sell/Hold Trading</li>
                  <li>• P&L Tracking & Position Management</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-4">🧠 Smart Insights</h3>
                <ul className="space-y-2 text-purple-100">
                  <li>• Real-time Manipulation Alerts</li>
                  <li>• HNI Activity Detection</li>
                  <li>• Pattern Recognition</li>
                  <li>• Educational Explanations</li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-4">📊 Analytics</h3>
                <ul className="space-y-2 text-orange-100">
                  <li>• Trading Performance Analysis</li>
                  <li>• Behavioral Pattern Recognition</li>
                  <li>• Risk Assessment</li>
                  <li>• Improvement Recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "🎨 Key Features",
      subtitle: "What Makes Us Different",
      content: (
        <div className="space-y-8">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-4xl font-bold text-indigo-600 mb-4">Unique Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6 border border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Volume Analysis</h3>
                <p className="text-blue-700 text-sm">Real-time volume interpretation with institutional activity detection</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-3">🎭</div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Manipulation Insights</h3>
                <p className="text-green-700 text-sm">Live alerts about HNI manipulation phases and strategies</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-violet-100 p-6 border border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400 to-violet-500 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">Historical Preview</h3>
                <p className="text-purple-700 text-sm">Analyze historical patterns before simulation begins</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-red-100 p-6 border border-orange-200 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-3">🇮🇳</div>
                <h3 className="text-lg font-semibold text-orange-800 mb-2">Indian Market Focus</h3>
                <p className="text-orange-700 text-sm">Specialized for Indian stocks with INR pricing</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 to-cyan-100 p-6 border border-teal-200 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-teal-800 mb-2">Educational Content</h3>
                <p className="text-teal-700 text-sm">Comprehensive learning materials and tutorials</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-rose-100 p-6 border border-pink-200 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-bl-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="text-lg font-semibold text-pink-800 mb-2">Modern UI/UX</h3>
                <p className="text-pink-700 text-sm">Beautiful, responsive design with smooth animations</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "🎯 Ready to Start?",
      subtitle: "Begin Your Trading Journey",
      content: (
        <div className="text-center space-y-8">
          <div className="mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Start Learning Today
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of traders who are mastering the art of market manipulation detection
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-2">Explore Cases</h3>
              <p className="text-blue-100">Study real market manipulation scenarios</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="text-xl font-bold mb-2">Start Simulation</h3>
              <p className="text-green-100">Practice with live trading scenarios</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-6 rounded-xl text-white">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-purple-100">Monitor your learning journey</p>
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => navigate('/cases')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚀 Get Started Now
            </button>
            <p className="text-gray-500">Free to use • No registration required • Start learning immediately</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToSlide = (index) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') navigate('/');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative">
      <AnimatedBackground />
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-all duration-300 shadow-lg"
        >
          ← Back to Home
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="fixed top-4 right-4 z-50">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-indigo-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className={`max-w-6xl w-full transition-all duration-300 ${
          isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
        }`}>
          {/* Slide Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {slides[currentSlide].title}
            </h1>
            <p className="text-gray-600">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Slide Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            {slides[currentSlide].content}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentSlide === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105'
              }`}
            >
              ← Previous
            </button>

            <div className="text-center">
              <span className="text-gray-600">
                {currentSlide + 1} of {slides.length}
              </span>
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentSlide === slides.length - 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-105'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
          Use ← → arrow keys to navigate • ESC to exit
        </div>
      </div>
    </div>
  );
} 