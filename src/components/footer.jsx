import React from 'react';
import { Link } from 'react-router-dom';

export default function footer() {
  return (
    <>
      <div className="footer-header">
        <span>+91 8209308885</span>
        <span>vinay071001@gmail.com</span>
        <span>
          <a href="https://github.com/vinayWebD">
            <i className="fa-brands fa-github"></i>
          </a>
          <Link to="">
            <i className="fa-brands fa-twitter"></i>
          </Link>
          <Link to="">
            <i className="fa-brands fa-linkedin"></i>
          </Link>
        </span>
      </div>
      <div className="footer-content">
        <ul>
          <Link to="">
            <li>Home</li>
          </Link>
          <Link to="">
            <li>About</li>
          </Link>
          <Link to="#techStack">
            <li>Tech Stack</li>
          </Link>
          <Link to="#projects">
            <li>Projects</li>
          </Link>
          <Link to="#contact">
            <li>Contact</li>
          </Link>
        </ul>
        <p>
          Designed and built by <span>Vinay Choudhary</span> with <span>Love & Coffee</span>
        </p>
      </div>
    </>
  );
}
