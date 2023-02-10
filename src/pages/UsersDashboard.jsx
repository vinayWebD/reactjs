import React, { useEffect, useState } from 'react';
import '../assets/css/usersDashboard.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { usersList, userInfo, addUserData } from '../slice';

export default function UsersDashboard() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const usersListsArray = useSelector(usersList);
  const loginUserInfo = useSelector(userInfo);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteUser() {
    let deletedUser = usersListsArray.filter((obj) => {
      if (obj.id != deleteId) {
        return obj;
      }
    });
    dispatch(addUserData(deletedUser));
    handleClose();
  }

  function editUserInfo(userId) {
    navigate(`/infoUpdate/${userId}`);
  }

  function createUser() {
    navigate('/infoUpdate');
  }

  useEffect(() => {
    if (loginUserInfo.type != 'admin') {
      navigate('/login');
    }
  });

  return (
    <div className="loginPageWrap dashboardWrap">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => deleteUser()} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <table className="usersList">
        <caption>
          <button onClick={() => createUser()}>Add User</button>
        </caption>
        <thead>
          <tr className="headRow">
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Status</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersListsArray.map((obj, key) => {
            return (
              <tr key={key} className="bodyRow">
                <td>{obj.userName}</td>
                <td>{obj.email}</td>
                <td>{obj.password}</td>
                <td>{obj.status}</td>
                <td>{obj.type}</td>
                <td>
                  <button
                    className="dashboardEditBtn"
                    value={obj.id}
                    onClick={(e) => editUserInfo(e.target.value)}
                  >
                    Edit
                  </button>
                  <button
                    className="dashboardEditBtn"
                    value={obj.id}
                    onClick={(e) => {
                      handleClickOpen();
                      setDeleteId(e.target.value);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
