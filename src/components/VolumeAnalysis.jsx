import React from 'react';

export default function VolumeAnalysis({ volumeData, currentIndex, stock }) {
  if (!volumeData || volumeData.length === 0) return null;

  const currentVolume = volumeData[currentIndex]?.y || 0;
  const previousVolume = volumeData[Math.max(0, currentIndex - 1)]?.y || 0;
  const avgVolume = volumeData.slice(0, currentIndex + 1).reduce((sum, v) => sum + v.y, 0) / (currentIndex + 1);
  
  const volumeChange = ((currentVolume - previousVolume) / previousVolume) * 100;
  const volumeVsAvg = ((currentVolume - avgVolume) / avgVolume) * 100;
  
  const getVolumeStatus = () => {
    if (volumeChange > 50 && volumeVsAvg > 100) return { text: 'Heavy Volume', color: 'text-red-600', bg: 'bg-red-50' };
    if (volumeChange > 20 && volumeVsAvg > 50) return { text: 'High Volume', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (volumeChange > 0) return { text: 'Above Average', color: 'text-green-600', bg: 'bg-green-50' };
    if (volumeChange < -20) return { text: 'Low Volume', color: 'text-gray-600', bg: 'bg-gray-50' };
    return { text: 'Normal Volume', color: 'text-blue-600', bg: 'bg-blue-50' };
  };

  const volumeStatus = getVolumeStatus();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4 text-indigo-700">Volume Analysis</h3>
      
      <div className="space-y-4">
        {/* Current Volume */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current Volume:</span>
          <span className="font-bold text-lg text-blue-600">
            {(currentVolume / 1000000).toFixed(1)}M shares
          </span>
        </div>

        {/* Volume Change */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Volume Change:</span>
          <span className={`font-semibold ${volumeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {volumeChange >= 0 ? '+' : ''}{volumeChange.toFixed(1)}%
          </span>
        </div>

        {/* Volume vs Average */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">vs Average:</span>
          <span className={`font-semibold ${volumeVsAvg >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {volumeVsAvg >= 0 ? '+' : ''}{volumeVsAvg.toFixed(1)}%
          </span>
        </div>

        {/* Volume Status */}
        <div className={`p-3 rounded-lg ${volumeStatus.bg}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status:</span>
            <span className={`font-semibold ${volumeStatus.color}`}>
              {volumeStatus.text}
            </span>
          </div>
        </div>

        {/* Volume Interpretation */}
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded">
          <div className="font-medium mb-1">Volume Interpretation:</div>
          {volumeChange > 50 && volumeVsAvg > 100 && (
            <p>⚠️ <strong>Heavy volume</strong> - Possible institutional activity or manipulation in progress</p>
          )}
          {volumeChange > 20 && volumeVsAvg > 50 && (
            <p>📈 <strong>High volume</strong> - Strong buying/selling pressure, trend likely to continue</p>
          )}
          {volumeChange > 0 && volumeVsAvg <= 50 && (
            <p>📊 <strong>Above average</strong> - Moderate activity, normal market movement</p>
          )}
          {volumeChange < -20 && (
            <p>📉 <strong>Low volume</strong> - Weak participation, trend may be losing momentum</p>
          )}
          {volumeChange >= -20 && volumeChange <= 0 && (
            <p>📊 <strong>Normal volume</strong> - Standard market activity</p>
          )}
        </div>
      </div>
    </div>
  );
} 