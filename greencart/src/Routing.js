import Home from './Home';
import Login from './Login';
import Register from './Register';
import UserNavbar from './UserNavbar';
import AdminNavbar from './AdminNavbar';
import Appheader from './Appheader';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Delivery from './Components/Delivery';
import Healthy from './Components/Healthy';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homerouting from './Homerouting';
import Customer from './component/Customer';
import Products from './component/Products';
import Service from './component/Service';
import Support from './component/Support';
import Nav from './component/Nav';
import AddCompCus from './component/crud/AddCompCus';
import AddCompPro from './component/crud/AddCompPro';
import EditCompPro from './component/crud/EditCompPro';
import EditCompCus from './component/crud/EditCompCus';
import Contact from './Contact';
import Product from './Product';
import About from './About';
import Adminlogin from './Adminlogin';
import Dashboard from './component/DashBoard';
import Adminhomepage from './Adminhomepage';
import Dummy from './Dummy';
import Afterlogroute from './Afterlogroute';
function Routing() {
  const cardStyle = {
    background: '#ffeec8',
    color: 'green',
  };

  const headerStyle = {
    background: '#ffeec8',
    color: 'green',

  };

  const bodyStyle = {
    background: '#ffeec8',
    color: 'green',

  };

  const footerStyle = {
    background: '#ffeec8',
    color: 'green',

  };
  return (
    <div className="App">
      <div className='card' style={{ border: 'none' }}>
        <div style={headerStyle}></div>
        <div style={bodyStyle}>
          <Routes>
            
            <Route path='/adm' element={<Adminhomepage />}>
            <Route path='dash' element={<Dashboard/>}/>
              <Route path='home' element={<Home />} />
              <Route path='contact' element={<Contact />} />
              <Route path='product' element={<Product />} />
              <Route path='about' element={<About />} />
              <Route path='dum' element={<Dummy/>}/>
              <Route path='pro' element={<Products />} />
              <Route path='addpro' element={<AddCompPro />} />
              <Route path='ser' element={<Service />} />
              <Route path='sup' element={<Support />} />
              <Route path='editpro/:id' element={<EditCompPro />} />
              <Route path='addcus' element={<AddCompCus />} />
              <Route path='cus' element={<Customer />} />
              <Route path='editcus/:id' element={<EditCompCus />} />
            </Route>
            <Route path='register' element={<Register />}></Route>
            {/* <Route path='login' element={<Login />}></Route> */}
            <Route path='ad' element={<Adminlogin />} />
            <Route path='/' element={<Homerouting />}>
              <Route path='home' element={<Home />} />
              <Route path='contact' element={<Contact />} />
              <Route path='product' element={<Product />} />
              <Route path='about' element={<About />} />

            </Route>
            <Route path='pro' element={<Products />} />
            <Route path='addpro' element={<AddCompPro />} />
            <Route path='ser' element={<Service />} />
            <Route path='sup' element={<Support />} />
            <Route path='editpro/:id' element={<EditCompPro />} />
            <Route path='addcus' element={<AddCompCus />} />
            <Route path='cus' element={<Customer />} />
            <Route path='editcus/:id' element={<EditCompCus />} />


            <Route path='afh' element={<Afterlogroute/>}>
            <Route path='home' element={<Home />} />
              <Route path='contact' element={<Contact />} />
              <Route path='product' element={<Product />} />
              <Route path='about' element={<About />} />

            </Route>
          </Routes>
          <Routes>
          <Route path='login' element={<Login />}></Route>
          </Routes>
        </div>

      </div>
  


    </div>
  );
}

export default Routing;