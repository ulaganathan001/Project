import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/'); 
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [navigate]); 

  return (
    <div className="alert alert-success" role="alert">
      This is a success alert—check it out!
    </div>
  );
};

export default Success;