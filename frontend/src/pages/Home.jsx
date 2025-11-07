import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const checkProfile = async () => {
      try {
        const res = await fetch('/api/users/profile', { // <-- changed to relative path
          method: 'GET',
          credentials: 'include', // keep this so cookies are sent/stored
          headers: { 'Content-Type': 'application/json' },
        });

        if (!mounted) return;

        console.log('Profile fetch status:', res.status, res.statusText);
        const text = await res.text();
        console.log('Profile raw response text:', text);

        let data = {};
        try { data = text ? JSON.parse(text) : {}; } catch (err) {
          console.error('Profile JSON parse error:', err);
        }

        console.log('Profile parsed data:', data);

        if (res.ok && data.user) {
          setUser(data.user);
          setLoading(false);
        } else {
          console.warn('Profile not valid -> redirect to login');
          navigate('/user/login', { replace: true });
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        navigate('/user/login', { replace: true });
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

export default Home;