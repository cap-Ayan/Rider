import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from 'react-router-dom'

const Start = () => {
const navigate = useNavigate();

  return (
    <>
    <div className={`
        h-screen w-screen flex flex-col justify-between pt-8 
        bg-bottom  bg-no-repeat
        bg-[url('https://plus.unsplash.com/premium_photo-1736435070040-c98215ce275e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=715')]
        md:bg-[url('https://plus.unsplash.com/premium_photo-1663951252600-2fd5c60749c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4OXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=60&w=600')]
        bg-cover
    `}>
        <h1 className='text-black text-4xl font-semibold ml-8'>Rider</h1>
        <div className='py-5 px-5 bg-white pb-7 '>
            <h2 className='text-2xl font-bold text-black'>Get Started With Rider</h2>
            <button className='w-full bg-black text-white py-3 rounded  font-medium text-xl mt-5 relative'onClick={()=>navigate('/user/login')}>Continue <i className="ri-arrow-right-line absolute right-5 top-1/2 -translate-y-1/2"></i></button>
        </div>
    </div>
    </>
  )
}

export default Start