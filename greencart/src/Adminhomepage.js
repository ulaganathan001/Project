

import Navbar from './Components/Navbar'
import { Routes,Route } from 'react-router-dom';
import Dummy from './Dummy';
import Products from './component/Products';
import AddCompPro from './component/crud/AddCompCus';
import Service from './component/Service';
import Support from './component/Support';
import EditCompPro from './component/crud/EditCompPro';
import AddCompCus from './component/crud/AddCompCus';
import Customer from './component/Customer';
import EditCompCus from './component/crud/EditCompCus';
import Footer from './Components/Footer';
import Contact from './Contact';
import Home from './Home';

import Product from './Product';
import About from './About';
import Dashboard from './component/DashBoard';
import AdminNavbar from './AdminNavbar';

export default function Adminhomepage() {
    return (
        <div className='card'>
            <div className='card-header'>
            <Navbar />
            <AdminNavbar></AdminNavbar>
            </div>
            <div className='card-body'>
            <Routes>
           
           <Route path='home' element={<Home />} />
             <Route path='contact' element={<Contact />} />
             <Route path='product' element={<Product />} />
             <Route path='about' element={<About />} />
               <Route path='/' element={<Dummy />} />
               <Route path='dash' element={<Dashboard/>}/>
               <Route path='pro' element={<Products />} />
                 <Route path='addpro' element={<AddCompPro />} />
                 <Route path='ser' element={<Service />} />
                 <Route path='sup' element={<Support />} />
                 <Route path='editpro/:id' element={<EditCompPro />} />
                 <Route path='addcus' element={<AddCompCus />} />
                 <Route path='cus' element={<Customer />} />
                 <Route path='editcus/:id' element={<EditCompCus />} />       


           </Routes>
            </div>  
            
            <div className='card-footer'>
            <Footer></Footer>
            </div>
            
                
        </div>
    )
}
