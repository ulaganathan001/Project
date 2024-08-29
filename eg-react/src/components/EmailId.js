import React from 'react'

const EmailId = ({ inputChange, email }) => {
    return (
        <div>
            <label className="ip-label"><b>Email Id:</b></label> &nbsp; &nbsp;<br />
            <input type="email" name="email" onChange={inputChange} value={email}

                style={{
                    fontSize: "15px",
                    height: 25,
                    width: 270,
                }} />

        </div>

    )

}

export default EmailId