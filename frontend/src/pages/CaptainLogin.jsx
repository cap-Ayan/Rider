import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // inject Google font once
  useEffect(() => {
    const id = 'captainlogin-google-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error('All fields are required.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }

    try {
      const res = await fetch('/api/captain/login', { // relative (proxy)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // important so server Set-Cookie is accepted
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        toast.success(data.message || 'Logged in successfully');
        setEmail('');
        setPassword('');
        navigate('/caphome');
      } else {
        const message =
          data.message ||
          (data.errors && Array.isArray(data.errors) ? data.errors.map((e) => e.msg).join(', ') : 'Login failed');
        toast.error(message);
      }
    } catch (err) {
      console.error('Captain login error:', err);
      toast.error('Network error. Please try again later.');
    }
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
        <h1 id="login-heading" style={styles.title}>Log in as a Captain</h1>
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
            Don't have an account? <Link to="/captain/signin">Register</Link>
            {' '}|{' '}
            <Link to="/user/login">Login as a user</Link>
          </small>
        </div>
      </main>
    </div>
  );
};

export default CaptainLogin;