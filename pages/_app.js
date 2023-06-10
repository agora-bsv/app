//  pages/_app.js

import '../styles/globals.css';
import { AuthProvider } from '../firebase';
import Viewport from '../components/Viewport';

function Agora({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Viewport>
        <Component {...pageProps} />
      </Viewport>
    </AuthProvider>
  );
}

export default Agora;


