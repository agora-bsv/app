// pages/_app.js
import '../styles/globals.css';
import { AuthProvider } from '../src/contexts/AuthContext';
import Viewport from '../components/Viewport';

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
