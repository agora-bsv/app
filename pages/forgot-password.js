// pages/forgot-password.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import Viewport from '../components/Viewport';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      await auth.sendPasswordResetEmail(email);
      setSuccessMessage('Password reset email sent. Check your inbox.');
      setEmail('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Viewport>
      <div className="header">
        <div className="headerobj">
          <div className="fonticon"></div>
        </div>
        <div className="headerbody">
          <div className="headertitle">Profile Page</div>
          <div className="headerdescription">This is your profile page</div>
        </div>
        <div className="headerobj">
          <div className="fonticon"></div>
        </div>
      </div>
      <div className="body">
      <h1>Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      </div>
      <div className="footer">
        {/* Footer content */}
      </div>
     </Viewport>
  );
};

export default ForgotPasswordPage;