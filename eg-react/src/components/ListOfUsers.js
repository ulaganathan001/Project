import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const ListOfUsers=({authToken,setAuthToken,setIsSignedIn})=>{

    const [userData, setUserData] = useState([]);
    useEffect(() => {
        axios
          .get('http://localhost:8089/api/v1/userServiceWeb/getAllUserInfo',{
            params:{
              token: authToken
            }
          })
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            console.log(error);
            if (error.response.status === 500) {
              toast.error('Internal Server Error', {
                position: toast.POSITION.TOP_RIGHT
              });
            }
            if (error.code === "ERR_BAD_REQUEST") {
              toast.error('TimeOut!..Please SignIn ', {
                position: toast.POSITION.TOP_RIGHT
              });
              setAuthToken('');
              setIsSignedIn(false);
            }
          });
      }, [authToken]);
    
    return(
        <div className="usersList">
            <h2>Registered Users:</h2>
            { userData.map((userDetails)=>(
                <div className="user-preview" key={userDetails.user_id}>
                    <h3>{userDetails.user_name}</h3>
                    <p className="listOfEmails"> email: {userDetails.email}</p>
                </div>
            ))
            }
        </div>


    )
}

export default ListOfUsers;