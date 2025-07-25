import React from 'react';

export default function CaseDetail({ selectedCase, onClose, onStartSimulation }) {
  if (!selectedCase) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ×
        </button>
        
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-2xl font-bold text-indigo-700 pr-8">{selectedCase.title}</h3>
            <span className={`px-3 py-1 text-sm rounded-full font-medium ${
              selectedCase.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              selectedCase.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {selectedCase.difficulty}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Stock Symbol</div>
              <div className="font-semibold text-lg">{selectedCase.stock}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Timeframe</div>
              <div className="font-semibold">{selectedCase.timeframe}</div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">Tags</div>
            <div className="flex flex-wrap gap-2">
              {selectedCase.tags?.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">Case Description</div>
            <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
              {selectedCase.description}
            </div>
          </div>
          
          {selectedCase.newsSummary && (
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">News Summary</div>
              <div className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                {selectedCase.newsSummary}
              </div>
            </div>
          )}
          
          {selectedCase.outcome && (
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">Market Outcome</div>
              <div className="text-gray-700 leading-relaxed bg-green-50 p-4 rounded-lg">
                {selectedCase.outcome}
              </div>
            </div>
          )}
          
          {selectedCase.institutionalInsights && (
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">Institutional Insights</div>
              <div className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-lg">
                {selectedCase.institutionalInsights}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => onStartSimulation(selectedCase)} 
            className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Start Simulation
          </button>
          <button 
            onClick={onClose} 
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">For educational purposes only. This simulation is designed to help understand market manipulation patterns.</p>
        </div>
      </div>
    </div>
  );
}
