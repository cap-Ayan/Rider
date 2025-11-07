
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserSignin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // inject Google font once
  useEffect(() => {
    const id = 'usersignin-google-font';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !password) {
      setError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    // TODO: call register API (example below)
    fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    }).then((res) => {
      if (res.ok) {
        navigate('/home');
        setError(null);
        setName('');
        setEmail('');
        setPassword('');
        setConfirm('');
      } else {
        setError('Failed to create account.');
      }
    }).catch(() => {
      toast.error('Network error. Please try again later.');
    });

   toast.success('Account created successfully!');
  }
  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      color: '#000000',
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      padding: '5px',
    },
    card: {
      width: '100%',
      maxWidth: '640px',
      borderRadius: '14px',
      padding: '48px',
      boxShadow: '0 12px 50px rgba(0,0,0,0.06)',
      background: '#ffffff',
      border: '1px solid rgba(0,0,0,0.06)',
    },
    title: {
      margin: 0,
      marginBottom: '8px',
      fontSize: '28px',
      fontWeight: 700,
      color: '#000',
    },
    subtitle: {
      margin: 0,
      marginBottom: '20px',
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
      fontWeight: 600,
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
    error: {
      color: '#b00020',
      fontSize: '13px',
      marginTop: '6px',
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
      <main style={styles.card} aria-labelledby="signup-heading">
        <h1 id="signup-heading" style={styles.title}>Create an account</h1>
        <p style={styles.subtitle}>Sign up to get started</p>

        <form style={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" style={styles.label}>Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="At least 6 characters"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirm" style={styles.label}>Confirm password</label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              placeholder="Re-enter password"
              style={styles.input}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button}>Create account</button>
        </form>

        <div style={styles.helper}>
          <small>
            Already have an account? <Link to="/user/login">Sign in</Link> {' '}
            
           
          </small>
        </div>
        <div style={styles.helper}>
          <small>
           
            <Link to="/captain/signin">Sign up as a captain</Link>
          </small>
        </div>
      </main>
    </div>
  );
};


export default UserSignin;