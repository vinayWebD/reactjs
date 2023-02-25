import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProjectsCard(props) {
  return (
    <>
      <div className="col">
        <div className="card-wrap">
          <div className="card-header">
            <img src={props.image} alt="" />
          </div>
          <div className="card-content">
            <h2>{props.heading}</h2>
            <p>{props.description}</p>
            <p>
              <strong>Tech Stack : </strong>HTML, CSS Javascript
            </p>
          </div>
          <div className="card-footer">
            <Link to={props.previewLink}>
              <i className="fa-solid fa-link"></i> Live Preview
            </Link>
            <a href={props.codeLink} target="_blank" rel="noreferrer">
              <i className="fa-brands fa-github"></i> View Code
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

ProjectsCard.propTypes = {
  image: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  previewLink: PropTypes.string,
  codeLink: PropTypes.string,
};
