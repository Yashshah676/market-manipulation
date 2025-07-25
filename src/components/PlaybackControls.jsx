import React from 'react';

export default function PlaybackControls({ 
  isPlaying, 
  onPlayPause, 
  onStep, 
  onSpeedChange, 
  speed, 
  canStepBack, 
  canStepForward,
  currentIndex,
  maxIndex
}) {
  const progress = maxIndex > 0 ? ((currentIndex + 1) / (maxIndex + 1)) * 100 : 0;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Step Back Button */}
          <button
            className={`p-2 rounded-lg transition-colors ${
              canStepBack 
                ? 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => onStep(-1)}
            disabled={!canStepBack}
            title="Step Back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Play/Pause Button */}
          <button
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center space-x-2"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
                <span>Pause</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Play</span>
              </>
            )}
          </button>

          {/* Step Forward Button */}
          <button
            className={`p-2 rounded-lg transition-colors ${
              canStepForward 
                ? 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={() => onStep(1)}
            disabled={!canStepForward}
            title="Step Forward"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-3">
          <label className="text-sm text-gray-600 font-medium">Speed:</label>
          <select
            className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={speed}
            onChange={e => onSpeedChange(Number(e.target.value))}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
            <option value={8}>8x</option>
          </select>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span>{currentIndex + 1} / {maxIndex + 1} candles ({progress.toFixed(1)}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 relative">
          <div 
            className="bg-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
          {/* Progress indicator dot */}
          <div 
            className="absolute top-0 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white shadow-sm transform -translate-y-0.5 transition-all duration-300"
            style={{ left: `calc(${progress}% - 6px)` }}
          ></div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span>{isPlaying ? 'Playing' : 'Paused'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <span>{speed}x Speed</span>
          </div>
        </div>
        <div className="text-right">
          <div>Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>
    </div>
  );
}
