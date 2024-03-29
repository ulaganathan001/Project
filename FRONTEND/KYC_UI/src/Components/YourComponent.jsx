import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prevBlink => !prevBlink);
    }, 500); // Adjust blinking speed as needed

    return () => clearInterval(interval);
  }, []); // Run only once on component mount

  const handleClick = () => {
    setBlink(!blink); // Toggle blinking state
  };

  const linkStyle = {
    marginRight: '10px',
    textDecoration: 'none',
    color: 'blue',
    color: blink ? 'red' : '', // Add box shadow when blinking
  };

  return (
    <div>
      <a onClick={handleClick} style={linkStyle} href="#">
        Click Me
      </a>
      <style>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default YourComponent;
