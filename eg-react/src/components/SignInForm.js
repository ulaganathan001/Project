import React from "react";
import Email from "./Email";
import Password from "./Password";
import SignInButton from "./SignInButton";
import Reset from "./Reset";
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignInForm = ({ setIsSignedIn, setUser, setAuthToken }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const inputEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const inputPasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const resetForm = () => {
        setEmail("");
        setPassword("");
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            toast.warning('Please Enter your email and password !', {
                position: toast.POSITION.TOP_CENTER
            });
            return;
        }
        console.log({ email }, { password });
        axios
            .get('http://localhost:8089/api/v1/userServiceWeb/userInfo', {
                params: {
                    email: email,
                    password: password
                }
            })
            .then(response => {
                console.log(response);
                toast.success('succeessfully SignIn', {
                    position: toast.POSITION.TOP_RIGHT
                });
                console.log(response.status);
                console.log(response.data);
                navigate('/')
                setIsSignedIn(true);
                setUser(response.data);
                console.log(response.data.token);
                setAuthToken(response.data.token);
            })
            .catch(error => {
                console.log(error)
                toast.error(' Invalid username and/or password.', {
                    position: toast.POSITION.TOP_CENTER
                });
            })
    }

    return (
        <div className="form">
            <h1>User SignIn</h1><hr />
            <br />
            <form >
                <Email inputEmailChange={inputEmailChange} email={email} /> <br />
                <Password inputPasswordChange={inputPasswordChange} testName={password} /> <br />
                <SignInButton handleFormSubmit={handleFormSubmit} /><br />
                <Reset resetForm={resetForm} />
            </form>
        </div>
    )
}
export default SignInForm