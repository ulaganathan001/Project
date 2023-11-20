import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import './Components/style.css';
import { ToastContainer } from 'react-toastify';
import { Bootstrap } from 'react-bootstrap-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Routing from './Routing';

import { Bestseller, Delivery,Healthy,Hero,HProduct,Navbar, Reviews} from './Components'
import Homerouting from './Homerouting';
function App() {
  return (
    <div className="App" >
     <ToastContainer theme='colored' position='top-center'></ToastContainer>
     <Routing/>
      
     
      
    </div>
  );
}

export default App;
