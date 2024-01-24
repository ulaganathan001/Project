import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';

const FeedbackChart = () => {
  // Sample data from the table (replace it with your data)
  const data = {
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    datasets: [
      {
        label: 'Values',
        backgroundColor: 'rgba(75,192,192,0.4)', // Change color as needed
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [12, 19, 3, 5], // Replace with your values
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category', // Use 'category' for categorical data on the x-axis
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default FeedbackChart;
