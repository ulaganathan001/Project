import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import KycDoc from './KycDoc';
import AdminPort from './AdminPort';

function Routing() {
    const [userLoggedIn, setUserLoggedIn] = useState(localStorage.getItem('user_Name') !== null);

    useEffect(() => {
        setUserLoggedIn(localStorage.getItem('user_Name') !== null);
    }, []);

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/KycDoc" element={userLoggedIn ? <KycDoc /> : <Navigate to="/" />} />
                    <Route path="/AdminPort" element={userLoggedIn ? <AdminPort/> : <Navigate to="/" /> }/>
                </Routes>
            </Router>
        </div>
    );
}

export default Routing;
