import React, { useState, useEffect } from "react";
import axios from "axios";
import './Filter.css';
import { toast } from 'react-toastify';

function Filter({authToken,setAuthToken,setIsSignedIn}) {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

//   const filterUserNames = () => {
//     return userData
//       .filter((user) => user.user_name.toLowerCase().includes(searchQuery.toLowerCase()))
//       .map((user) => <div key={user.id}>{user.user_name}</div>);
//   };

  const filterUserNames = () => {
    return userData
      .filter((user) => user.user_name.toLowerCase().startsWith(searchQuery.toLowerCase()))
      .map((user) => 
        <div>
          {user.user_name}
        </div>);
  };

  return (
    <div className="filter">
      <input name="query" type="text" placeholder="Search..." onChange={handleSearch} autoComplete="off"/>
      {filterUserNames()}
    </div>
  );
}

export default Filter;
