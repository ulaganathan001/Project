import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddCompPro = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    pname: "",
    pprice: "",
    pcompany: "",
    paddress: ""
  });
  const [errors, setErrors] = useState({});

  const inputHandler = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); // Clear error when input changes
  }

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
  
    // Validate non-empty fields
    Object.entries(product).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}</strong> is required`;
        valid = false;
      }
    });
  
    // Validate product name (characters only)
    if (!/^[a-zA-Z\s]+$/.test(product.pname.trim())) {
      newErrors.pname = '<strong>Invalid characters.</strong> Only letters and spaces are allowed';
      valid = false;
    }
  
    // Validate product price (numbers only)
    if (!/^\d+$/.test(product.pprice.trim())) {
      newErrors.pprice = '<strong>Invalid characters.</strong> Only numbers are allowed';
      valid = false;
    }
  
    // Validate product company (letters only)
    if (!/^[a-zA-Z\s]+$/.test(product.pcompany.trim())) {
      newErrors.pcompany = '<strong>Invalid characters.</strong> Only letters and spaces are allowed';
      valid = false;
    }
  
    // Add more validation rules as needed for other fields
  
    setErrors(newErrors);
    return valid;
  }
  

  const addData = (event) => {
    event.preventDefault();

    if (validateForm()) {
      axios.post("http://localhost:8/product", product)
        .then(() => {
          window.alert("Product added successfully");
          navigate("/pro");
        })
        .catch((err) => {
          console.error("Error adding product:", err);
        });
    }
  }

  return (
    <div>
      <form onSubmit={addData}>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Product Name</strong></label>
          <input type='text' name='pname' className='form-control' placeholder='E.g., Laptop' onChange={inputHandler} value={product.pname} />
          {errors.pname && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.pname }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Product Price</strong></label>
          <input type='text' name='pprice' className='form-control' placeholder='E.g., 1000' onChange={inputHandler} value={product.pprice} />
          {errors.pprice && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.pprice }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Product Company</strong></label>
          <input type='text' name='pcompany' className='form-control' placeholder='E.g., ABC Electronics' onChange={inputHandler} value={product.pcompany} />
          {errors.pcompany && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.pcompany }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Product Address</strong></label>
          <input type='text' name='paddress' className='form-control' placeholder='E.g., 123 Main St' onChange={inputHandler} value={product.paddress} />
          {errors.paddress && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.paddress }}></div>}
        </div>
        <button type='submit' className='btn btn-warning btn-lg px-4 me-md-2'>Submit</button>
        <Link to="/pro" className='btn btn-warning btn-lg px-4 me-md-2'>Back </Link>
      </form>
    </div>
  );
}

export default AddCompPro;
