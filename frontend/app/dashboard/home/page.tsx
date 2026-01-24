"use client"

import { serviceAuth } from '@/app/service/authService'

function HomePage() {

  const handleSubmit = async()=>{
    await serviceAuth.logout();
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl mb-4 text-center'>
            Home Page
      </h1>
      <button className='p-3 cursor-pointer rounded-sm bg-blue-600 text-amber-50' onClick={handleSubmit}>Logout</button>
    </div>
  )
}

export default HomePage