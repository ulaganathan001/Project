import React from 'react'
import SubmitButton from './SubmitButton'
import ResetButton from './ResetButton'
import { useState } from 'react'
import axios from 'axios'
import SetPassword from './SetPassword'
import ConfirmPassword from './ConfirmPassword'
import EmailId from './EmailId'
import UserName from './UserName'
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom'

function UserRegistration() {

    const [formInputData, setFormInputData] = useState({
        user_name: '',
        email: '',
        password: '',
        confirm_Password: ''
    });
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

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        if (
            !formInputData.user_name ||
            !formInputData.email ||
            !formInputData.password ||
            !formInputData.confirm_Password
        ) {
            toast.warning("Please enter all input values!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
    
        if (formInputData.password !== formInputData.confirm_Password) {
            toast.warning("Password mismatched!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
    
        if (!isValidPassword(formInputData.password)) {
            toast.warning(
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number!",
                { position: toast.POSITION.TOP_RIGHT }
            );
            return;
        }
    
        if (!isValidEmail(formInputData.email)) {
            toast.warning("Please enter a valid email address!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }
    
        axios
            .post("http://localhost:8089/api/v1/userServiceWeb/userInfo", {
                user_name: formInputData.user_name,
                email: formInputData.email,
                password: formInputData.password,
            })
            .then((response) => {
                console.log(response);
                toast.success("Successfully registered user!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                event.preventDefault();
                setFormInputData({
                    user_name: "",
                    email: "",
                    password: "",
                    confirm_Password: "",
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error("User registration failed!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            });
    };
    
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
        return passwordRegex.test(password);
    };
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    

    return (
        <div className='user-form'>
            <h1 className='user-head'>User Registration</h1><hr />
            <form>
                <UserName inputChange={inputChange} user_name={formInputData.user_name} /> <br />
                <EmailId inputChange={inputChange} email={formInputData.email} /><br />
                <SetPassword inputChange={inputChange} password={formInputData.password} /> <br />
                <ConfirmPassword inputChange={inputChange} confirm_Password={formInputData.confirm_Password} /> <br />
                <SubmitButton handleFormSubmit={handleFormSubmit} /> <br />
                <ResetButton resetForm={resetForm} /><br />
                <br />
                <p style={{ color: 'black', fontSize: '18px' }}>Already have an account?<NavLink style={{ color: 'black', fontSize: '22px' }} to='/signIn'>  SignIn</NavLink></p>
            </form>

        </div>
    )

}
export default UserRegistration