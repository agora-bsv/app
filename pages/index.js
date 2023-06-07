// pages/index.js

require('dotenv').config();

import Viewport from '../components/Viewport';

// IndexPage component
const IndexPage = () => {
  return (
    <Viewport>
      <div className="header">
      <div class="header">
        <div class="headerobj">
          <div class="fonticon"></div>
        </div>
        <div class="headerbody">
          <div class="headertitle">AGORA BETA v0.0.1</div>
          <div class="headerdescription">This is some text inside of a div block.</div>
        </div>
        <div class="headerobj">
          <div class="fonticon"></div>
        </div>
      </div>
      </div>
      <div className="body">
        {/* Body content */}
      </div>
      <div className="footer">
        {/* Footer content */}
      </div>
    </Viewport>
  );
};

export default IndexPage;
