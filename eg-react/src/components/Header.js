import React from 'react'
import { NavLink } from 'react-router-dom'
import './HeaderStyle.css'
import { toast } from 'react-toastify';
import { AccountBox, BorderColor, CloudUploadSharp, ExitToApp, HomeWork, LockOpen, ShoppingCart } from '@mui/icons-material';

function Header({ isSignedIn, setIsSignedIn, setUser, setAuthToken, role_Id }) {
  const myStyle =
    ({ isActive }) => ({
      color: isActive ? 'rgb(241, 41, 14)' : 'black',
      textDecoration: 'none',
    })
  return (
    <div className='listStyle'>
      <ul>
        <li><HomeWork /><NavLink style={myStyle} to='/welcome'> Home</NavLink></li>
        {
          (isSignedIn && role_Id === 2) ? (
            <li><AccountBox /> <NavLink style={myStyle} to='/users' >User Details</NavLink></li>
          ) : (null)
        }
        {
          isSignedIn ? (
            <li>< BorderColor/><NavLink style={myStyle} to='/exercises' >Exercises</NavLink></li>
          ) : (null)
        }
        {
          isSignedIn ? (
            <li><ShoppingCart /><NavLink style={myStyle} to='/shoppingHome'>Shopping Cart</NavLink></li>

          ) : (null)
        }
        {
          (isSignedIn && role_Id === 2) ? (
            <li><CloudUploadSharp /><NavLink style={myStyle} to='/kycUpdate' >KycUpdate</NavLink></li>
          ) : (null)
        }
        {isSignedIn ? (<>
          <li>
            <ExitToApp /> <NavLink style={myStyle} to='/signIn' onClick={() => {
              setIsSignedIn(false);
              setUser('');
              setAuthToken('')
              toast.success('successfully SignOut', {
                position: toast.POSITION.TOP_RIGHT
              });
              console.log("successfully logout");
            }} >SignOut</NavLink>
          </li>
        </>) : (
          <>
            <li><LockOpen /><NavLink style={myStyle} to='/signIn'>SignIn</NavLink></li>
            <li><LockOpen /><NavLink style={myStyle} to='/signUp'>SignUp</NavLink></li>
          </>
        )
        }
      </ul>
    </div>
  )
}

export default Header;