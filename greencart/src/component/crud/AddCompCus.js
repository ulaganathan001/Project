import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AddCompCus = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    cusname: "",
    location: "",
    paytype: ""
  });
  const [errors, setErrors] = useState({});

  const addData1 = (event) => {
    event.preventDefault();

    if (validateForm()) {
      axios.post(" http://localhost:8000/customer1", customer)
        .then(() => {
          window.alert("Customer added Successfully");
          navigate("/cus");
        })
        .catch((err) => {
          console.error("Error adding customer:", err);
          window.alert("Error adding customer. Please try again later.");
        });
    }
  };

  const inputHandler = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); // Clear error when input changes
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
  
    // Validate non-empty fields
    Object.entries(customer).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}</strong> is required`;
        valid = false;
      }
    });
  
    // Validate customer name (letters only)
    if (!/^[a-zA-Z\s]+$/.test(customer.cusname.trim())) {
      newErrors.cusname = '<strong>Invalid characters.</strong> Only letters and spaces are allowed';
      valid = false;
    }
  
    // Validate customer location (letters only)
    if (!/^[a-zA-Z\s]+$/.test(customer.location.trim())) {
      newErrors.location = '<strong>Invalid characters.</strong> Only letters and spaces are allowed';
      valid = false;
    }
  
    // Validate payment type (cod, emi, upi only)
    const allowedPaymentTypes = ['COD', 'EMI', 'UPI'];
    if (!allowedPaymentTypes.includes(customer.paytype.trim())) {
      newErrors.paytype = '<strong>Invalid payment type.</strong> Only COD, EMI, or UPI are allowed';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  

  return (
    <div>
      <form onSubmit={addData1}>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Customer Name</strong></label>
          <input type='text' name='cusname' className='form-control' onChange={inputHandler} value={customer.cusname} placeholder='Enter customer name' />
          {errors.cusname && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.cusname }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Customer Location</strong></label>
          <input type='text' name='location' className='form-control' onChange={inputHandler} value={customer.location} placeholder='Enter customer location' />
          {errors.location && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.location }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Payment Type</strong></label>
          <input type='text' name='paytype' className='form-control' onChange={inputHandler} value={customer.paytype} placeholder='Enter payment type' />
          {errors.paytype && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.paytype }}></div>}
        </div>
        <button type='submit' className='btn btn-warning btn-lg px-4 me-md-2'>Submit</button>{" "}
        <Link to="/cus" className='btn btn-warning btn-lg px-4 me-md-2'>Back </Link>
      </form>
    </div>
  );
};

export default AddCompCus;
