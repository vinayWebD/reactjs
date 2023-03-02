import React, { useState, useEffect } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updateUserInfo } from '../../store/reducers/authentication/authentication';
import '../../assets/css/login.scss';

export default function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const usersListsArray = useSelector((state) => state.authentication.usersList);
  const userInfo = useSelector((state) => state.authentication.userInfo);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (userInfo) {
      switch (userInfo.type) {
        case 'superAdmin':
          navigate('/dashboard');
          break;
        case 'admin':
          navigate('/dashboard');
          break;
        default: {
          if (params.page == 'quiz') {
            navigate('/quizDashboard');
          } else {
            navigate('/todolists');
          }
          break;
        }
      }
    }
    // dispatch(updateUserInfo(null));
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
        dispatch(updateUserInfo(data));
        switch (data.type) {
          case 'superAdmin':
            navigate('/dashboard');
            break;
          case 'admin':
            navigate('/dashboard');
            break;
          default: {
            if (params.page == 'quiz') {
              navigate('/quizDashboard');
            } else {
              navigate('/todolists');
            }
            break;
          }
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
            <Input
              sx={{
                my: 1,
                py: 0,
                fontSize: '18px',
              }}
              className="loginInput"
              type={showPassword ? 'text' : 'password'}
              placeholder="Type your password"
              value={inputPassword}
              onChange={(e) => {
                setErrorMessage('');
                setPasswordErrorMessage('');
                setInputPassword(e.target.value);
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
        <button className="login-btn" onClick={() => loginUser()}>
          LOGIN
        </button>
        <p className="error">{errorMessage}</p>
        <div className="alternative-signup">
          <p>
            Not a member?{' '}
            <Link to={`/register/${params.page}`}>
              <span className="loginSpan">Sign-up</span>
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
