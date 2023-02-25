import React from 'react';
import '../assets/css/app.scss';
import PropTypes from 'prop-types';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

export default function Layout({ children }) {
  return (
    <div className="page-data-wrap-seprator">
      <Header />
      <>{children}</>
      <div className="page-footer-wrap">
        <Footer />
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element,
};
