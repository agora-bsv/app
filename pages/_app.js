//  pages/_app.js

import '../styles/globals.css';
import { AuthProvider } from '../firebase';
import Viewport from '../components/Viewport';
import '../text-encoding-polyfill.js';


function Agora({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Viewport>
        <Component {...pageProps} />
      </Viewport>
    </AuthProvider>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <Agora Component={Component} pageProps={pageProps} />
  );
}





