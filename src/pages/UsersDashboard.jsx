import React from 'react';
import '../assets/css/usersDashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, usersList } from '../slice';

export default function UsersDashboard() {
  const usersListsArray = useSelector(usersList);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function logOutUser() {
    dispatch(updateUserInfo(null));
    navigate('/login');
  }
  return (
    <div className="loginPageWrap dashboardWrap">
      <table className="usersList">
        <caption>REGISTERED USERS INFO</caption>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {usersListsArray.map((obj, key) => {
            return (
              <tr key={key}>
                <td>{obj.userName}</td>
                <td>{obj.email}</td>
                <td>{obj.password}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="logoutBtn" onClick={() => logOutUser()}>
        LOG OUT
      </button>
    </div>
  );
}
