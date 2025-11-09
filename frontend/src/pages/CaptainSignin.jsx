import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CaptainSignin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [plate, setPlate] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [type, setType] = useState('car');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password) {
      toast.error('All fields are required.');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }
    if (!plate.trim()) {
      toast.error('Vehicle plate is required.');
      return;
    }
    if (Number(capacity) < 1) {
      toast.error('Vehicle capacity must be at least 1.');
      
      return;
    }

    try {
      const payload = {
        name,
        email,
        password, // backend hashes before saving
        vehicle: {
          plate,
          capacity: Number(capacity),
          type,
        },
      };

      const res = await fetch('/api/captain/register', { // relative (proxy)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // include cookies so captoken can be set
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          data.message ||
          (data.errors && Array.isArray(data.errors) ? data.errors.map((e) => e.msg).join(', ') : 'Registration failed');
        toast.error(message);
        setError(message);
        return;
      }

      toast.success(data.message || 'Captain registered successfully');
      navigate('/caphome');
    } catch (err) {
      console.error('Captain register error:', err);
      toast.error('Network error. Please try again.');
      setError('Network error. Please try again.');
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
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial",
      padding: '32px',
    },
    card: {
      width: '100%',
      maxWidth: '720px',
      borderRadius: '12px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.06)',
    },
    title: { margin: 0, marginBottom: 8, fontSize: 26, fontWeight: 700 },
    subtitle: { margin: 0, marginBottom: 18, color: '#333' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 },
    fullWidth: { gridColumn: '1 / -1' },
    label: { fontSize: 13, marginBottom: 6, display: 'block', fontWeight: 600 },
    input: {
      width: '100%',
      padding: '12px 14px',
      borderRadius: 8,
      border: '1px solid rgba(0,0,0,0.12)',
      fontSize: 15,
      outline: 'none',
      color: '#000',
      background: '#fff',
    },
    button: {
      marginTop: 10,
      padding: '14px 16px',
      borderRadius: 10,
      border: 'none',
      cursor: 'pointer',
      fontWeight: 700,
      fontSize: 16,
      background: '#000',
      color: '#fff',
      width: '100%',
    },
    error: { color: '#b00020', marginTop: 8 },
    helper: { marginTop: 14, textAlign: 'center', color: '#444' },
  };

  return (
    <div style={styles.page}>
      <main style={styles.card} aria-labelledby="captain-signup-heading">
        <h1 id="captain-signup-heading" style={styles.title}>Captain Sign up</h1>
        <p style={styles.subtitle}>Create your captain account</p>

        <form onSubmit={handleSubmit} noValidate>
          <div style={styles.formGrid}>
            <div>
              <label htmlFor="name" style={styles.label}>Full name</label>
              <input id="name" style={styles.input} value={name} onChange={(e)=>setName(e.target.value)} />
            </div>

            <div>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input id="email" type="email" style={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input id="password" type="password" style={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <div>
              <label htmlFor="confirm" style={styles.label}>Confirm Password</label>
              <input id="confirm" type="password" style={styles.input} value={confirm} onChange={(e)=>setConfirm(e.target.value)} />
            </div>

            <div>
              <label htmlFor="plate" style={styles.label}>Vehicle Plate</label>
              <input id="plate" style={styles.input} value={plate} onChange={(e)=>setPlate(e.target.value)} />
            </div>

            <div>
              <label htmlFor="capacity" style={styles.label}>Capacity</label>
              <input id="capacity" type="number" min="1" style={styles.input} value={capacity} onChange={(e)=>setCapacity(e.target.value)} />
            </div>

            <div style={styles.fullWidth}>
              <label htmlFor="type" style={styles.label}>Vehicle Type</label>
              <select id="type" style={styles.input} value={type} onChange={(e)=>setType(e.target.value)} >
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button}>Create account</button>
        </form>

        <div style={styles.helper}>
          <small>
            Already a captain? <Link to="/captain/login">Sign in</Link> {' | '}
            <Link to="/user/signin">Sign up as a user</Link>
          </small>
        </div>
      </main>
    </div>
  );
};

export default CaptainSignin;