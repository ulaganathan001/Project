import React from 'react'

const ConfirmPassword = ({ inputChange, confirm_Password }) => {
    return (
        <div>
            <label className="ip-label">Confirm Password:</label> &nbsp; &nbsp;<br />
            <input type="password" name="confirm_Password" onChange={inputChange} value={confirm_Password}

                style={{
                    height: 25,
                    width: 270,
                    fontSize: "15px"
                }} />
        </div>
    )
}
export default ConfirmPassword