import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";

interface TokenData {
    sub: string;
    iat: number;
    exp: number;
}

interface UserData {
    uploadedToken: string | null;
}

interface AppProps {
    user: any;
}

const ReminderYear: React.FC<AppProps> = ({ user }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [sub, setSub] = useState<string | null>(null);
    const [iat, setIat] = useState<number | null>(null);
    const [exp, setExp] = useState<number | null>(null);
    const [expiryMessage, setExpiryMessage] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);


    const navigate = useNavigate();


    //crete on dummy method
    const nav = () => {
        navigate('/kycUpdate');
    }

    useEffect(() => {
        fetchData(user.email, user.password);

        // Cleanup function to clear interval
        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [user.email, user.password]);

    useEffect(() => {
        if (iat !== null && exp !== null) {
            const currentTime = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = exp - currentTime;

            if (timeUntilExpiry <= 0) {
                setExpiryMessage('Your ' + sub + ' has expired. Please upload the file again.');

                setTimeRemaining(null);
                if (timerId) clearInterval(timerId);
            } else {
                const expiryDate = new Date(exp * 1000);
                const currentDate = new Date();
                const threeDaysBeforeExpiryYear = new Date(expiryDate.getFullYear(), 0, 1);
                threeDaysBeforeExpiryYear.setDate(threeDaysBeforeExpiryYear.getDate() - 3);

                if (currentDate >= threeDaysBeforeExpiryYear) {
                    startTimer(timeUntilExpiry);
                } else {
                    setExpiryMessage(null);
                    setTimeRemaining(null);

                    if (timerId) clearInterval(timerId);
                }
            }
        }
    }, [iat, exp, fileType]);

    useEffect(() => {
        if (timeRemaining && timeRemaining > 0) {
            const intervalId = setInterval(() => {
                setTimeRemaining(prevTimeRemaining => {
                    if (prevTimeRemaining && prevTimeRemaining <= 1) {
                        clearInterval(intervalId);
                    }
                    return prevTimeRemaining && prevTimeRemaining - 1;
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [timeRemaining]);

    const fetchData = async (email: string, password: string) => {
        try {
            const response = await axios.get<UserData>('http://localhost:8089/api/v1/userServiceWeb/userInfo', {
                params: {
                    email: email,
                    password: password
                }
            });

            setUserData(response.data);

            if (response.data && response.data.uploadedToken) {
                const decodedData = jwtDecode<TokenData>(response.data.uploadedToken);
                setSub(decodedData.sub);
                setIat(decodedData.iat);
                setExp(decodedData.exp);
                setFileType(decodedData.sub);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const startTimer = (timeUntilExpiry: number) => {
        setTimerId(setInterval(() => {
            updateTimer();
        }, 1000));
        setTimeRemaining(timeUntilExpiry);
    };

    const updateTimer = () => {
        if (iat !== null && exp !== null) {
            const currentTime = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = exp - currentTime;

            if (timeUntilExpiry <= 0) {
                setExpiryMessage('Your ' + sub + ' is expired. Please upload the file again.');

                setTimeRemaining(null);
                if (timerId) clearInterval(timerId);
            } else {
                setExpiryMessage(null);
                setTimeRemaining(timeUntilExpiry);
            }
        }
    };

    const formatTime = (time: number) => {
        const days = Math.floor(time / (60 * 60 * 24));
        const hours = Math.floor((time % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((time % (60 * 60)) / 60);
        const seconds = time % 60;
        
        return `${days} days ${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };




    const timerStyle: React.CSSProperties = {
        fontFamily: 'timerFont, Arial, sans-serif', // Custom font family
        fontSize: '24px', // Font size
        // Add any other styling you want
    };


    return (
        <div>
            {userData && userData.uploadedToken !== null && sub && iat !== null && exp !== null && (
                <div>





                    {expiryMessage && (


                        <div style={{
                            height: 'auto', width: '400px', background
                                : 'linear-gradient(to bottom, rgb(241, 22, 22, 1),black)', position: 'absolute', top: '50%', left: '85%', transform: 'translate(-50%, -50%)', padding: '20px'
                            , borderRadius: '10px', boxShadow: '0 0 5px 5px rgba(0,0,0,0.2)'
                        }}>

                            <div style={{
                                height: 'auto', width: 'auto', backgroundColor
                                    : 'white', position: 'absolute', top: '0%', left: '50%', transform: 'translate(-50%, -50%)'
                                , borderRadius: '50px', boxShadow: '0 0 10px 5px rgba(0,0,0,0.2)'
                            }}>
                                <img src="https://static-00.iconduck.com/assets.00/danger-icon-1024x1024-potubshn.png" alt="" height={90} width={90} />
                            </div>

                            <div style={{ marginTop: '40px' }}>


                                <div style={{ width: '100%', height: '200px', textAlign: 'center', backgroundImage: 'url(https://cdn.dribbble.com/users/368135/screenshots/5713705/kyc-verifying-circle.gif)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <b style={{ color: 'red' }}>EXIRED</b>
                                </div>

                                <hr style={{ color: 'grey' }}></hr>




                                <p style={{ color: 'white' }}>
                                    We kindly request that you upload your <b>{sub}</b> again, as it has expired on
                                    <b>{new Date(iat *  1000).toLocaleDateString()}</b> at<b> {new Date(iat * 1000).toLocaleTimeString()}</b>. This is necessary for KYC verification. Please use the button below to upload your document.

                                </p>
                                <button style={{ height: '40px', width: '100%', background: 'white', color: 'black', borderRadius: '5px', padding: '8px', fontSize: '15px',border: '1px solid black' }} onClick={nav}>Upload File</button>

                            </div>

                        </div>


                    )}

                    {timeRemaining !== null && (

                        <div style={{
                            height: 'auto', width: '300px', background
                                : 'linear-gradient(to bottom, rgb(250, 163, 2,0.3), rgb(250, 163, 2,0.8))', position: 'absolute', top: '50%', left: '85%', transform: 'translate(-50%, -50%)', padding: '20px'
                            , borderRadius: '10px', boxShadow: '0 0 5px 5px rgba(0,0,0,0.2)'
                        }}>

                            <div style={{
                                height: 'auto', width: 'auto', backgroundColor
                                    : 'none', position: 'absolute', top: '0%', left: '50%', transform: 'translate(-50%, -50%)'
                                , borderRadius: '50px', boxShadow: '0 0 10px 5px rgba(0,0,0,0.2)'
                            }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Out_of_date_clock_icon.svg/256px-Out_of_date_clock_icon.svg.png" alt="" height={90} width={90} />
                            </div>

                            <div style={{ marginTop: '40px' }}>
                                <h3 style={{ textAlign: 'center' }}><b>TIME IS RUNNING OUT</b></h3>
                                <div style={{ width: '100%', height: '200px', textAlign: 'center', backgroundImage: 'url(https://cdn.dribbble.com/users/368135/screenshots/5713705/kyc-verifying-circle.gif)', backgroundSize: 'cover', backgroundPosition: 'center' }}>

                                </div>
                                <hr color='grey'></hr>

                                <div style={timerStyle} >
                                    <p>Your <b>{fileType}</b> will expire in <b>{formatTime(timeRemaining)}</b> </p>
                                </div>

                                <button style={{ height: '40px', width: '100%', background: 'white', color: 'black', borderRadius: '5px', padding: '8px', fontSize: '15px',border: '1px solid black' }} onClick={nav}>Upload File</button>
                            </div>

                        </div>
                    )}



                </div>
            )}
        </div>
    );
};

export default ReminderYear;