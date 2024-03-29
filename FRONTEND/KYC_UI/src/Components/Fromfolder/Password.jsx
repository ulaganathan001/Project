import React, { useState } from 'react';

const Password = ({ inputChange, password }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!password) {
            setFocused(false);
        }
    };

    const inputStyle = {
        fontSize: "15px",
        border: focused ? '0px solid black' : '0px solid rgba(0, 0, 0, 5)',
    };

    const placeholderStyle = {
        position: 'absolute',
        bottom: focused || password ? '100%' : '8px',
        left: '10px',
        color: '#6c757d',
        fontSize: focused || password ? '12px' : '15px',
        transition: 'all 0.2s',
    };

    return (
        <div className="form-group" style={{ position: 'relative', margin: '15px' }}>
            <input 
                type="password"
                name="password" 
                id="password" 
                className={`form-control ${focused ? 'focused' : ''}`}
                onChange={inputChange} 
                value={password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
            />
            {!password && (
                <label htmlFor="password" style={placeholderStyle}>Password</label>
            )}
        </div>
    );
}

export default Password;
