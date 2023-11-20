import React from 'react';
import { Link } from 'react-router-dom';
const AdminNavbar = () => {
  return (
    <header className="p-3  text-white" style={{backgroundColor:"#4B6F44"}}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlinkHref="#bootstrap" />
            </svg>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" style={{color:"white"}}>
           <Link to='dash' className="nav-link px-2" style={{color:"white"}}>Dashboard</Link> 
           <Link to='cus' className="nav-link px-2" style={{color:"white"}}>Customers</Link>
           <Link to='pro' className="nav-link px-2" style={{color:"white"}}>Products</Link>
           {/* <Link to='ser' className="nav-link px-2"style={{color:"white"}}>Service</Link> */}
           {/* <Link to='sup' className="nav-link px-2"style={{color:"white"}}>Support</Link> */}
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="text-end">
            <button type="button" className="btn btn-warning">Welcome Admin</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
