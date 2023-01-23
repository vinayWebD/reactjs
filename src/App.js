import React from 'react';
import './assets/css/app.css';
import { Link } from 'react-router-dom';
import github from './assets/images/app/techStack/akar-icons_github-fill.svg';
import bootstrap from './assets/images/app/techStack/logos_bootstrap.svg';
import git from './assets/images/app/techStack/logos_git-icon.svg';
import react from './assets/images/app/techStack/logos_react.svg';
import sass from './assets/images/app/techStack/logos_sass.svg';
import css from './assets/images/app/techStack/vscode-icons_file-type-css.svg';
import html from './assets/images/app/techStack/vscode-icons_file-type-html.svg';
import js from './assets/images/app/techStack/vscode-icons_file-type-js-official.svg';
import vsCode from './assets/images/app/techStack/vscode-icons_file-type-vscode.svg';

export default function App() {
  return (
    <div className="page-data-wrap-seprator">
      {/* <include src="./partials/navbar.html">Loading...</include> */}
      <div className="page-content-wrap">
        <div className="block-1-wrap">
          <div className="block-1-header">
            <h1>
              Hi 👋,
              <br />
              My name is <br /> Vinay Choudhary <br />
              Reactjs Developer
            </h1>
          </div>
          <div className="block-1-content">
            <img src="https://cdn-icons-png.flaticon.com/512/6840/6840478.png" alt="" />
          </div>
        </div>

        <div className="block-2-wrap" id="techStack">
          <div className="block-2-header">
            <h1>My Tech Stack</h1>
            <p>Technologies I&apos;ve been working with recently</p>
          </div>
          <div className="block-2-content">
            <img src={github} alt="" />
            <img src={bootstrap} alt="" />
            <img src={git} alt="" />
            <img src={react} alt="" />
            <img src={sass} alt="" />
            <img src={html} alt="" />
            <img src={css} alt="" />
            <img src={js} alt="" />
            <img src={vsCode} alt="" />
          </div>
        </div>

        <div className="block-3-wrap block-2-wrap" id="projects">
          <div className="block-3-header block-2-header">
            <h1>Projects</h1>
            <p>Things I&apos;ve built so far</p>
          </div>
          <div className="block-3-content">
            <div className="col">
              <div className="card-wrap">
                <div className="card-header">
                  <img
                    src="https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/0x0.jpg?format=jpg&width=360"
                    alt=""
                  />
                </div>
                <div className="card-content">
                  <h2>To-do Lists</h2>
                  <p>
                    It is a advance To-do web application in which you can edit, delete and strike
                    your tasks.
                  </p>
                  <p>
                    <strong>Tech Stack : </strong>HTML, CSS Javascript
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="/todoLists">
                    <i className="fa-solid fa-link"></i> Live Preview
                  </Link>
                  <Link to="https://bitbucket.org/_vinaychoudhary/htmlpractice/src/master/">
                    <i className="fa-brands fa-github"></i> View Code
                  </Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card-wrap">
                <div className="card-header">
                  <img
                    src="https://images.unsplash.com/photo-1530563885674-66db50a1af19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VhdGhlciUyMGFwcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <div className="card-content">
                  <h2>Weather App</h2>
                  <p>It is an application in which you can search the temperature of any city.</p>
                  <p>
                    <strong>Tech Stack : </strong>HTML, CSS Javascript
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="./pages/weatherApp.html">
                    <i className="fa-solid fa-link"></i> Live Preview
                  </Link>
                  <Link to="https://bitbucket.org/_vinaychoudhary/htmlpractice/src/master/">
                    <i className="fa-brands fa-github"></i> View Code
                  </Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card-wrap">
                <div className="card-header">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNoDI4n6eBEwev1exL4_Rg06YKmtC_p1f8A&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="card-content">
                  <h2>Fetch Data Assignment</h2>
                  <p>In this the data is fetched from different APIs on request.</p>
                  <p>
                    <strong>Tech Stack : </strong>HTML, CSS Javascript
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="./pages/apiFetchTask.html">
                    <i className="fa-solid fa-link"></i> Live Preview
                  </Link>
                  <Link to="https://bitbucket.org/_vinaychoudhary/htmlpractice/src/master/">
                    <i className="fa-brands fa-github"></i> View Code
                  </Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card-wrap">
                <div className="card-header">
                  <img
                    src="https://cdn.dribbble.com/users/1615584/screenshots/17578107/media/55cd7c269f8c140c2f19281e30e8abb3.jpg?compress=1&resize=400x300"
                    alt=""
                  />
                </div>
                <div className="card-content">
                  <h2>Components Design</h2>
                  <p>
                    It contains the different components used in web applications with their html
                    and css code.
                  </p>
                  <p>
                    <strong>Tech Stack : </strong>HTML, CSS Javascript
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="./pages/components.html">
                    <i className="fa-solid fa-link"></i> Live Preview
                  </Link>
                  <Link to="https://bitbucket.org/_vinaychoudhary/htmlpractice/src/master/">
                    <i className="fa-brands fa-github"></i> View Code
                  </Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card-wrap">
                <div className="card-header">
                  <img
                    src="https://1.bp.blogspot.com/-pdqcVeIQp64/XDX7TzdRdcI/AAAAAAAAM8E/ZmGuB6caZqIGmEflGHcj3zgXJJrmqRLdgCLcBGAs/w1200-h630-p-k-no-nu/Free%2BCourses%2Bto%2Blearn%2BJavaScript.jpg"
                    alt=""
                  />
                </div>
                <div className="card-content">
                  <h2>JS Practice</h2>
                  <p>It is the template of the methods used while learning javascript.</p>
                  <p>
                    <strong>Tech Stack : </strong>HTML, CSS Javascript
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="./pages/jsPractice.html">
                    <i className="fa-solid fa-link"></i> Live Preview
                  </Link>
                  <Link to="https://bitbucket.org/_vinaychoudhary/htmlpractice/src/master/">
                    <i className="fa-brands fa-github"></i> View Code
                  </Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card-wrap">
                <div className="card-header">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5esvtT-D1LVQLGkL_laiVZHe3hnio7zhvBw&usqp=CAU"
                    alt=""
                  />
                </div>
                <div className="card-content">
                  <h2>CSS Practice</h2>
                  <p>It is the template of the methods used while learning CSS.</p>
                  <p>
                    <strong>Tech Stack : </strong>HTML, CSS Javascript
                  </p>
                </div>
                <div className="card-footer">
                  <Link to="./pages/cssPractice.html">
                    <i className="fa-solid fa-link"></i> Live Preview
                  </Link>
                  <Link to="https://bitbucket.org/_vinaychoudhary/htmlpractice/src/master/">
                    <i className="fa-brands fa-github"></i> View Code
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-footer-wrap" id="contact">
        <div className="footer-header">
          <span>+91 8209308885</span>
          <span>vinay071001@gmail.com</span>
          <span>
            <Link to="">
              <i className="fa-brands fa-github"></i>
            </Link>
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
      </div>
    </div>
  );
}
