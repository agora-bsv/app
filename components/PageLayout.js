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
          {headerObjects.map((obj, index) => (
            <div className="headerobj" key={index}>
              <div className="fonticon">{obj.icon}</div>
            </div>
          ))}
        </div>
        <div className="body">
          <h1>{title}</h1>
          <p>{description}</p>
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
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLayout;
