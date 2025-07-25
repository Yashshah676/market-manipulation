import React, { useState, useEffect } from 'react';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample Indian market news data
  const sampleNews = [
    {
      id: 1,
      title: 'RBI Maintains Repo Rate at 6.5% for Sixth Consecutive Time',
      summary: 'The Reserve Bank of India kept the repo rate unchanged at 6.5% in its latest monetary policy meeting, signaling continued focus on inflation control.',
      category: 'monetary-policy',
      source: 'Economic Times',
      publishedAt: '2024-01-15T10:30:00Z',
      url: '#',
      sentiment: 'neutral'
    },
    {
      id: 2,
      title: 'Reliance Industries Reports Strong Q3 Results',
      summary: 'Reliance Industries posted a 9.3% increase in net profit for Q3 FY24, driven by strong performance in oil-to-chemicals and retail segments.',
      category: 'earnings',
      source: 'Business Standard',
      publishedAt: '2024-01-15T09:15:00Z',
      url: '#',
      sentiment: 'positive'
    },
    {
      id: 3,
      title: 'SEBI Tightens Norms for Algorithmic Trading',
      summary: 'SEBI introduces new regulations for algorithmic trading to enhance market stability and prevent market manipulation.',
      category: 'regulatory',
      source: 'Moneycontrol',
      publishedAt: '2024-01-15T08:45:00Z',
      url: '#',
      sentiment: 'neutral'
    },
    {
      id: 4,
      title: 'Nifty 50 Hits New All-Time High',
      summary: 'The Nifty 50 index crossed 22,000 points for the first time, driven by strong global cues and positive domestic fundamentals.',
      category: 'market-update',
      source: 'CNBC TV18',
      publishedAt: '2024-01-15T08:00:00Z',
      url: '#',
      sentiment: 'positive'
    },
    {
      id: 5,
      title: 'HDFC Bank Faces RBI Penalty for Regulatory Violations',
      summary: 'RBI imposes ₹10 crore penalty on HDFC Bank for non-compliance with certain regulatory guidelines.',
      category: 'regulatory',
      source: 'Financial Express',
      publishedAt: '2024-01-14T16:30:00Z',
      url: '#',
      sentiment: 'negative'
    },
    {
      id: 6,
      title: 'TCS Announces Major Digital Transformation Deal',
      summary: 'TCS secures a multi-year digital transformation contract worth ₹2,500 crore from a European financial services company.',
      category: 'corporate',
      source: 'Livemint',
      publishedAt: '2024-01-14T15:20:00Z',
      url: '#',
      sentiment: 'positive'
    },
    {
      id: 7,
      title: 'FIIs Continue Selling Spree in Indian Markets',
      summary: 'Foreign Institutional Investors sold Indian equities worth ₹8,500 crore in the first week of January, marking continued outflow.',
      category: 'market-update',
      source: 'Economic Times',
      publishedAt: '2024-01-14T14:15:00Z',
      url: '#',
      sentiment: 'negative'
    },
    {
      id: 8,
      title: 'Adani Group Stocks Rally on Positive Court Ruling',
      summary: 'Adani Group stocks gained 3-5% after Supreme Court ruled in favor of the group in a key regulatory matter.',
      category: 'corporate',
      source: 'Business Today',
      publishedAt: '2024-01-14T13:00:00Z',
      url: '#',
      sentiment: 'positive'
    },
    {
      id: 9,
      title: 'Yes Bank Reports Improved Asset Quality',
      summary: 'Yes Bank shows significant improvement in asset quality with gross NPA ratio declining to 2% in Q3 FY24.',
      category: 'earnings',
      source: 'Financial Express',
      publishedAt: '2024-01-14T11:30:00Z',
      url: '#',
      sentiment: 'positive'
    },
    {
      id: 10,
      title: 'Government Announces New PLI Scheme for Electronics',
      summary: 'Union Cabinet approves Production Linked Incentive scheme worth ₹17,000 crore for electronics manufacturing.',
      category: 'policy',
      source: 'PTI',
      publishedAt: '2024-01-14T10:00:00Z',
      url: '#',
      sentiment: 'positive'
    },
    {
      id: 11,
      title: 'Jane Street Capital Faces SEBI Probe Over Algorithmic Trading',
      summary: 'SEBI launches investigation into Jane Street Capital\'s algorithmic trading practices in Indian markets, focusing on potential market manipulation through high-frequency trading.',
      category: 'regulatory',
      source: 'Economic Times',
      publishedAt: '2024-02-15T09:30:00Z',
      url: '#',
      sentiment: 'negative'
    },
    {
      id: 12,
      title: 'High-Frequency Trading Firms Under Regulatory Scanner',
      summary: 'SEBI intensifies scrutiny of HFT firms operating in Indian markets, with Jane Street Capital among those under investigation for trading practices.',
      category: 'regulatory',
      source: 'Business Standard',
      publishedAt: '2024-02-10T14:20:00Z',
      url: '#',
      sentiment: 'neutral'
    },
    {
      id: 13,
      title: 'Market Making Activities Under Review by SEBI',
      summary: 'SEBI reviews market making activities of foreign firms including Jane Street Capital, examining potential conflicts of interest and market manipulation.',
      category: 'regulatory',
      source: 'Moneycontrol',
      publishedAt: '2024-01-25T11:15:00Z',
      url: '#',
      sentiment: 'neutral'
    },
    {
      id: 14,
      title: 'Algorithmic Trading Volume Hits Record High in Indian Markets',
      summary: 'Algorithmic trading accounts for over 60% of total trading volume in Indian equity markets, raising concerns about market stability and manipulation risks.',
      category: 'market-update',
      source: 'CNBC TV18',
      publishedAt: '2024-01-20T16:45:00Z',
      url: '#',
      sentiment: 'neutral'
    },
    {
      id: 15,
      title: 'Foreign Trading Firms Face Stricter Compliance Requirements',
      summary: 'SEBI proposes stricter compliance requirements for foreign trading firms operating in Indian markets, following investigation into Jane Street Capital.',
      category: 'regulatory',
      source: 'Financial Express',
      publishedAt: '2024-01-18T13:30:00Z',
      url: '#',
      sentiment: 'neutral'
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', count: sampleNews.length },
    { id: 'market-update', name: 'Market Updates', count: sampleNews.filter(n => n.category === 'market-update').length },
    { id: 'earnings', name: 'Earnings', count: sampleNews.filter(n => n.category === 'earnings').length },
    { id: 'regulatory', name: 'Regulatory', count: sampleNews.filter(n => n.category === 'regulatory').length },
    { id: 'corporate', name: 'Corporate', count: sampleNews.filter(n => n.category === 'corporate').length },
    { id: 'monetary-policy', name: 'Monetary Policy', count: sampleNews.filter(n => n.category === 'monetary-policy').length },
    { id: 'policy', name: 'Policy', count: sampleNews.filter(n => n.category === 'policy').length }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNews(sampleNews);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '📈';
      case 'negative': return '📉';
      case 'neutral': return '➡️';
      default: return '➡️';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading latest market news...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-indigo-700">Indian Market News</h2>
              <p className="text-gray-600">Latest updates and insights from the Indian financial markets</p>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleString('en-IN')}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.summary}
                  </p>
                </div>
                <div className={`ml-3 p-2 rounded-full border text-xs ${getSentimentColor(item.sentiment)}`}>
                  {getSentimentIcon(item.sentiment)}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{item.source}</span>
                  <span>•</span>
                  <span>{new Date(item.publishedAt).toLocaleDateString('en-IN')}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs capitalize ${
                  item.category === 'market-update' ? 'bg-blue-100 text-blue-700' :
                  item.category === 'earnings' ? 'bg-green-100 text-green-700' :
                  item.category === 'regulatory' ? 'bg-yellow-100 text-yellow-700' :
                  item.category === 'corporate' ? 'bg-purple-100 text-purple-700' :
                  item.category === 'monetary-policy' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.category.replace('-', ' ')}
                </span>
              </div>

              <button 
                className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                onClick={() => window.open(item.url, '_blank')}
              >
                Read Full Article
              </button>
            </div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📰</div>
            <p className="text-gray-500">No news available for the selected category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
