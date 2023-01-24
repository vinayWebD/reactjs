import React from 'react';
import { Link } from 'react-router-dom';
import navIcon from '../assets/images/app/navIcon.jpg';

export default function header() {
  return (
    <div className="page-header-wrap">
      <div className="navbar-header">
        <img src={navIcon} alt="" />
        <img src="../" alt="" />
      </div>
      <div className="navbar-content">
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="">About</Link>
          </li>
          <li>
            <Link to="#techStack">Tech Stack</Link>
          </li>
          <li>
            <Link to="#projects">Projects</Link>
          </li>
          <li>
            <Link to="#contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-footer">
        <i class="fa-brands fa-github"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-linkedin"></i>
        <i class="fa-solid fa-circle-half-stroke"></i>
      </div>
    </div>
  );
}
