import React, { useEffect, useState } from 'react';

import '../assets/css/usersDashboard.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { addUserData } from '../store/reducers/authentication/authentication';

export default function UsersDashboard() {
  const usersListsArray = useSelector((state) => state.authentication.usersList);
  const loginUserInfo = useSelector((state) => state.authentication.userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [chartData, setChartData] = useState({
    approved: 0,
    pending: 0,
    notApproved: 0,
  });

  useEffect(() => {
    if (loginUserInfo.type != 'admin') {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    usersListsArray.forEach((obj) => {
      switch (obj.status) {
        case 'approved':
          setChartData((prevState) => {
            return {
              ...prevState,
              approved: prevState.approved + 1,
            };
          });
          break;
        case 'pending':
          setChartData((prevState) => {
            return {
              ...prevState,
              pending: prevState.pending + 1,
            };
          });
          break;
        case 'not approved':
          setChartData((prevState) => {
            return {
              ...prevState,
              notApproved: prevState.notApproved + 1,
            };
          });
          break;
      }
    });
  }, [usersListsArray]);

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

  const data = {
    labels: ['Approved', 'Pending', 'Not Approved'],
    datasets: [
      {
        label: '# of Votes',
        data: [chartData.approved, chartData.pending, chartData.notApproved],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

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
      <div className="dashboardChart">
        <Doughnut data={data} />
      </div>
    </div>
  );
}
