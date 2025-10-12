import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = ({ data, title = 'Revenue Chart' }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
          },
          callback: function (value) {
            return '$' + value;
          },
        },
        beginAtZero: false,
        min: 0,
        max: 700,
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 4,
        hoverBorderWidth: 2,
        hoverBorderColor: '#ffffff',
      },
      line: {
        borderWidth: 2,
        tension: 0.4,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  const chartData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      pointBackgroundColor: dataset.borderColor,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointHoverBackgroundColor: dataset.borderColor,
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 3,
    })),
  };

  return (
    <div className='bg-white rounded-xl shadow-sm p-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
      </div>
      <div className='h-64'>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
