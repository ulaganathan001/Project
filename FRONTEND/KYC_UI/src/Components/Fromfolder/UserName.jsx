import React, { useState } from 'react';

const UserName = ({ inputChange, user_name }) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        if (!user_name) {
            setFocused(false);
        }
    };

    const inputStyle = {
        fontSize: "15px",
        border: focused ? '0px solid black' : '0px solid rgba(0, 0, 0, 5)',
    };

    const placeholderStyle = {
        position: 'absolute',
        bottom: focused || user_name ? '100%' : '8px',
        left: '10px',
        color: '#6c757d',
        fontSize: focused || user_name ? '12px' : '15px',
        transition: 'all 0.2s',
    };

    return (
        <div className="form-group" style={{ position: 'relative',margin:'15px' }}>
            <input 
                type="text"
                name="user_name" 
                id="user_name" 
                className={`form-control ${focused ? 'focused' : ''}`}
                onChange={inputChange} 
                value={user_name}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={inputStyle}
            />
            {!user_name && <label htmlFor="user_name" style={placeholderStyle}>User Name</label>}
        </div>
    );
}

export default UserName;
