import React from 'react';
import { Link } from 'react-router-dom';
import navIcon from '../assets/images/app/navIcon.jpg';

export default function Header() {
  return (
    <div className="page-header-wrap">
      <div className="navbar-header">
        <img src={navIcon} alt="" />
        <img src="../" alt="" />
      </div>
      <div className="navbar-content">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
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
        <i className="fa-solid fa-circle-half-stroke"></i>
      </div>
    </div>
  );
}
