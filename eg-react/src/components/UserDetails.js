import React from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { Delete, Edit } from "@mui/icons-material";

const UserDetails = ({ authToken, setAuthToken, setIsSignedIn }) => {
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8089/api/v1/userServiceWeb/getAllUserInfo', {

        params: {
          token: authToken
        }

      })
      .then(response => {
        setRowData(response.data);
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
  const actionCellRenderer = (params) => {
    let editingCells = params.api.getEditingCells();
    let isCurrentRowEditing = editingCells.some((cell) => {
      return cell.rowIndex === params.node.rowIndex;
    });

    return (
      <div >
        {isCurrentRowEditing ?
          (<>
            <button className="action-button update" data-action="update"> Update</button>&nbsp;
            <button className="action-button cancel" data-action="cancel"> Cancel</button>
          </>
          ) :
          (<>
            <Edit className="action-button edit" data-action="edit"></Edit> &nbsp;
            <Delete className="action-button delete" data-action="delete" ></Delete>
          </>
          )
        }
      </div>
    )
  }
  const onCellClicked = (params) => {
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;
      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        axios
          .delete("http://localhost:8089/api/v1/userServiceWeb/deleteUser", {
            params: {
              token: authToken,
              user_id: params.node.data.user_id,
              password: params.node.data.password
            }
          })
          .then(response => {
            console.log(response);
            params.api.applyTransaction({
              remove: [params.node.data]
            });
            toast.success('succeessfully User deleted', {
              position: toast.POSITION.TOP_RIGHT
            });

          })
          .catch(error => {
            console.log(error);
            toast.error(' Internal server error', {
              position: toast.POSITION.TOP_CENTER
            });

            if (error.code === "ERR_BAD_REQUEST") {
              toast.error('TimeOut!..Please SignIn ', {
                position: toast.POSITION.TOP_RIGHT
              });
              setAuthToken('');
              setIsSignedIn(false);
            }
          })

      }

      if (action === "update") {
        params.api.stopEditing(false);
        const user_id = params.node.data.user_id;
        const user_name = params.node.data.user_name;
        const email = params.node.data.email;
        const password = params.node.data.password;


        if (!validateEmail(email)) {
          toast.error('Invalid email address!', {
            position: toast.POSITION.TOP_RIGHT
          });

          if (params.node.data.backupData) {
            params.node.setData(params.node.data.backupData);
            delete params.node.data.backupData;
          }
          return;
        }

        if (!validatePassword(password)) {
          toast.error('Password should have at least one uppercase, one lowercase, one number and one special character!', {
            position: toast.POSITION.TOP_RIGHT
          });

          if (params.node.data.backupData) {
            params.node.setData(params.node.data.backupData);
            delete params.node.data.backupData;
          }
          return;
        }

        console.log(user_id);
        console.log(user_name);
        console.log(email);
        console.log(password);
        axios
          .put("http://localhost:8089/api/v1/userServiceWeb/updateUser", {
            token: authToken,
            user_id: user_id,
            user_name: user_name,
            email: email,
            password: password
          }
          )
          .then(response => {
            console.log(response);
            console.log(response.status);
            toast.success('User details updated successfully', {
              position: toast.POSITION.TOP_RIGHT
            });

            setRowData(rowData.map(row => {
              if (row.user_id === user_id) {
                return {
                  ...row,
                  user_name: user_name,
                  email: email,
                  password: password
                };
              }
              return row;
            }));
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
          })
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    return regex.test(password);
  };

  const columnDefs = [
    { headerName: "User ID", field: "user_id", sortable: true, checkboxSelection: true, filter: true, floatingFilter: true, resizable: true, flex: 1 },
    { headerName: "User Name", field: "user_name", sortable: true, filter: true, floatingFilter: true, editable: true, resizable: true, },
    { headerName: "Email", field: "email", sortable: true, filter: true, floatingFilter: true, editable: true, resizable: true, },
    { headerName: "Password", field: "password", sortable: true, filter: true, floatingFilter: true, editable: true, resizable: true, },
    { headerName: "Role", field: "role_id", sortable: true, floatingFilter: true, editable: true, },
    {
      headerName: "Action",
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action"
    }
  ];

  const onRowEditingStarted = (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
    params.node.data.backupData = { ...params.node.data };
  }

  const onRowEditingStopped = (params) => {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
    if (params.node.data.backupData) {
      params.node.setData(params.node.data.backupData);
      delete params.node.data.backupData;
    }
  }

  return (
    <div className="ag-theme-alpine-dark" style={{ height: '550px', width: '1100px', marginLeft: '180px', marginTop: '80px' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        onRowEditingStarted={onRowEditingStarted}
        onRowEditingStopped={onRowEditingStopped}
        onCellClicked={onCellClicked}
        suppressClickEdit={true}
        editType="fullRow">
      </AgGridReact>
    </div>
  )
}
export default UserDetails;