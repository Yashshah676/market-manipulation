# Indian Market Manipulation Simulation Platform

## 🎯 Overview

An educational web-based simulation platform for understanding market manipulation patterns in Indian financial markets. Built with React.js, this platform allows users to practice trading with realistic data based on historical market manipulation cases.

## 🌟 Features

### 📚 Case Library
- **9 Real Indian Market Cases**: Historical manipulation scenarios from Indian markets
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Impact Analysis**: Market impact in INR (₹)
- **Educational Content**: Detailed descriptions and outcomes

### 🎮 Interactive Simulation
- **Real-time Chart Playback**: Progressive candlestick chart reveal using ApexCharts
- **Trading Controls**: Buy, Sell, Hold actions with position tracking
- **Portfolio Management**: Real-time P&L calculation in INR
- **Trade Logging**: Complete trade history with timestamps

### 🇮🇳 Indian Market Focus
- **Realistic Stock Prices**: Based on actual Indian stock price ranges
- **INR Currency**: All values displayed in Indian Rupees with proper formatting
- **Market Volatility**: Realistic Indian market characteristics
- **Stock Symbols**: Actual NSE stock symbols

### 📰 News Integration
- **Real-time Market News**: Latest updates from Indian financial markets
- **Category Filtering**: Market updates, earnings, regulatory, corporate news
- **Sentiment Analysis**: Positive, negative, neutral sentiment indicators
- **Source Attribution**: Economic Times, Business Standard, Moneycontrol, etc.

## 🏗️ Technology Stack

- **Frontend Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: ApexCharts
- **Routing**: React Router DOM
- **Package Manager**: npm

## 📦 Installation

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yashshah676/market-manipulation.git
   cd market-manipulation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173/`

## 🎮 Available Cases

### 1. Hindenburg Research vs Adani Group
- **Stock**: ADANIENT
- **Impact**: ₹2.5 lakh crore market cap loss
- **Pattern**: Short selling research report
- **Difficulty**: Advanced

### 2. Yes Bank Crisis
- **Stock**: YESBANK
- **Impact**: ₹90,000 crore market cap loss
- **Pattern**: Banking crisis and regulatory intervention
- **Difficulty**: Advanced

### 3. IL&FS Default Crisis
- **Stock**: IL&FS
- **Impact**: ₹1 lakh crore market impact
- **Pattern**: NBFC liquidity crisis
- **Difficulty**: Advanced

### 4. Reliance Jio Disruption
- **Stock**: RELIANCE
- **Impact**: ₹2 lakh crore sector disruption
- **Pattern**: Market disruption through innovation
- **Difficulty**: Intermediate

### 5. PNB Fraud Case
- **Stock**: PNB
- **Impact**: ₹11,400 crore fraud exposure
- **Pattern**: Banking fraud and regulatory scrutiny
- **Difficulty**: Intermediate

### 6. Satyam Scam
- **Stock**: TECHM
- **Impact**: ₹7,000 crore fraud
- **Pattern**: Accounting fraud and corporate governance failure
- **Difficulty**: Advanced

### 7. DHFL Crisis
- **Stock**: DHFL
- **Impact**: ₹1 lakh crore exposure
- **Pattern**: Housing finance liquidity crisis
- **Difficulty**: Intermediate

### 8. Jet Airways Collapse
- **Stock**: JETAIRWAYS
- **Impact**: ₹8,000 crore debt default
- **Pattern**: Aviation sector crisis
- **Difficulty**: Intermediate

### 9. Jane Street Algorithmic Trading Controversy
- **Stock**: MULTIPLE (Multi-Stock Portfolio)
- **Impact**: ₹15,000 crore trading volume impact
- **Pattern**: Algorithmic trading and market making scrutiny
- **Difficulty**: Advanced
- **Timeframe**: December 18, 2023 - February 16, 2024

## 📊 Available Stocks

| Symbol | Company Name | Base Price (₹) | Volatility |
|--------|--------------|----------------|------------|
| RELIANCE | Reliance Industries | 2,500 | 3% |
| TCS | Tata Consultancy Services | 3,800 | 2.5% |
| HDFCBANK | HDFC Bank | 1,600 | 3.5% |
| INFY | Infosys | 1,400 | 3% |
| ICICIBANK | ICICI Bank | 950 | 4% |
| HINDUNILVR | Hindustan Unilever | 2,400 | 2.5% |
| ITC | ITC Limited | 450 | 2% |
| SBIN | State Bank of India | 650 | 4.5% |
| BHARTIARTL | Bharti Airtel | 900 | 4% |
| AXISBANK | Axis Bank | 950 | 4.5% |
| ADANIENT | Adani Enterprises | 2,800 | 5% |
| YESBANK | Yes Bank | 15 | 8% |
| PNB | Punjab National Bank | 80 | 6% |
| TECHM | Tech Mahindra | 1,200 | 3.5% |
| JETAIRWAYS | Jet Airways | 25 | 12% |
| MULTIPLE | Multi-Stock Portfolio | 1,500 | 6% |

## 🎯 Trading Features

### Portfolio Management
- **Starting Capital**: ₹1,00,000
- **Position Tracking**: Real-time long/short positions
- **P&L Calculation**: Realized and unrealized profits/losses
- **Cash Management**: Available cash for trading

### Chart Controls
- **Play/Pause**: Control simulation speed
- **Step Forward/Backward**: Manual progression
- **Speed Control**: 0.5x to 8x playback speed
- **Progress Indicator**: Visual progress tracking

### Trading Actions
- **Buy**: Purchase shares (requires sufficient cash)
- **Sell**: Sell shares (requires sufficient position)
- **Hold**: No action, just log decision
- **Quantity Selection**: 1, 5, 10, 25, 50, 100 shares

## 📰 News Categories

- **Market Updates**: Nifty 50, FII flows, market indices
- **Earnings**: Quarterly results and financial performance
- **Regulatory**: SEBI, RBI announcements and investigations
- **Corporate**: Company news and developments
- **Monetary Policy**: RBI policy decisions and repo rates
- **Policy**: Government schemes and policy changes

## 🚀 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Linting and Formatting
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## 📁 Project Structure

```
market-sim-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── CaseList.jsx    # Case library display
│   │   ├── CaseDetail.jsx  # Case details modal
│   │   ├── SimulationChart.jsx # ApexCharts candlestick chart
│   │   ├── PlaybackControls.jsx # Chart playback controls
│   │   ├── TradeControls.jsx # Trading interface
│   │   ├── TradeLog.jsx    # Trade history display
│   │   └── NavBar.jsx      # Navigation component
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── CaseLibrary.jsx # Case library page
│   │   ├── Simulation.jsx  # Main simulation page
│   │   ├── News.jsx        # News and updates page
│   │   └── Feedback.jsx    # Feedback and results page
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main app component
│   ├── index.jsx           # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── README.md               # Project documentation
```

## 🎓 Educational Objectives

1. **Understand Market Manipulation**: Learn to identify manipulation patterns
2. **Risk Management**: Practice position sizing and risk control
3. **Market Psychology**: Understand emotional trading vs rational decisions
4. **Regulatory Awareness**: Learn about market regulations and compliance
5. **Technical Analysis**: Practice chart reading and pattern recognition

## 🔒 Safety Features

- **Educational Purpose**: All simulations are for learning only
- **No Real Money**: Virtual trading environment
- **Historical Data**: Based on past events, not real-time
- **Risk-Free Practice**: Safe environment to learn trading strategies

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

**Educational Purpose Only**: This platform is designed for educational purposes only. Past performance does not guarantee future results. Always consult with financial advisors before making real investment decisions.

## 📞 Support

For questions, issues, or contributions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `/docs` folder

## 🚀 Future Enhancements

1. **Real-time Data Integration**: Connect to live market data feeds
2. **Options Trading**: Add call/put options simulation
3. **Technical Indicators**: RSI, MACD, Moving Averages
4. **Multi-timeframe Analysis**: Daily, weekly, monthly charts
5. **Backtesting**: Historical strategy testing
6. **Social Features**: Leaderboards and community challenges
7. **Mobile App**: Native mobile application
8. **AI Insights**: Machine learning-based trading suggestions

---

**Built with ❤️ for Indian Market Education**
