import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SimulationChart from '../components/SimulationChart';
import PlaybackControls from '../components/PlaybackControls';
import TradeControls from '../components/TradeControls';
import TradeLog from '../components/TradeLog';

// Indian market data with realistic stock symbols and price ranges
const indianStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', basePrice: 2500, volatility: 0.03 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', basePrice: 3800, volatility: 0.025 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', basePrice: 1600, volatility: 0.035 },
  { symbol: 'INFY', name: 'Infosys', basePrice: 1400, volatility: 0.03 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', basePrice: 950, volatility: 0.04 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', basePrice: 2400, volatility: 0.025 },
  { symbol: 'ITC', name: 'ITC Limited', basePrice: 450, volatility: 0.02 },
  { symbol: 'SBIN', name: 'State Bank of India', basePrice: 650, volatility: 0.045 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', basePrice: 900, volatility: 0.04 },
  { symbol: 'AXISBANK', name: 'Axis Bank', basePrice: 950, volatility: 0.045 },
  { symbol: 'ADANIENT', name: 'Adani Enterprises', basePrice: 2800, volatility: 0.05 },
  { symbol: 'YESBANK', name: 'Yes Bank', basePrice: 15, volatility: 0.08 },
  { symbol: 'PNB', name: 'Punjab National Bank', basePrice: 80, volatility: 0.06 },
  { symbol: 'TECHM', name: 'Tech Mahindra', basePrice: 1200, volatility: 0.035 },
  { symbol: 'JETAIRWAYS', name: 'Jet Airways', basePrice: 25, volatility: 0.12 },
  { symbol: 'MULTIPLE', name: 'Multi-Stock Portfolio', basePrice: 1500, volatility: 0.06 }
];

// Enhanced mock data with Indian market characteristics
const generateIndianMarketData = (caseType, selectedStock = null) => {
  // Use the selected stock or find by symbol from case
  let stock;
  if (selectedStock && selectedStock.stock) {
    stock = indianStocks.find(s => s.symbol === selectedStock.stock) || indianStocks[0];
  } else {
    stock = selectedStock || indianStocks[Math.floor(Math.random() * indianStocks.length)];
  }
  
  const basePrice = stock.basePrice;
  const data = [];
  let currentPrice = basePrice;
  
  // Generate 50 data points for a more realistic simulation
  for (let i = 0; i < 50; i++) {
    const time = new Date('2024-01-15T09:15:00');
    time.setMinutes(time.getMinutes() + i * 5); // 5-minute intervals
    
    // Add volatility based on case type and Indian market characteristics
    let volatility = stock.volatility; // Base volatility from stock
    if (caseType === 'manipulation') {
      // Add manipulation patterns common in Indian markets
      if (i > 15 && i < 25) volatility = stock.volatility * 2; // High volatility period
      if (i > 30 && i < 40) volatility = stock.volatility * 3; // Manipulation period
      if (i > 40 && i < 50) volatility = stock.volatility * 1.5; // Recovery period
    }
    
    // Add Indian market characteristics (higher intraday volatility)
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    const open = currentPrice;
    const high = Math.max(open, currentPrice + change * 1.8); // Higher highs in Indian markets
    const low = Math.min(open, currentPrice + change * 0.6);
    const close = currentPrice + change;
    
    data.push({
      x: time,
      y: [open, high, low, close]
    });
    
    currentPrice = close;
  }
  
  return { data, stock };
};

export default function Simulation() {
  const location = useLocation();
  const selectedCase = location.state?.caseId ? location.state : null;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [trades, setTrades] = useState([]);
  const [position, setPosition] = useState(0); // Current position (positive = long, negative = short)
  const [cash, setCash] = useState(100000); // Starting cash in INR
  const [realizedPnL, setRealizedPnL] = useState(0);
  const [unrealizedPnL, setUnrealizedPnL] = useState(0);
  
  // Generate data based on selected case or use default - use useMemo to prevent regeneration
  const { data: candles, stock } = React.useMemo(() => 
    generateIndianMarketData(selectedCase ? 'manipulation' : 'normal', selectedCase), 
    [selectedCase]
  );
  
  const maxIndex = candles.length - 1;
  const intervalRef = useRef();

  // Calculate current portfolio value
  const currentPrice = candles[currentIndex]?.y[3] || stock.basePrice;
  const portfolioValue = cash + (position * currentPrice);
  const totalPnL = realizedPnL + unrealizedPnL;

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(idx => {
          if (idx < maxIndex) return idx + 1;
          setIsPlaying(false);
          return idx;
        });
      }, 1000 / speed);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, maxIndex]);

  // Update unrealized P&L when price changes
  useEffect(() => {
    if (position !== 0) {
      const avgPrice = trades.length > 0 ? 
        trades.filter(t => t.action === 'BUY').reduce((sum, t) => sum + t.price, 0) / 
        trades.filter(t => t.action === 'BUY').length : currentPrice;
      setUnrealizedPnL(position * (currentPrice - avgPrice));
    } else {
      setUnrealizedPnL(0);
    }
  }, [currentPrice, position, trades]);

  const handlePlayPause = () => setIsPlaying(p => !p);
  
  const handleStep = (dir) => {
    setCurrentIndex(idx => {
      let next = idx + dir;
      if (next < 0) next = 0;
      if (next > maxIndex) next = maxIndex;
      return next;
    });
    setIsPlaying(false);
  };
  
  const handleSpeedChange = (s) => setSpeed(s);

  // Enhanced trade logic with position tracking
  const handleTrade = (action, qty) => {
    const candle = candles[currentIndex];
    const price = candle.y[3]; // close price
    const time = candle.x.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let newPosition = position;
    let newCash = cash;
    let newRealizedPnL = realizedPnL;
    
    switch (action) {
      case 'BUY':
        const buyCost = qty * price;
        if (buyCost <= cash) {
          newCash -= buyCost;
          newPosition += qty;
        } else {
          alert('Insufficient funds!');
          return;
        }
        break;
      case 'SELL':
        if (position >= qty) {
          newCash += qty * price;
          newPosition -= qty;
          // Calculate realized P&L for closing positions
          const avgBuyPrice = trades.filter(t => t.action === 'BUY').reduce((sum, t) => sum + t.price, 0) / 
                             trades.filter(t => t.action === 'BUY').length;
          newRealizedPnL += qty * (price - avgBuyPrice);
        } else {
          alert('Insufficient position to sell!');
          return;
        }
        break;
      case 'HOLD':
        // No action, just log the decision
        break;
    }
    
    const trade = { 
      action, 
      qty, 
      price, 
      time, 
      index: currentIndex,
      position: newPosition,
      cash: newCash
    };
    
    setTrades(prev => [...prev, trade]);
    setPosition(newPosition);
    setCash(newCash);
    setRealizedPnL(newRealizedPnL);
  };

  // Reset simulation
  const handleReset = () => {
    setCurrentIndex(0);
    setIsPlaying(false);
    setTrades([]);
    setPosition(0);
    setCash(100000);
    setRealizedPnL(0);
    setUnrealizedPnL(0);
  };

  // Prepare for backend integration: send trades to backend on simulation end
  useEffect(() => {
    if (currentIndex === maxIndex && trades.length > 0) {
      console.log('Simulation ended. Final results:', {
        case: selectedCase?.title,
        stock: stock.symbol,
        trades,
        finalPortfolioValue: portfolioValue,
        totalPnL,
        realizedPnL,
        unrealizedPnL
      });
    }
  }, [currentIndex, maxIndex, trades, portfolioValue, totalPnL, realizedPnL, unrealizedPnL, stock, selectedCase]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-indigo-700">
                {selectedCase ? `${selectedCase.title} Simulation` : `${stock.symbol} - ${stock.name} Simulation`}
              </h2>
              <p className="text-gray-600">
                {selectedCase ? selectedCase.description : `Practice trading ${stock.name} (${stock.symbol}) with realistic Indian market data`}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Reset Simulation
            </button>
          </div>
          
          {/* Portfolio Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Portfolio Value</div>
              <div className="text-xl font-bold text-blue-800">₹{portfolioValue.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Cash</div>
              <div className="text-xl font-bold text-green-800">₹{cash.toLocaleString('en-IN')}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">Position</div>
              <div className="text-xl font-bold text-purple-800">{position}</div>
            </div>
            <div className={`p-4 rounded-lg ${totalPnL >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-sm font-medium ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Total P&L
              </div>
              <div className={`text-xl font-bold ${totalPnL >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                ₹{totalPnL.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <PlaybackControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onStep={handleStep}
                onSpeedChange={handleSpeedChange}
                speed={speed}
                canStepBack={currentIndex > 0}
                canStepForward={currentIndex < maxIndex}
                currentIndex={currentIndex}
                maxIndex={maxIndex}
              />
              <SimulationChart 
                currentIndex={currentIndex} 
                candles={candles}
                selectedCase={selectedCase}
                stock={stock}
              />
              <TradeControls
                onTrade={handleTrade}
                disabled={currentIndex === maxIndex}
                currentPrice={currentPrice}
                cash={cash}
                position={position}
                stock={stock}
              />
            </div>
          </div>

          {/* Trade Log Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700">Trade Log</h3>
              <TradeLog trades={trades} stock={stock} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
