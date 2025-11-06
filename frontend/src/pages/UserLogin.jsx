import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // inject Google font once
  useEffect(() => {
    const id = 'userlogin-google-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder - wire this to your login API
    console.log('login attempt', { email, password });
  };

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      color: '#000000',
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      padding: '4px',
    },
    card: {
      width: '100%',
      maxWidth: '560px', // increased width to make card bigger
      
      padding: '40px', // increased padding for a larger card feel
     
      background: '#ffffff',
      
    },
    title: {
      margin: 0,
      marginBottom: '10px',
      fontSize: '24px', // slightly larger title
      fontWeight: 600,
      color: '#000',
    },
    subtitle: {
      margin: 0,
      marginBottom: '22px',
      fontSize: '14px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    },
    label: {
      fontSize: '13px',
      color: '#111',
      marginBottom: '6px',
      fontWeight: 500,
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      borderRadius: '10px',
      border: '1px solid rgba(0,0,0,0.12)',
      background: '#fff',
      color: '#000',
      fontSize: '15px',
      outline: 'none',
    },
    button: {
      marginTop: '10px',
      padding: '14px 16px',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: '16px',
      background: '#000',
      color: '#fff',
    },
    helper: {
      marginTop: '14px',
      fontSize: '13px',
      color: '#444',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.page}>
     
      <main style={styles.card} aria-labelledby="login-heading">
         <h2 className='text-4xl font-bold mb-10'>Rider</h2>
        <h1 id="login-heading" style={styles.title}>User Login</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form style={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button}>Log in</button>
        </form>

        <div style={styles.helper}>
          <small>
            Don't have an account? <Link to="/user/signin">Register</Link>
            {' '}|{' '}
            <Link to="/captain/login">Login as a captain</Link>
          </small>
        </div>
      </main>
    </div>
  );
};

export default UserLogin;