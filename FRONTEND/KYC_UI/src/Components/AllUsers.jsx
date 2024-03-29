import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllUsersLogo from './Pages/Logos/AllUsersLogo';

const AllUsers = () => {
  const [uploads, setUploads] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/userInformation/getAllUser');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  return (
    <div>
      

      <div className="container ">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2><AllUsersLogo></AllUsersLogo></h2>
        <h5 className='p-1 mt-3' style={{ border: '1px solid rgb(145, 144, 144, 0.2)', boxShadow: '5px 5px 10px -1px rgb(145, 144, 144, 0.8)' ,borderRadius:'8px'}}>&nbsp;&nbsp;Number of Users:&nbsp;
         <font className='bg-warning' style={{borderRadius:'8px'}}><b>&nbsp;{users.length}&nbsp;</b></font>&nbsp;</h5>
      </div>
        <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.user_name}</td>
                <td>{user.email}</td>
                <td>
                    <button disabled>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
