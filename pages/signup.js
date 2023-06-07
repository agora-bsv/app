// pages/signup.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, signInWithGoogle } from '../firebase';

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await user.sendEmailVerification();
      router.push('/verify-email');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign up with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignUpPage;
