import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/authentication';
import { updateUserInfo, usersList } from '../slice';
import '../assets/css/login.css';

export default function Login() {
  const [inputUserName, setInputUserName] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const usersListsArray = useSelector(usersList);

  useEffect(() => {
    dispatch(updateUserInfo(null));
  });

  function loginUser() {
    let errorFound = false;
    if (inputUserName == '') {
      errorFound = true;
      setUserNameErrorMessage('UserName is Required!');
    }
    if (inputPassword == '') {
      errorFound = true;
      setPasswordErrorMessage('Password is Required!');
    }
    if (adminLogin(inputUserName, inputPassword)) {
      errorFound = true;
      let obj = {
        userName: 'admin',
        password: 'admin123',
      };
      dispatch(updateUserInfo(obj));
      navigate('/dashboard');
    }
    if (!errorFound) {
      let found = false;
      if (usersListsArray.length == 0) {
        return;
      } else {
        usersListsArray.forEach((obj) => {
          if (
            obj.userName == inputUserName &&
            obj.password == inputPassword &&
            obj.status == 'approved'
          ) {
            found = true;
            dispatch(updateUserInfo(obj));
            navigate('/todolists');
          }
        });
      }
      if (!found) {
        setErrorMessage('Invalid login details');
      }
    }
  }

  return (
    <div className="loginPageWrap">
      <section>
        <h1 className="loginFormHeading">Login</h1>
        <div className="login-form">
          <h4 className="inputHeading">Username</h4>
          <div className="username-input">
            <i className="fas fa-user loginIcon"></i>
            <input
              className="loginInput"
              type="text"
              placeholder="Type your username"
              value={inputUserName}
              onChange={(e) => {
                setErrorMessage('');
                setUserNameErrorMessage('');
                setInputUserName(e.target.value);
              }}
            />
            <p className="error">{userNameErrorMessage}</p>
          </div>
          <h4 className="inputHeading">Password</h4>
          <div className="password-input">
            <i className="fas fa-lock loginIcon"></i>
            <input
              className="loginInput"
              type="text"
              placeholder="Type your password"
              value={inputPassword}
              onChange={(e) => {
                setErrorMessage('');
                setPasswordErrorMessage('');
                setInputPassword(e.target.value);
              }}
            />
            <p className="error">{passwordErrorMessage}</p>
          </div>
        </div>
        <button className="login-btn" onClick={() => loginUser()}>
          LOGIN
        </button>
        <p className="error">{errorMessage}</p>
        <div className="alternative-signup">
          <p>
            Not a member?{' '}
            <Link to="/register">
              <span className="loginSpan">Sign-up</span>
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
