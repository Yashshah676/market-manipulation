import React from 'react';

export default function TradeLog({ trades, stock }) {
  if (!trades.length) {
    return (
      <div className="text-center py-8">
        <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-gray-500 text-sm">No trades yet. Start trading {stock?.symbol || 'STOCK'} to see your history here.</p>
      </div>
    );
  }

  const getActionColor = (action) => {
    switch (action) {
      case 'BUY': return 'text-green-600 bg-green-50 border-green-200';
      case 'SELL': return 'text-red-600 bg-red-50 border-red-200';
      case 'HOLD': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'BUY': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      );
      case 'SELL': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      );
      case 'HOLD': return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Stock Info Header */}
      <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
        <div className="text-sm text-indigo-600 font-medium mb-1">Trading {stock?.symbol || 'STOCK'}</div>
        <div className="text-xs text-indigo-500">{stock?.name || 'Indian Stock'}</div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="text-xs text-green-600 font-medium">BUY Orders</div>
          <div className="text-lg font-bold text-green-700">
            {trades.filter(t => t.action === 'BUY').length}
          </div>
        </div>
        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
          <div className="text-xs text-red-600 font-medium">SELL Orders</div>
          <div className="text-lg font-bold text-red-700">
            {trades.filter(t => t.action === 'SELL').length}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="text-xs text-gray-600 font-medium">HOLD Orders</div>
          <div className="text-lg font-bold text-gray-700">
            {trades.filter(t => t.action === 'HOLD').length}
          </div>
        </div>
      </div>

      {/* Trade List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {trades.map((trade, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full border ${getActionColor(trade.action)}`}>
                  {getActionIcon(trade.action)}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {trade.action} {trade.qty} shares
                  </div>
                  <div className="text-sm text-gray-500">
                    {trade.time} • Candle #{trade.index + 1}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-800">
                  ₹{trade.price.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-500">
                  ₹{(trade.qty * trade.price).toLocaleString('en-IN')}
                </div>
              </div>
            </div>
            
            {/* Position and Cash Update */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              <div className="text-xs">
                <span className="text-gray-500">Position:</span>
                <span className={`ml-1 font-medium ${trade.position >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {trade.position} shares
                </span>
              </div>
              <div className="text-xs text-right">
                <span className="text-gray-500">Cash:</span>
                <span className="ml-1 font-medium text-green-600">
                  ₹{trade.cash.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trade Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">Trade Summary</div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-500">Total Trades:</span>
            <span className="ml-1 font-medium">{trades.length}</span>
          </div>
          <div>
            <span className="text-gray-500">Total Volume:</span>
            <span className="ml-1 font-medium">
              {trades.reduce((sum, t) => sum + t.qty, 0)} shares
            </span>
          </div>
          <div>
            <span className="text-gray-500">Avg Price:</span>
            <span className="ml-1 font-medium">
              ₹{(trades.reduce((sum, t) => sum + t.price, 0) / trades.length).toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Final Position:</span>
            <span className={`ml-1 font-medium ${trades.length > 0 ? (trades[trades.length - 1].position >= 0 ? 'text-blue-600' : 'text-red-600') : 'text-gray-600'}`}>
              {trades.length > 0 ? trades[trades.length - 1].position : 0} shares
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
