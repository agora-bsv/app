// components/viewport.js

import React from 'react';
import Navbar from './Navbar';

const Viewport = ({ children }) => {
  return (
    <section className="viewport">
      <Navbar />
      <div className="window">
        {children}
      </div>
    </section>
  );
};

export default Viewport;
