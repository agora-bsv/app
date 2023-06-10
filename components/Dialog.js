// Dialog.js

import React from 'react';
import PropTypes from 'prop-types';

const Dialog = ({ title, children }) => {
  return (
    <div className="dialogwrapper w-form">
      <form id="email-form" name="email-form" data-name="Email Form" method="get" className="dialog">
        <div className="dialogcover"></div>
        <div className="dialogform">
          <div className="dialogheading">{title}</div>
          {children}
        </div>
      </form>
    </div>
  );
};

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dialog;
