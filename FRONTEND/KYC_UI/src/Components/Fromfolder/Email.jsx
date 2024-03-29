import React, { useState } from 'react';

const Email = ({ inputChange, email }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!email) {
            setFocused(false);
        }
    };

    const inputStyle = {
        fontSize: "15px",
        border: focused ? '0px solid black' : '0px solid rgba(0, 0, 0, 5)',
    };

    const placeholderStyle = {
        position: 'absolute',
        bottom: focused || email ? '100%' : '8px',
        left: '10px',
        color: '#6c757d',
        fontSize: focused || email ? '12px' : '15px',
        transition: 'all 0.2s',
    };

    return (
        <div className="form-group" style={{ position: 'relative',margin:'15px' }}>
            <input 
                type="email"
                name="email" 
                id="email" 
                className={`form-control ${focused ? 'focused' : ''}`}
                onChange={inputChange} 
                value={email}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
            />
            {!email && (
                <label htmlFor="email" style={placeholderStyle}>Email Id</label>
            )}
        </div>
    );
}

export default Email;
