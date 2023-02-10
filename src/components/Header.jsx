import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import navIcon from '../assets/images/app/navIcon.jpg';
import { userInfo, updateUserInfo } from '../slice';

export default function Header() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let loginUserInfo = useSelector(userInfo);

  function logOutUser() {
    dispatch(updateUserInfo(null));
    navigate('/login');
  }
  return (
    <div className="page-header-wrap">
      <div className="navbar-header">
        <Link to="/">
          <img src={navIcon} alt="" />
        </Link>
      </div>
      <div className="navbar-content">
        <ul>
          <li>
            <Link to="/">About</Link>
          </li>
          <li>
            <Link to="/">Tech Stack</Link>
          </li>
          <li>
            <Link to="/">Projects</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-footer">
        <a href="https://github.com/vinayWebD">
          <i className="fa-brands fa-github"></i>
        </a>
        <i className="fa-brands fa-twitter"></i>
        <a href="https://in.linkedin.com/">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        {loginUserInfo == null ? (
          ''
        ) : (
          <i
            className="fa-solid fa-right-from-bracket"
            id="logoutIcon"
            onClick={() => logOutUser()}
          ></i>
        )}
      </div>
    </div>
  );
}
