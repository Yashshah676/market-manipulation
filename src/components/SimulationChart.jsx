import React, { useEffect, useRef, useState } from 'react';
import ApexCharts from 'react-apexcharts';

export default function SimulationChart({ candles, currentIndex, selectedCase, stock, volumeData, isPreview = false }) {
  // Only show up to currentIndex for progressive reveal
  const displayedCandles = candles.slice(0, currentIndex + 1);
  const displayedVolume = volumeData ? volumeData.slice(0, currentIndex + 1) : [];

  const series = [
    {
      name: 'Price',
      data: displayedCandles,
    },
    {
      name: 'Volume',
      data: displayedVolume,
      type: 'column',
    },
  ];

  const options = {
    chart: {
      type: 'candlestick',
      height: 500,
      toolbar: { 
        show: false 
      },
      animations: { 
        enabled: false 
      },
      background: 'transparent',
      fontFamily: 'Inter, system-ui, sans-serif',
      stacked: false,
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#10B981',
          downward: '#EF4444',
        },
        wick: {
          useFillColor: true,
        },
      },
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        },
        datetimeFormatter: {
          year: 'yyyy',
          month: 'MMM \'yy',
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
      axisBorder: {
        color: '#E5E7EB',
      },
      axisTicks: {
        color: '#E5E7EB',
      },
    },
    yaxis: [
      {
        title: {
          text: 'Price (₹)',
          style: {
            color: '#6B7280',
            fontSize: '12px',
          },
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          },
          formatter: (value) => `₹${value.toLocaleString('en-IN')}`,
        },
        axisBorder: {
          color: '#E5E7EB',
        },
        axisTicks: {
          color: '#E5E7EB',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Volume',
          style: {
            color: '#6B7280',
            fontSize: '12px',
          },
        },
        labels: {
          style: {
            colors: '#6B7280',
            fontSize: '12px',
          },
          formatter: (value) => `${(value / 1000000).toFixed(1)}M`,
        },
        axisBorder: {
          color: '#E5E7EB',
        },
        axisTicks: {
          color: '#E5E7EB',
        },
      },
    ],
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
      },
      shared: true,
      intersect: false,
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const priceData = w.globals.initialSeries[0].data[dataPointIndex];
        const volumeData = w.globals.initialSeries[1]?.data[dataPointIndex];
        
        if (!priceData) return '';
        
        const [open, high, low, close] = priceData.y;
        const date = new Date(priceData.x).toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        
        const volume = volumeData ? volumeData.y : 0;
        const volumeInM = (volume / 1000000).toFixed(1);
        
        return `
          <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
            <div class="font-semibold text-gray-800 mb-2">${stock?.symbol || 'STOCK'} - ${date}</div>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Open:</span>
                <span class="font-medium">₹${open.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">High:</span>
                <span class="font-medium text-green-600">₹${high.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Low:</span>
                <span class="font-medium text-red-600">₹${low.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Close:</span>
                <span class="font-medium">₹${close.toLocaleString('en-IN')}</span>
              </div>
              <div class="flex justify-between border-t pt-1 mt-1">
                <span class="text-gray-600">Volume:</span>
                <span class="font-medium text-blue-600">${volumeInM}M shares</span>
              </div>
            </div>
          </div>
        `;
      }
    },
    title: {
      text: isPreview 
        ? `Historical Analysis: ${selectedCase?.title || 'Market Data'}`
        : selectedCase 
          ? `${selectedCase.title} - Live Simulation` 
          : `${stock?.symbol || 'STOCK'} - ${stock?.name || 'Indian Stock'} Simulation`,
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#1F2937',
      },
    },
    subtitle: {
      text: isPreview 
        ? `Historical data (${candles.length} candles) - Study patterns before manipulation`
        : `Live simulation: ${currentIndex + 1} / ${candles.length} candles`,
      align: 'left',
      style: {
        fontSize: '14px',
        color: '#6B7280',
      },
    },
    noData: {
      text: 'No data available',
      align: 'center',
      verticalAlign: 'middle',
      style: {
        color: '#6B7280',
        fontSize: '16px',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {isPreview ? 'Historical Price & Volume Analysis' : `${stock?.symbol || 'STOCK'} Live Chart`}
            </h3>
            <p className="text-sm text-gray-600">
              {isPreview 
                ? 'Study price movement and volume patterns before the manipulation event'
                : selectedCase 
                  ? 'Real-time market data simulation with volume analysis'
                  : `${stock?.name || 'Indian Stock'} - Interactive candlestick chart with volume`
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Current Price:</span>
              <span className={`ml-1 font-bold ${
                displayedCandles.length > 0 && 
                displayedCandles[displayedCandles.length - 1].y[3] > 
                (displayedCandles.length > 1 ? displayedCandles[displayedCandles.length - 2].y[3] : displayedCandles[0].y[0])
                  ? 'text-green-600' : 'text-red-600'
              }`}>
                ₹{displayedCandles.length > 0 ? displayedCandles[displayedCandles.length - 1].y[3].toLocaleString('en-IN') : '0'}
              </span>
            </div>
            {!isPreview && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Progress:</span>
                <span className="ml-1 font-bold text-indigo-600">
                  {Math.round(((currentIndex + 1) / candles.length) * 100)}%
                </span>
              </div>
            )}
            {displayedVolume.length > 0 && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Volume:</span>
                <span className="ml-1 font-bold text-blue-600">
                  {((displayedVolume[displayedVolume.length - 1]?.y || 0) / 1000000).toFixed(1)}M
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <ApexCharts 
          options={options} 
          series={series} 
          type="candlestick" 
          height={500} 
        />
        
        {/* Progress indicator - only show in simulation mode */}
        {!isPreview && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0%</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / candles.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
