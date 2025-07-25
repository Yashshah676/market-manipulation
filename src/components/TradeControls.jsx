import React, { useState } from 'react';

export default function TradeControls({ onTrade, disabled, currentPrice, cash, position, stock }) {
  const [qty, setQty] = useState(1);
  const [tradeType, setTradeType] = useState('MARKET'); // MARKET, LIMIT

  // Calculate max quantity based on cash
  const maxQty = Math.floor(cash / currentPrice);

  const handleTrade = (action) => {
    if (action === 'SELL' && qty > position) {
      alert(`You can only sell ${position} shares. You currently hold ${position} shares.`);
      return;
    }
    if (action === 'BUY' && qty > maxQty) {
      alert(`Insufficient funds. You can only buy ${maxQty} shares with ₹${cash.toLocaleString('en-IN')}.`);
      return;
    }
    onTrade(action, qty);
  };

  const quickQuantities = [1, 5, 10, 25, 50, 100];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trading Controls */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Trading Controls</h3>
          
          {/* Trade Type Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  tradeType === 'MARKET' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setTradeType('MARKET')}
              >
                Market
              </button>
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  tradeType === 'LIMIT' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setTradeType('LIMIT')}
              >
                Limit
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min={1}
                max={tradeType === 'BUY' ? maxQty : position}
                value={qty}
                onChange={e => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={disabled}
              />
              <span className="text-sm text-gray-500">shares</span>
            </div>
            
            {/* Quick Quantity Buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              {quickQuantities.map(amount => (
                <button
                  key={amount}
                  onClick={() => setQty(amount)}
                  className={`px-2 py-1 text-xs rounded border transition-colors ${
                    qty === amount
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                disabled || qty > maxQty
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
              onClick={() => handleTrade('BUY')}
              disabled={disabled || qty > maxQty}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>BUY</span>
              </div>
            </button>
            
            <button
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                disabled || qty > position
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
              onClick={() => handleTrade('SELL')}
              disabled={disabled || qty > position}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <span>SELL</span>
              </div>
            </button>
            
            <button
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                disabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
              onClick={() => handleTrade('HOLD')}
              disabled={disabled}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>HOLD</span>
              </div>
            </button>
          </div>
        </div>

        {/* Market Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Information</h3>
          
          <div className="space-y-4">
            {/* Stock Info */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Stock</div>
              <div className="text-lg font-bold text-gray-800">{stock?.symbol || 'STOCK'}</div>
              <div className="text-sm text-gray-600">{stock?.name || 'Indian Stock'}</div>
            </div>

            {/* Current Price */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-1">Current Price</div>
              <div className="text-2xl font-bold text-gray-800">₹{currentPrice.toLocaleString('en-IN')}</div>
            </div>

            {/* Account Summary */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Account Summary</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Cash:</span>
                  <span className="font-medium text-green-600">₹{cash.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Position:</span>
                  <span className={`font-medium ${position >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {position} shares
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max Buy Qty:</span>
                  <span className="font-medium text-gray-800">{maxQty} shares</span>
                </div>
              </div>
            </div>

            {/* Trade Preview */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Trade Preview</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Type:</span>
                  <span className="font-medium">{tradeType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{qty} shares</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Value:</span>
                  <span className="font-medium">₹{(qty * currentPrice).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
