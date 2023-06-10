// pages/index.js
require('dotenv').config();
import React from 'react';
import Viewport from '../components/Viewport';
import PageLayout from '../components/PageLayout';

const IndexPage = () => {
  const title = 'AGORA BETA v0.0.1';
  const description = 'This is the homepage';
  const headerObjects = [
    { icon: '' },
    { icon: '', onClick: () => console.log('Perform action') },
  ];
  

  return (
    <Viewport>
      <PageLayout title={title} description={description} headerObjects={headerObjects}>
        <div className="body">
          {/* Body content */}
        </div>
        <div className="footer">
          {/* Footer content */}
        </div>
      </PageLayout>
    </Viewport>
  );
};

export default IndexPage;
