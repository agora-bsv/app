//  pages/_app.js

import '../styles/globals.css';
import { AuthProvider } from '../firebase';
import Viewport from '../components/Viewport';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Viewport>
        <Component {...pageProps} />
      </Viewport>
    </AuthProvider>
  );
}

export default MyApp;

