import React, { useEffect, useState } from 'react';

export default function CaseList({ onSelectCase }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample Indian market manipulation cases
  const sampleCases = [
    {
      _id: '1',
      title: 'Hindenburg Research vs Adani Group',
      stock: 'ADANIENT',
      timeframe: 'January 2023',
      tags: ['Short Selling', 'Research Report', 'Market Manipulation'],
      description: 'Hindenburg Research released a damning report alleging accounting fraud and stock manipulation by the Adani Group, causing a massive sell-off in Adani stocks.',
      difficulty: 'Advanced',
      impact: '₹2.5 lakh crore market cap loss'
    },
    {
      _id: '2',
      title: 'Yes Bank Crisis',
      stock: 'YESBANK',
      timeframe: 'March 2020',
      tags: ['Banking Crisis', 'Regulatory Action', 'Market Crash'],
      description: 'Yes Bank faced severe liquidity crisis leading to RBI intervention and temporary moratorium, causing massive volatility in banking stocks.',
      difficulty: 'Advanced',
      impact: '₹90,000 crore market cap loss'
    },
    {
      _id: '3',
      title: 'IL&FS Default Crisis',
      stock: 'IL&FS',
      timeframe: 'September 2018',
      tags: ['NBFC Crisis', 'Liquidity Crunch', 'Systemic Risk'],
      description: 'IL&FS default triggered a liquidity crisis in NBFC sector, affecting multiple financial institutions and causing market-wide panic.',
      difficulty: 'Advanced',
      impact: '₹1 lakh crore market impact'
    },
    {
      _id: '4',
      title: 'Reliance Jio Disruption',
      stock: 'RELIANCE',
      timeframe: '2016-2017',
      tags: ['Telecom Disruption', 'Price War', 'Market Dominance'],
      description: 'Reliance Jio\'s entry disrupted the telecom sector with free services, causing massive volatility in telecom stocks.',
      difficulty: 'Intermediate',
      impact: '₹2 lakh crore sector disruption'
    },
    {
      _id: '5',
      title: 'PNB Fraud Case',
      stock: 'PNB',
      timeframe: 'February 2018',
      tags: ['Banking Fraud', 'Regulatory Scrutiny', 'Market Volatility'],
      description: 'Punjab National Bank discovered ₹11,400 crore fraud, leading to significant volatility in banking sector stocks.',
      difficulty: 'Intermediate',
      impact: '₹11,400 crore fraud exposure'
    },
    {
      _id: '6',
      title: 'Satyam Scam',
      stock: 'TECHM',
      timeframe: 'January 2009',
      tags: ['Accounting Fraud', 'Corporate Governance', 'Market Crash'],
      description: 'Satyam Computer Services revealed ₹7,000 crore accounting fraud, one of India\'s biggest corporate scandals.',
      difficulty: 'Advanced',
      impact: '₹7,000 crore fraud'
    },
    {
      _id: '7',
      title: 'DHFL Crisis',
      stock: 'DHFL',
      timeframe: '2019-2020',
      tags: ['Housing Finance', 'Liquidity Crisis', 'Default Risk'],
      description: 'Dewan Housing Finance Corporation faced severe liquidity crisis, leading to defaults and market panic in housing finance sector.',
      difficulty: 'Intermediate',
      impact: '₹1 lakh crore exposure'
    },
    {
      _id: '8',
      title: 'Jet Airways Collapse',
      stock: 'JETAIRWAYS',
      timeframe: 'April 2019',
      tags: ['Aviation Crisis', 'Debt Default', 'Market Volatility'],
      description: 'Jet Airways suspended operations due to severe financial crisis, causing volatility in aviation sector stocks.',
      difficulty: 'Intermediate',
      impact: '₹8,000 crore debt default'
    },
    {
      _id: '9',
      title: 'Jane Street Algorithmic Trading Controversy',
      stock: 'MULTIPLE',
      timeframe: 'December 2023 - February 2024',
      tags: ['Algorithmic Trading', 'Market Making', 'Regulatory Scrutiny', 'High-Frequency Trading'],
      description: 'Jane Street Capital faced regulatory scrutiny over its algorithmic trading practices in Indian markets, particularly around market making activities and potential market manipulation through high-frequency trading strategies.',
      difficulty: 'Advanced',
      impact: '₹15,000 crore trading volume impact'
    }
  ];

  useEffect(() => {
    // Try to fetch from backend first
    fetch('http://localhost:5000/api/cases')
      .then(res => {
        if (!res.ok) throw new Error('Backend not available');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          setCases(data);
        } else {
          // Use sample data if backend returns empty
          setCases(sampleCases);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('Using sample data:', err.message);
        // Use sample data if backend is not available
        setCases(sampleCases);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading Indian market cases...</p>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 py-8">
      <p className="mb-2">{error}</p>
      <p className="text-sm text-gray-500">Using sample Indian market data for demonstration</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((c) => (
          <div key={c._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 flex flex-col border border-gray-100">
            <div className="flex items-start justify-between mb-3">
              <div className="font-bold text-lg text-indigo-700 mb-2 flex-1">{c.title}</div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                c.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                c.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {c.difficulty}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Stock:</span> {c.stock}
            </div>
            <div className="text-sm text-gray-600 mb-3">
              <span className="font-medium">Timeframe:</span> {c.timeframe}
            </div>
            <div className="flex flex-wrap gap-1 mb-4">
              {c.tags?.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-4 flex-1">{c.description}</p>
            {c.impact && (
              <div className="text-xs text-red-600 mb-4 font-medium">
                Market Impact: {c.impact}
              </div>
            )}
            <button 
              onClick={() => onSelectCase(c)} 
              className="mt-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
