import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditCompPro = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: "",
    pname: "",
    pprice: "",
    pcompany: "",
    paddress: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {});
  }, [id]);

  const inputHandler = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' }); // Clear error when input changes
  }

  const validateForm = () => {
    let valid = true;
    const newErrors = {};
  
    // Validate non-empty fields
    Object.entries(product).forEach(([key, value]) => {
      if (!value || (typeof value === 'string' && !value.trim())) {
        newErrors[key] = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}</strong> is required`;
        valid = false;
      }
    });
  
    // Validate product name (characters only)
    if (typeof product.pname === 'string' && !/^[a-zA-Z\s]+$/.test(product.pname.trim())) {
      newErrors.pname = '<strong>Invalid characters.</strong> Only letters and spaces are allowed';
      valid = false;
    }
  
    // Validate product price (numbers only)
    if (typeof product.pprice === 'string' && !/^\d+$/.test(product.pprice.trim())) {
      newErrors.pprice = '<strong>Invalid characters.</strong> Only numbers are allowed';
      valid = false;
    }
  
    // Validate product company (alphanumeric characters only)
    if (typeof product.pcompany === 'string' && !/^[a-zA-Z\s]+$/.test(product.pcompany.trim())) {
      newErrors.pcompany = '<strong>Invalid characters.</strong> Only letters and spaces are allowed';
      valid = false;
    }
  
    // Add more validation rules as needed for other fields
  
    setErrors(newErrors);
    return valid;
  }
  

  const updateProduct = (event) => {
    event.preventDefault();

    if (validateForm()) {
      axios.put(`http://localhost:8/product/${id}`, product)
        .then(() => {
          window.alert("Product Updated successfully");
          navigate("/pro");
        })
        .catch((err) => {
          console.error("Error updating product:", err);
        });
    }
  }

  return (
    <div>
      <h2>This is Edit Component</h2>
      <form onSubmit={updateProduct}>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Product Name</strong></label>
          <input type='text' name='pname' className='form-control' onChange={inputHandler} value={product.pname} />
          {errors.pname && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.pname }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Product Price</strong></label>
          <input type='text' name='pprice' className='form-control' onChange={inputHandler} value={product.pprice} />
          {errors.pprice && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.pprice }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Product Company</strong></label>
          <input type='text' name='pcompany' className='form-control' onChange={inputHandler} value={product.pcompany} />
          {errors.pcompany && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.pcompany }}></div>}
        </div>
        <div className='form-group'>
          <label className='form-label'><strong>Enter Product Address</strong></label>
          <input type='text' name='paddress' className='form-control' onChange={inputHandler} value={product.paddress} />
          {errors.paddress && <div className="text-danger" dangerouslySetInnerHTML={{ __html: errors.paddress }}></div>}
        </div>
        <button type='submit' className='btn btn-warning btn-lg px-4 me-md-2'>Submit</button>
        <Link to="/pro" className='btn btn-warning btn-lg px-4 me-md-2'>Back </Link>
      </form>
    </div>
  );
}

export default EditCompPro;
