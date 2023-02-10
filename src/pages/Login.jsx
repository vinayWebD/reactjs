import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateUserInfo, usersList } from '../slice';
import '../assets/css/login.scss';

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
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
    if (inputEmail == '') {
      errorFound = true;
      setEmailErrorMessage('Email is Required!');
    }
    if (inputPassword == '') {
      errorFound = true;
      setPasswordErrorMessage('Password is Required!');
    }
    if (!errorFound) {
      let data = usersListsArray.find(
        (item) => item.email == inputEmail && item.password == inputPassword,
      );

      if (data && data.status === 'approved') {
        switch (data.type) {
          case 'admin':
            dispatch(updateUserInfo(data));
            navigate('/dashboard');
            break;
          default:
            dispatch(updateUserInfo(data));
            navigate('/todolists');
            break;
        }
      } else if (data && data.status != 'approved') {
        setErrorMessage('Your status is still not approved');
      } else {
        setErrorMessage('Invalid login details');
      }
    }
  }

  return (
    <div className="loginPageWrap">
      <section>
        <h1 className="loginFormHeading">Login</h1>
        <div className="login-form">
          <h4 className="inputHeading">Email</h4>
          <div className="username-input">
            <i className="fas fa-user loginIcon"></i>
            <input
              className="loginInput"
              type="text"
              placeholder="Type your email"
              value={inputEmail}
              onChange={(e) => {
                setErrorMessage('');
                setEmailErrorMessage('');
                setInputEmail(e.target.value);
              }}
            />
            <p className="error">{emailErrorMessage}</p>
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
