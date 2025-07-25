import React from 'react';

export default function ManipulationInsights({ currentIndex, volumeData, candles, selectedCase }) {
  if (!selectedCase || currentIndex < 50) return null; // Only show during manipulation period

  const manipulationPhase = currentIndex - 50;
  const currentVolume = volumeData[currentIndex]?.y || 0;
  const avgVolume = volumeData.slice(0, 50).reduce((sum, v) => sum + v.y, 0) / 50; // Historical average
  const volumeRatio = currentVolume / avgVolume;
  
  const currentPrice = candles[currentIndex]?.y[3] || 0;
  const historicalHigh = Math.max(...candles.slice(0, 50).map(c => c.y[1])); // Highest high in historical data
  const priceFromHigh = ((currentPrice - historicalHigh) / historicalHigh) * 100;

  const getPhaseInsight = () => {
    if (manipulationPhase < 10) {
      return {
        phase: 'Phase 1: HNI Accumulation',
        description: 'Large players are accumulating positions while price continues to rise',
        warning: 'Volume spike indicates institutional buying - be cautious of false breakout',
        color: 'bg-yellow-50 border-yellow-200',
        icon: '📈'
      };
    } else if (manipulationPhase < 25) {
      return {
        phase: 'Phase 2: Distribution Begins',
        description: 'HNIs start selling their accumulated positions',
        warning: 'Price reversal with high volume - manipulation in progress',
        color: 'bg-orange-50 border-orange-200',
        icon: '⚠️'
      };
    } else if (manipulationPhase < 40) {
      return {
        phase: 'Phase 3: Heavy Selling',
        description: 'Intense selling pressure from large positions',
        warning: 'Sharp decline with massive volume - classic pump and dump pattern',
        color: 'bg-red-50 border-red-200',
        icon: '🚨'
      };
    } else {
      return {
        phase: 'Phase 4: Recovery/Consolidation',
        description: 'Price stabilizes as manipulation completes',
        warning: 'Market finding new equilibrium after manipulation',
        color: 'bg-blue-50 border-blue-200',
        icon: '📊'
      };
    }
  };

  const insight = getPhaseInsight();

  return (
    <div className={`rounded-lg border-l-4 p-4 ${insight.color}`}>
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{insight.icon}</div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{insight.phase}</h4>
          <p className="text-sm text-gray-700 mb-2">{insight.description}</p>
          
          <div className="bg-white rounded p-3 mb-3">
            <p className="text-sm text-gray-600 font-medium">⚠️ Warning:</p>
            <p className="text-sm text-gray-700">{insight.warning}</p>
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white rounded p-2">
              <div className="text-gray-500">Volume vs Historical</div>
              <div className={`font-bold ${volumeRatio > 2 ? 'text-red-600' : volumeRatio > 1.5 ? 'text-orange-600' : 'text-green-600'}`}>
                {volumeRatio.toFixed(1)}x
              </div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-gray-500">Price from High</div>
              <div className={`font-bold ${priceFromHigh < -5 ? 'text-red-600' : priceFromHigh < -2 ? 'text-orange-600' : 'text-green-600'}`}>
                {priceFromHigh.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
            <strong>Learning:</strong> This pattern shows how HNIs create false bullish signals to attract retail investors, 
            then reverse the trend for profit. Always analyze volume alongside price movement.
          </div>
        </div>
      </div>
    </div>
  );
} 