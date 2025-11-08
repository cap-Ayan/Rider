import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CapHome = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const checkProfile = async () => {
      try {
        const res = await fetch('/api/captain/profile', { // <-- changed to relative path
          method: 'GET',
          credentials: 'include', // keep this so cookies are sent/stored
          headers: { 'Content-Type': 'application/json' },
        });

        if (!mounted) return;
        const data = await res.json().catch(() => ({}));
       

        if (res.ok && data.captain) {
          setUser(data.captain);
          setLoading(false);
        } else {
          console.warn('Profile not valid -> redirect to login');
          navigate('/captain/login', { replace: true });
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        navigate('/captain/login', { replace: true });
      }
    };

    checkProfile();
    return () => { mounted = false; };
  }, [navigate]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome{user?.name ? `, ${user.name}` : ''}.</p>
    </div>
  );
};

export default CapHome;