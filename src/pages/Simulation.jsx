import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SimulationChart from '../components/SimulationChart';
import PlaybackControls from '../components/PlaybackControls';
import TradeControls from '../components/TradeControls';
import TradeLog from '../components/TradeLog';
import VolumeAnalysis from '../components/VolumeAnalysis';
import ManipulationInsights from '../components/ManipulationInsights';

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

// Enhanced mock data with Indian market characteristics and volume
const generateIndianMarketData = (caseType, selectedStock = null) => {
  // Use the selected stock or find by symbol from case
  let stock;
  if (selectedStock && selectedStock.stock) {
    stock = indianStocks.find(s => s.symbol === selectedStock.stock) || indianStocks[0];
  } else {
    stock = selectedStock || indianStocks[Math.floor(Math.random() * indianStocks.length)];
  }
  
  const basePrice = stock.basePrice;
  const baseVolume = 1000000; // Base volume in shares
  const data = [];
  const volumeData = [];
  let currentPrice = basePrice;
  
  // Generate 100 data points (50 historical + 50 simulation)
  for (let i = 0; i < 100; i++) {
    const time = new Date('2024-01-15T09:15:00');
    time.setMinutes(time.getMinutes() + i * 5); // 5-minute intervals
    
    // Add volatility based on case type and Indian market characteristics
    let volatility = stock.volatility; // Base volatility from stock
    let volumeMultiplier = 1;
    
    if (caseType === 'manipulation') {
      // Historical period (0-49): Normal trading, slight uptrend to lure retail
      if (i < 50) {
        volatility = stock.volatility * 0.8;
        volumeMultiplier = 0.8 + (i / 50) * 0.4; // Gradually increasing volume
        // Create a bullish pattern to attract retail investors
        const trendBias = 0.3; // Slight upward bias
        const change = (Math.random() - 0.5 + trendBias) * volatility * currentPrice;
        const open = currentPrice;
        const high = Math.max(open, currentPrice + change * 1.5);
        const low = Math.min(open, currentPrice + change * 0.8);
        const close = currentPrice + change;
        
        data.push({
          x: time,
          y: [open, high, low, close]
        });
        
        // Generate volume with some correlation to price movement
        const volume = baseVolume * volumeMultiplier * (1 + Math.abs(change) / currentPrice * 10);
        volumeData.push({
          x: time,
          y: Math.round(volume)
        });
        
        currentPrice = close;
        continue;
      }
      
      // Manipulation period (50-99): HNI intervention
      if (i >= 50) {
        const manipulationPhase = i - 50;
        
        if (manipulationPhase < 10) {
          // Phase 1: HNI starts accumulating (price continues up, volume spikes)
          volatility = stock.volatility * 1.5;
          volumeMultiplier = 2.5;
          const change = (Math.random() - 0.3) * volatility * currentPrice; // Still bullish
          const open = currentPrice;
          const high = Math.max(open, currentPrice + change * 1.8);
          const low = Math.min(open, currentPrice + change * 0.7);
          const close = currentPrice + change;
          
          data.push({
            x: time,
            y: [open, high, low, close]
          });
          
          const volume = baseVolume * volumeMultiplier * (1.5 + Math.random() * 0.5);
          volumeData.push({
            x: time,
            y: Math.round(volume)
          });
          
          currentPrice = close;
        } else if (manipulationPhase < 25) {
          // Phase 2: HNI starts selling, price reversal begins
          volatility = stock.volatility * 2.5;
          volumeMultiplier = 3.5;
          const change = (Math.random() - 0.7) * volatility * currentPrice; // Bearish bias
          const open = currentPrice;
          const high = Math.max(open, currentPrice + change * 1.2);
          const low = Math.min(open, currentPrice + change * 1.8);
          const close = currentPrice + change;
          
          data.push({
            x: time,
            y: [open, high, low, close]
          });
          
          const volume = baseVolume * volumeMultiplier * (2 + Math.random() * 1);
          volumeData.push({
            x: time,
            y: Math.round(volume)
          });
          
          currentPrice = close;
        } else if (manipulationPhase < 40) {
          // Phase 3: Heavy selling, sharp decline
          volatility = stock.volatility * 4;
          volumeMultiplier = 5;
          const change = (Math.random() - 0.8) * volatility * currentPrice; // Strong bearish
          const open = currentPrice;
          const high = Math.max(open, currentPrice + change * 0.8);
          const low = Math.min(open, currentPrice + change * 2.2);
          const close = currentPrice + change;
          
          data.push({
            x: time,
            y: [open, high, low, close]
          });
          
          const volume = baseVolume * volumeMultiplier * (3 + Math.random() * 2);
          volumeData.push({
            x: time,
            y: Math.round(volume)
          });
          
          currentPrice = close;
        } else {
          // Phase 4: Recovery/consolidation
          volatility = stock.volatility * 1.8;
          volumeMultiplier = 2;
          const change = (Math.random() - 0.5) * volatility * currentPrice; // Neutral
          const open = currentPrice;
          const high = Math.max(open, currentPrice + change * 1.4);
          const low = Math.min(open, currentPrice + change * 1.4);
          const close = currentPrice + change;
          
          data.push({
            x: time,
            y: [open, high, low, close]
          });
          
          const volume = baseVolume * volumeMultiplier * (1.2 + Math.random() * 0.8);
          volumeData.push({
            x: time,
            y: Math.round(volume)
          });
          
          currentPrice = close;
        }
      }
    } else {
      // Normal trading pattern
      const change = (Math.random() - 0.5) * volatility * currentPrice;
      const open = currentPrice;
      const high = Math.max(open, currentPrice + change * 1.6);
      const low = Math.min(open, currentPrice + change * 0.8);
      const close = currentPrice + change;
      
      data.push({
        x: time,
        y: [open, high, low, close]
      });
      
      const volume = baseVolume * (0.8 + Math.random() * 0.4);
      volumeData.push({
        x: time,
        y: Math.round(volume)
      });
      
      currentPrice = close;
    }
  }
  
  return { data, volumeData, stock };
};

export default function Simulation() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCase = location.state;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [trades, setTrades] = useState([]);
  const [position, setPosition] = useState(0); // Current position (positive = long, negative = short)
  const [cash, setCash] = useState(100000); // Starting cash in INR
  const [realizedPnL, setRealizedPnL] = useState(0);
  const [unrealizedPnL, setUnrealizedPnL] = useState(0);
  const [showPreview, setShowPreview] = useState(true); // Show historical preview first
  const [simulationStarted, setSimulationStarted] = useState(false);
  
  // Generate data based on selected case or use default - use useMemo to prevent regeneration
  const { data: candles, volumeData, stock } = React.useMemo(() => 
    generateIndianMarketData(selectedCase ? 'manipulation' : 'normal', selectedCase), 
    [selectedCase]
  );

  // If no case is selected, show a message to select one
  if (!selectedCase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">No Case Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select a case from the Case Library to start the simulation.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go Back to Case Library
          </button>
        </div>
      </div>
    );
  }

  // Show preview mode before simulation starts
  if (showPreview && !simulationStarted) {
    const historicalData = candles.slice(0, 50); // First 50 points are historical
    const historicalVolume = volumeData.slice(0, 50);
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Preview Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-indigo-700">
                  Historical Analysis: {selectedCase.title}
                </h2>
                <p className="text-gray-600">
                  Study the historical price movement and volume patterns before the manipulation event
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/cases')}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Cases
                </button>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    setSimulationStarted(true);
                    setCurrentIndex(50); // Start from manipulation period
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Simulation
                </button>
              </div>
            </div>
            
            {/* Market Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600 font-medium">Historical Trend</div>
                <div className="text-lg font-bold text-blue-800">Bullish ↗️</div>
                <div className="text-xs text-blue-600">Gradual uptrend with increasing volume</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-sm text-yellow-600 font-medium">Volume Pattern</div>
                <div className="text-lg font-bold text-yellow-800">Accumulation 📈</div>
                <div className="text-xs text-yellow-600">Volume building up gradually</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-red-600 font-medium">Risk Warning</div>
                <div className="text-lg font-bold text-red-800">⚠️ HNI Activity</div>
                <div className="text-xs text-red-600">Large players may intervene</div>
              </div>
            </div>
          </div>

          {/* Historical Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Historical Price Movement (Last 4 Hours)</h3>
            <SimulationChart 
              currentIndex={49} 
              candles={historicalData}
              volumeData={historicalVolume}
              selectedCase={selectedCase}
              stock={stock}
              isPreview={true}
            />
            
            {/* Manipulation Insights */}
            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-400">
              <h4 className="font-semibold text-red-800 mb-2">🎯 What Happened Next (Manipulation Pattern)</h4>
              <div className="text-sm text-red-700 space-y-2">
                <p><strong>Phase 1 (0-10 min):</strong> HNI accumulation - Price continues up, volume spikes 2.5x</p>
                <p><strong>Phase 2 (10-25 min):</strong> HNI selling begins - Price reversal, volume 3.5x normal</p>
                <p><strong>Phase 3 (25-40 min):</strong> Heavy selling - Sharp decline, volume 5x normal</p>
                <p><strong>Phase 4 (40-50 min):</strong> Recovery/consolidation - Price stabilizes</p>
              </div>
              <div className="mt-3 p-3 bg-white rounded border">
                <p className="text-sm text-gray-700">
                  <strong>Why did it go opposite?</strong> HNIs created a false bullish pattern to attract retail investors, 
                  then used their large positions to reverse the trend and profit from the decline. This is a classic 
                  "pump and dump" manipulation strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
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
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/cases')}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Cases
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset Simulation
              </button>
            </div>
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
                volumeData={volumeData}
                selectedCase={selectedCase}
                stock={stock}
                isPreview={false}
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
            
            {/* Manipulation Insights */}
            <div className="mt-6">
              <ManipulationInsights 
                currentIndex={currentIndex}
                volumeData={volumeData}
                candles={candles}
                selectedCase={selectedCase}
              />
            </div>
          </div>

          {/* Trade Log and Volume Analysis Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <VolumeAnalysis 
              volumeData={volumeData} 
              currentIndex={currentIndex} 
              stock={stock} 
            />
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
