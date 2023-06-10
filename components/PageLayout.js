// PageLayout.js

import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const PageLayout = ({ title, description, headerObjects, children }) => {
  return (
    <section className="viewport">
      <Navbar />
      <div className="window">
        <div className="header">
          <div className="headerobj">
            <div className="fonticon">{headerObjects[0].icon}</div>
          </div>
          <div className="headerbody">
            <div className="headertitle">{title}</div>
            <div className="headerdescription">{description}</div>
          </div>
          <a className="headerobj" onClick={headerObjects[1].onClick}>
            <div className="fonticon">{headerObjects[1].icon}</div>
          </a>
        </div>
        <div className="body">
          {children}
        </div>
        <div className="footer">{/* Footer content */}</div>
      </div>
    </section>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headerObjects: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLayout;



