import React from 'react'

function HomePage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='font-bold text-4xl mb-4 text-center'>
            Home Page
      </h1>
      <button className='p-3 cursor-pointer rounded-sm bg-blue-600 text-amber-50'>Logout</button>
    </div>
  )
}

export default HomePage