import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Customer = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(` http://localhost:8000/customer1`)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }

  const deleteCustomer = (id) => {
    if (window.confirm(`Are you sure to delete customer with id: ${id}`)) {
      axios.delete(` http://localhost:8000/customer1/${id}`)
        .then(() => {
          window.alert("Customer Deleted Successfully");
          fetchData();
        })
        .catch((err) => {
          console.error("Error deleting customer:", err);
        });
    }
  }

  return (
    <div className="card ">
      <div className='card-header'>
      <h2>Customer List</h2>
      </div>
     
    <div className='card-body'>
    <table className='table table-bordered table-hover'>
        <thead className='table-dark'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Payment Type</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.id}</td>
              <td>{customer.cusname}</td>
              <td>{customer.location}</td>
              <td>{customer.paytype}</td>
              <td>
                <Link to={`/editcus/${customer.id}`} className='btn btn-outline-primary btn-sm me-2'>Edit</Link>
                <button type='button' onClick={() => deleteCustomer(customer.id)} className='btn btn-outline-danger btn-sm'> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
      <div className='card-footer'>
      <Link to="/addcus" className='btn btn-warning btn-lg'>Add Customer</Link>
      </div>
      
    </div>
  );
}

export default Customer;
