import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mt-4 card">
      <h2>Welcome to the Dashboard</h2>

      <div className="card">
        <div className="card-header">
          Customers
        </div>
        <div className="card-body">
          <p className="card-text">View and manage customer details.</p>
          <Link to="/cus" className="btn btn-primary">View Customers</Link>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header">
          Products
        </div>
        <div className="card-body">
          <p className="card-text">View and manage product details.</p>
          <Link to="/pro" className="btn btn-primary">View Products</Link>
        </div>
      </div>

      {/* Add more cards for other sections as needed */}
    </div>
  );
}

export default Dashboard;

