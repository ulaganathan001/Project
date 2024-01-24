import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:8000/product")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }

  const deleteProduct = (id) => {
    if (window.confirm(`Are you sure to delete product with id: ${id}`)) {
      axios.delete(`http://localhost:8000/product/${id}`)
        .then(() => {
          window.alert("Product Deleted Successfully");
          fetchData();
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
        });
    }
  }

  return (
    // <div className="container mt-4">
    //   <h2>Product List</h2>

    //   <table className='table table-bordered table-hover'>
    //     <thead className='table-dark'>
    //       <tr>
    //         <th>ID</th>
    //         <th>Name</th>
    //         <th>Price</th>
    //         <th>Company</th>
    //         <th>Address</th>
    //         <th>Changes</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {products.map((product, index) => (
    //         <tr key={index}>
    //           <td>{product.id}</td>
    //           <td>{product.pname}</td>
    //           <td>{product.pprice}</td>
    //           <td>{product.pcompany}</td>
    //           <td>{product.paddress}</td>
    //           <td>
    //             <Link to={`/editpro/${product.id}`} className='btn btn-outline-primary btn-sm me-2'>Edit</Link>
    //             <button type='button' onClick={() => deleteProduct(product.id)} className='btn btn-outline-danger btn-sm'>Delete</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    //   <Link to="/addpro" className='btn btn-warning btn-lg'>Add Product</Link>
    // </div>

<div className="card ">
<div className='card-header'>
<h2>Product List</h2>
</div>

<div className='card-body'>
<table className='table table-bordered table-hover'>
         <thead className='table-dark'>
           <tr>
             <th>ID</th>
             <th>Name</th>
             <th>Price</th>
             <th>Company</th>
             <th>Address</th>
             <th>Changes</th>
           </tr>
         </thead>
         <tbody>
           {products.map((product, index) => (
             <tr key={index}>
               <td>{product.id}</td>
               <td>{product.pname}</td>
               <td>{product.pprice}</td>
               <td>{product.pcompany}</td>
               <td>{product.paddress}</td>
               <td>
                 <Link to={`/editpro/${product.id}`} className='btn btn-outline-primary btn-sm me-2'>Edit</Link>
                 <button type='button' onClick={() => deleteProduct(product.id)} className='btn btn-outline-danger btn-sm'>Delete</button>
               </td>
             </tr>
           ))}
         </tbody>
      </table>
</div >
<div className='card-footer'>
<Link to="/addpro" className='btn btn-warning btn-lg'>Add Product</Link>
</div>

</div>

  );
}

export default Products;
