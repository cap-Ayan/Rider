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
        const data = await res.json().catch(() => ({}));

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

  

  return (
    <div className='bg-white h-screen relative'>
      <h1 className='px-4 py-4 text-black text-4xl font-light absolute z-10'>Rider</h1>
      <img src="https://imgs.search.brave.com/VbVNc__OwWH1SNkV6W-AaKhk06LGmObAy49QtAC9JxY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5tYXB0aWxlci5j/b20vaW1nL1N0cmVl/dHNfVGh1bWJuYWls/XzYzZDg1Y2Y5NTMu/d2VicA" alt="" className='relative w-full h-full object-cover' />
      <div className='px-7 absolute bg-white/90 bottom-0 top-0 left-0 h-fit w-full py-10'>
        <h2 className='text-3xl font-medium text-gray-700 my-5'>Find a Ride</h2>
        <form className='flex flex-col gap-4'>
          <input type="text" placeholder='Pickup Location' className='border border-gray-300 p-2 rounded placeholder:text-gray-400 outline-none text-gray-800' />
          <input type="text" placeholder='Dropoff Location' className='border border-gray-300 p-2 rounded placeholder:text-gray-400 outline-none text-gray-800' />
          <button type="submit" className='bg-black/90 text-white p-2 rounded font-semibold'>Search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;