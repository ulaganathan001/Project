import React from 'react';

const UploadedFilesLogo = () => {
  const letterStyle = {
    fontSize: '30px', // Adjust the font size as needed
    display: 'inline-block' // Needed for animation
  };

  const animationStyle = {
    animationName: 'falling',
    animationDuration: '1s',
    animationFillMode: 'forwards'
  };

  return (
    <div className="d-flex align-items-center p-0 m-0">
      <p style={{ fontSize:'30px',...letterStyle }}>UPLOA<span style={{...letterStyle,color:'red',...animationStyle}}>D</span>ED&nbsp;F<span style={{...letterStyle,color:'red',...animationStyle}}>I</span>LES</p>
      <style>{`
        @keyframes falling {
          0% { transform: translateY(-50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    
    </div>
  );
}

export default UploadedFilesLogo;
