// pages/forgot-password.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';

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
    <div>
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
  );
};

export default ForgotPasswordPage;
