// pages/_app.js
import '../styles/globals.css';
import { AuthProvider } from '../src/contexts/AuthContext';
import Viewport from '../components/Viewport';
// import '../text-encoding-polyfill.js';

// if (typeof global.TextDecoder === 'undefined') {
//   const { TextDecoder, TextEncoder } = require('util');
//   global.TextDecoder = TextDecoder;
//   global.TextEncoder = TextEncoder;
// }

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Viewport>
        <Component {...pageProps} />
      </Viewport>
    </AuthProvider>
  );
}

export default App;
