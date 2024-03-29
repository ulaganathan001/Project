import React, { useState } from 'react';

const ConfirmPassword = ({ inputChange, confirm_Password }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!confirm_Password) {
            setFocused(false);
        }
    };

    const inputStyle = {
        fontSize: "15px",
        border: focused ? '0px solid black' : '0px solid rgba(0, 0, 0, 5)',
    };

    const placeholderStyle = {
        position: 'absolute',
        bottom: focused || confirm_Password ? '100%' : '8px',
        left: '10px',
        color: '#6c757d',
        fontSize: focused || confirm_Password ? '12px' : '15px',
        transition: 'all 0.2s',
    };

    return (
        <div className="form-group" style={{ position: 'relative', margin: '15px' }}>
            <input 
                
                type="password"
                name="confirm_Password" 
                id="confirm_Password" 
                className={`form-control ${focused ? 'focused' : ''}`}
                onChange={inputChange} 
                value={confirm_Password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
            />
            {!confirm_Password && (
                <label htmlFor="confirm_Password" style={placeholderStyle}>Confirm Password</label>
            )}
        </div>
    );
}

export default ConfirmPassword;
