import React, { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import '../assets/css/login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addUserData } from '../store/reducers/authentication/authentication';

const date = new Date();
let nextId = date.getTime();
export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const usersListsArray = useSelector((state) => state.authentication.usersList);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function registerUser() {
    let errorFound = false;
    if (registerUsername == '') {
      errorFound = true;
      setUserNameErrorMessage('UserName is Required!');
    }
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!registerEmail.match(mailFormat)) {
      errorFound = true;
      setEmailErrorMessage('Email is Invalid!');
    }
    if (registerEmail == '') {
      errorFound = true;
      setEmailErrorMessage('Email is Required!');
    }
    var passwordFormat = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!registerPassword.match(passwordFormat)) {
      errorFound = true;
      setPasswordErrorMessage('Password is Invalid!');
    }
    if (registerPassword == '') {
      errorFound = true;
      setPasswordErrorMessage('Password is Required!');
    }
    if (!errorFound) {
      let found = false;
      usersListsArray.forEach((obj) => {
        if (obj.email == registerEmail) {
          found = true;
          setEmailErrorMessage('Email Already exist!');
        }
      });
      if (!found) {
        let userDataObj = {
          id: nextId++,
          userName: registerUsername,
          email: registerEmail,
          password: registerPassword,
          status: 'approved',
          type: 'user',
        };
        let parsedArray = JSON.parse(JSON.stringify(usersListsArray));
        parsedArray.push(userDataObj);
        dispatch(addUserData(parsedArray));
        navigate(`/login/${params.page}`);
        setRegisterUsername('');
        setRegisterEmail('');
        setRegisterPassword('');
      }
    }
  }

  return (
    <div className="loginPageWrap">
      <section>
        <h1 className="loginFormHeading">Register</h1>
        <div className="login-form">
          <h4 className="inputHeading">Username</h4>
          <div className="username-input">
            <i className="fas fa-user loginIcon"></i>
            <input
              className="loginInput"
              type="text"
              placeholder="Type your username"
              value={registerUsername}
              onChange={(e) => {
                setUserNameErrorMessage('');
                setRegisterUsername(e.target.value);
              }}
            />
            <p className="error">{userNameErrorMessage}</p>
          </div>
          <h4 className="inputHeading">Email</h4>
          <div className="username-input">
            <i className="fas fa-user loginIcon"></i>
            <input
              className="loginInput"
              type="text"
              placeholder="Type your email"
              value={registerEmail}
              onChange={(e) => {
                setEmailErrorMessage('');
                setRegisterEmail(e.target.value);
              }}
            />
            <p className="error">{emailErrorMessage}</p>
          </div>
          <h4 className="inputHeading">Password</h4>
          <div className="password-input">
            <i className="fas fa-lock loginIcon"></i>
            <Input
              sx={{
                py: 0,
                fontSize: '18px',
              }}
              className="loginInput"
              type={showPassword ? 'text' : 'password'}
              placeholder="Type your password"
              value={registerPassword}
              onChange={(e) => {
                setPasswordErrorMessage('');
                setRegisterPassword(e.target.value);
              }}
              id="standard-adornment-password"
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

            <p className="error">{passwordErrorMessage}</p>
          </div>
        </div>
        <button
          className="login-btn"
          onClick={() => {
            registerUser();
          }}
        >
          Sign Up
        </button>
        <div className="alternative-signup">
          <p>
            Already a member?{' '}
            <Link to={`/login/${params.page}`}>
              <span className="loginSpan">Sign-in</span>
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
