import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
const EditCompCus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    id: "",
    cusname: "",
    location: "",
    paytype: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:80/customer/${id}`).then((res) => {
      setCustomer(res.data);
    }).catch((err) => { });
  }, [id]);

  const inputHandler = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); // Clear error when input changes
  };

  const updateCustomer = (event) => {
    event.preventDefault();

    if (validateForm()) {
      axios.put(`http://localhost:80/customer/${id}`, customer).then(() => {
        window.alert("Customer Updated successfully");
        navigate("/cus");
      }).catch((err) => { });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate customer name (letters and spaces only)
    if (!/^[a-zA-Z\s]+$/.test(customer.cusname.trim())) {
      newErrors.cusname = '<strong>Invalid characters.</strong> Only letters and spaces are allowed';
      valid = false;
    }

    // Validate location (letters and spaces only)
    if (!/^[a-zA-Z\s]+$/.test(customer.location.trim())) {
      newErrors.location = '<strong>Invalid characters.</strong> Only letters and spaces are allowed';
      valid = false;
    }

    // Validate payment type (cod, emi, upi)
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
      <h2>This is Edit Component</h2>
      <form onSubmit={updateCustomer}>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Customer Name</strong></label>
          <input type='text' name='cusname' className='form-control' onChange={inputHandler} value={customer.cusname} />
          {errors.cusname && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.cusname }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Customer location</strong></label>
          <input type='text' name='location' className='form-control' onChange={inputHandler} value={customer.location} />
          {errors.location && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.location }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter payment type</strong></label>
          <input type='text' name='paytype' className='form-control' onChange={inputHandler} value={customer.paytype} />
          {errors.paytype && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.paytype }}></div>}
        </div>
        <button type='submit' className='btn btn-warning btn-lg px-4 me-md-2'>Submit</button>{" "}
        <Link to="/cus" className='btn btn-warning btn-lg px-4 me-md-2'>Back</Link>
      </form>
    </div>
  );
}

export default EditCompCus;