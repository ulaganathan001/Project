import React, { useState } from 'react';
import Logo from './Pages/Logos/Logo';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserName from './Fromfolder/UserName';
import Email from './Fromfolder/Email';
import Password from './Fromfolder/Password';
import ConfirmPassword from './Fromfolder/ConfirmPassword';
import Register from './Pages/Logos/Register';
import axios from 'axios';
import SignInLogo from './Pages/Logos/SignInLogo';
import { useDispatch } from 'react-redux';
import { setInformation } from '../features/information';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [popReg, setPopReg] = useState(false);
  const [popSig, setPopSig] = useState(false);
  const [formInputData, setFormInputData] = useState({
    user_name: '',
    email: '',
    password: '',
    confirm_Password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelCloseReg = () => {
    setPopReg(false)
    resetForm();

  };
  const handelShowReg = () => {
    resetForm();
    setPopReg(true);
    // startResetTimer();
  };

  const handelCloseSig = () => {
    setPopSig(false)
    resetForm();
  };
  const handelShowSig = () => {
    resetForm();
    setPopSig(true)
    // startResetTimer();
  };

  const showReg = () => {
    resetForm();
    setPopSig(false);
    setPopReg(true);
  };

  const notify = (message) => {
    toast.warning(message, {
      zIndex: 1,
    });
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      zIndex: 1,
    });
  };

  const startResetTimer = () => {
    const timer = setTimeout(() => {
      handelShowSig();
      resetForm();
    }, 5000); // 120000 milliseconds = 2 minutes
  };

  const inputChange = (event) => {
    setFormInputData({
      ...formInputData, [event.target.name]: event.target.value
    });
  }

  const resetForm = () => {
    setFormInputData({
      user_name: '',
      email: '',
      password: '',
      confirm_Password: '',
    })
  }

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return passwordRegex.test(password);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const postData = async () => {
    try {
      const response = await axios.post('http://localhost:8080/userInformation/user', {
        user_name: formInputData.user_name,
        email: formInputData.email,
        password: formInputData.password,
      }, {
        headers: {
          'Content-Type': 'application/json', // Make sure the content type is set to JSON
        }
      });

      if (response.status === 201 && response.data.includes("User added successfully!")) {
        handelCloseReg();
        startResetTimer();
        notifySuccess("successfully Registered");
        setFormInputData({
          user_name: "",
          email: "",
          password: "",
          confirm_Password: "",
        });


      } else if (response.status === 201 && response.data.includes("User already exists.")) {
        notify("User is Already exists");
      } else {
        console.error("Unexpected response:", response.data);
        notify("no success");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      notify("no success");
    }
  };

  function checkConditions(c1, c2, c3, c4) {
    const combinations = [
      { condition: c1, message: "Please enter all input values!" },
      { condition: c2, message: "Password mismatched!" },
      { condition: c3, message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!" },
      { condition: c4, message: "Please enter a valid email address!" }
    ];

    combinations.forEach(({ condition, message }) => {
      if (condition) {
        notify(message);
      }
    });

    if (!combinations.some(({ condition }) => condition)) {
      console.log("No conditions are true");
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    var c1 = false;
    var c2 = false;
    var c3 = false;
    var c4 = false;
    if (
      !formInputData.user_name ||
      !formInputData.email ||
      !formInputData.password ||
      !formInputData.confirm_Password
    ) {
      notify("Please enter all input values!");
      return;
    }

    if (formInputData.password !== formInputData.confirm_Password) {
      c2 = true;
    }

    if (!isValidPassword(formInputData.password)) {
      c3 = true;

    }
    if (!isValidEmail(formInputData.email)) {
      c4 = true;
    }
    if (c1 || c2 || c3 || c4) {
      checkConditions(c1, c2, c3, c4);
      return;
    }

    postData();
  };

  const reloadPage = () => {
    window.location.reload();
  };
  const handelLoginFrom = async (event) => {
    event.preventDefault();
    if (!formInputData.email || !formInputData.password) {
      notify('Please Enter your email and password !');
      return;
    }
    if (formInputData.email == 'admin@gmail.com' && formInputData.password === 'admin@123') {
      localStorage.setItem('user_Id', '101');
      localStorage.setItem('user_Name', 'Admin');
      navigate('/AdminPort');
      reloadPage();
    }
    else{

    
    axios
      .get('http://localhost:8080/userInformation/user', {
        params: {
          email: formInputData.email,
          password: formInputData.password
        }
      })
      .then(response => {
        console.log(response);
        notifySuccess('Successfully Signed In' + response.data.user_id);

        dispatch(setInformation({
          user_id: response.data.user_id,
          user_Name: response.data.user_Name,
          email: response.data.email,
          password: response.data.password,
          token: response.data.token,
          role_id: response.data.role_id
        }));

        localStorage.setItem('user_Id', response.data.user_id);
        localStorage.setItem('user_Name', response.data.user_Name);


        navigate('/KycDoc');
        reloadPage();
      })
      .catch(error => {
        console.log(error);
        if (error.response) {
          if (error.response.status === 404) {
            notify('Email is wrong');
          } else if (error.response.status === 401) {
            notify('Password is wrong');
          } else {
            notify('An unexpected error occurred');
          }
        } else {
          notify('An unexpected error occurred');
        }
      });}
  };
  const [name, setName] = useState(localStorage.getItem('user_Name'));

  return (
    <div className='continer-fluid header sticky-top'>
      <ToastContainer />
      <div>


      </div>
      <div>

        <Modal show={popReg} onHide={handelCloseReg} centered>
          <Modal.Body style={{ display: 'flex', backgroundColor: '#f0f0f0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
            <div style={{ flex: '1', paddingRight: '10px' }}>
              {/* Place your image component here */}
              <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*sNM_Q6uUblHJr5IQ9MaySA.gif" alt="Your Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: '1', paddingLeft: '10px', padding: '20px', textAlign: 'center' }}>
              <div>
                <Logo />

                <Register></Register>
              </div>
              <UserName inputChange={inputChange} user_name={formInputData.user_name} />
              <Email inputChange={inputChange} email={formInputData.email} />
              <Password inputChange={inputChange} password={formInputData.password} />
              <ConfirmPassword inputChange={inputChange} confirm_Password={formInputData.confirm_Password} />
              <Button variant="warning" onClick={handleFormSubmit}>Register</Button>
              {!(!formInputData.user_name &&
                !formInputData.email &&
                !formInputData.password &&
                !formInputData.confirm_Password) && <Button variant="" onClick={resetForm}>reset</Button>}
              <br />
              <Button variant="" onClick={handelCloseReg}>Register later</Button><br></br>



            </div>
            <ToastContainer />
          </Modal.Body>


          <Modal.Footer style={{ backgroundColor: 'rgb(158, 154, 154,0.3)', border: '100%', alignItems: 'center', height: '0px' }}>
            {/* <p style={{textAlign:'center', fontSize:'10px'}}>REGISTER</p> */}
          </Modal.Footer>

        </Modal>

      </div>






      <div>

        <Modal show={popSig} onHide={handelCloseSig} centered>
          <Modal.Body style={{ display: 'flex', backgroundColor: '#f0f0f0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
            <div style={{ flex: '1', paddingRight: '10px' }}>
              {/* Place your image component here */}
              <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*sNM_Q6uUblHJr5IQ9MaySA.gif" alt="Your Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: '1', paddingLeft: '10px', padding: '20px', textAlign: 'center' }}>
              <div>
                <Logo />
                <SignInLogo></SignInLogo>
              </div>
              <Email inputChange={inputChange} email={formInputData.email} />
              <Password inputChange={inputChange} password={formInputData.password} />
              <Button variant="warning" onClick={handelLoginFrom}>SignIn</Button>
              {!(!formInputData.email &&
                !formInputData.password
              ) && <Button variant="" onClick={resetForm}>reset</Button>}
              <br />




              {/* <Button variant="" onClick={handelCloseSig}>Register later</Button> */}
              <Button variant="" onClick={showReg}>I Don't have Account</Button><br></br>
            </div>
            <ToastContainer />
          </Modal.Body>


          <Modal.Footer style={{ backgroundColor: 'rgb(158, 154, 154,0.3)', border: '100%', alignItems: 'center', height: '0px' }}>
            {/* <p style={{textAlign:'center', fontSize:'10px'}}>REGISTER</p> */}
          </Modal.Footer>

        </Modal>

      </div>


      <nav class="navbar navbar-expand-lg navbar-light " style={{ backgroundColor: ' #e3f2fd', boxShadow: '0px 0px 10px -1px rgb(128, 126, 123)' }}>
        <div class="container-fluid">
          <a class="navbar-brand p-0" href="#" style={{ backgroundColor: ' rgb(57, 136, 160,0.2)', borderRadius: '10px' }}>
            <Logo></Logo>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" >Home</a>
              </li>

            </ul>

            <div class="d-flex">


              {name !== null ?
                (

                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item " >
                      <a class="nav-link active" aria-current="page"  ><b>Welcome : </b>{name}</a>
                    </li>
                    {localStorage.getItem('user_Name') === 'Admin' ?
                      <button className='btn btn' onClick={() => { navigate('/AdminPort'); }}>View Our Users Update</button>
                      :
                      <button className='btn btn' onClick={() => { navigate('/KycDoc'); }}>Update KYC</button>
                    }
                  </ul>
                ) :
                (
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" style={{ cursor: 'pointer' }} onClick={handelShowReg}>Register</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" style={{ cursor: 'pointer' }} onClick={handelShowSig}>Login</a>
                    </li>
                  </ul>
                )
              }



            </div>


          </div>
        </div>

      </nav>
    </div>
  );
}

export default Navbar;
