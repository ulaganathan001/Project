import './App.css';
import SignInForm from './components/SignInForm';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import UserRegistration from './components/UserRegistration';
import UserDetails from './components/UserDetails';
import KycFileUploader from './components/KyceFileUploader';
import Exercises from './components/Exercises';
import Shoppinghome from './components/ShoppingHome';
import Cart from './components/Cart';
import Homee from './components/Homee';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState('');
  const [authToken,setAuthToken]=useState('');
  return (
    <div className='App'>
      <ToastContainer autoClose={3000}/>
      <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} setUser={setUser} role_Id={user.role_id} setAuthToken={setAuthToken}/>
      <Routes>
        <Route path="/welcome" element={<Home userName={user.user_Name} />} />
        <Route path="/checkout" element={<Homee userName={user.user_Name} />} />
        <Route path='/cart' element={ isSignedIn?<Cart authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>: <SignInForm setIsSignedIn={setIsSignedIn} setUser={setUser} setAuthToken={setAuthToken} />}/>
        <Route path='/shop' element={ isSignedIn?<Homee authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>: <SignInForm setIsSignedIn={setIsSignedIn} setUser={setUser} setAuthToken={setAuthToken} />}/>
        <Route path='/shoppingHome' element={ isSignedIn?<Shoppinghome authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>: <SignInForm setIsSignedIn={setIsSignedIn} setUser={setUser} setAuthToken={setAuthToken} />}/>
        <Route path='/users' element={isSignedIn?<UserDetails  authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>: <SignInForm  setIsSignedIn={setIsSignedIn} setUser={setUser} setAuthToken={setAuthToken}/>} />
        <Route path='/signIn' element={isSignedIn?<Home userName={user.user_Name} />:<SignInForm setIsSignedIn={setIsSignedIn} setUser={setUser} setAuthToken={setAuthToken} />} />
        <Route path='/signUp' element={<UserRegistration />} />
        <Route path='/checkout' element={<Homee/>}/>
        <Route path='/kycUpdate' element={isSignedIn?<KycFileUploader userId={user.user_id} authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>: <SignInForm setIsSignedIn={setIsSignedIn} setUser={setUser} setAuthToken={setAuthToken} />} />
        <Route path='/exercises' element={ isSignedIn?<Exercises authToken={authToken} setAuthToken={setAuthToken} setIsSignedIn={setIsSignedIn}/>: <SignInForm setIsSignedIn={setIsSignedIn} setUser={setUser} setAuthToken={setAuthToken} />}/>
      </Routes>  
    </div>
  );
}

export default App;