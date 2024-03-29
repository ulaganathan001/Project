import React from 'react';

const Logo = () => {
  const letterStyle = {
    fontSize: '32px',
    fontWeight: 'bold', 
    display: 'inline-block' 
  };

  const animationStyle = {
    animationName: 'falling',
    animationDuration: '1s',
    animationFillMode: 'forwards'
  };

  return (
    <div className="d-flex align-items-center p-0 m-0">&nbsp;
      <span className="logo-letter" style={{...letterStyle, color: 'black'}}>K</span>
      <span className="logo-letter" style={{...letterStyle, color: 'red', ...animationStyle}}>Y</span>
      <span className="logo-letter" style={letterStyle}>C</span>&nbsp;
      <style>{`
        @keyframes falling {
          0% { transform: translateY(-50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Logo;
