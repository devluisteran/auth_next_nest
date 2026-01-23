"use client"
import React from 'react'
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const {register,handleSubmit, formState:{errors}} = useForm();

  const onSubmit = handleSubmit(data=>{
    console.log(data);
    
  });
  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form action="" onSubmit={onSubmit} className='w-1/4'>
        <h1 className='font-bold text-4xl mb-4 text-center'>
            Register
        </h1>
        <label
        className='text-slate-800 block text-sm'
         htmlFor="userName">Name: </label>
        <input type="text" placeholder='Juan Lopez' 
        className='p-3 rounded block mb-2 bg-slate-300
         text-slate-900 w-full'
        {...register("userName",
            {
                required:{
                    value:true,
                    message:"Username is required"
                }

            })}
         />
         {
            errors.userName && typeof errors.userName.message === 'string' && (<span className='text-red-500 text-sm'>{errors.userName.message}</span>)
         }
          <label
        className='text-slate-800 block text-sm'
         htmlFor="email">Email</label>
        <input type="email" placeholder='example@gmail.com'
         className='p-3 rounded block mb-2 bg-slate-300
         text-slate-900 w-full'
        {...register("email",{ 
            required:{
                    value:true,
                    message:"Email is required"
                }})}
         />
         {
            errors.email && typeof errors.email.message === 'string' && (<span className='text-red-500 text-sm'>{errors.email.message}</span>)
         }
        <label
        className='text-slate-800 block text-sm'
         htmlFor="password">Password</label>
        <input type="password" placeholder='Password123!'
         className='p-3 rounded block mb-2 bg-slate-300
         text-slate-900 w-full'
        {...register("password",{ required:{
                    value:true,
                    message:"Password is required"
                }})}
        />
        {
            errors.password && typeof errors.password.message === 'string' && (<span className='text-red-500 text-sm'>{errors.password.message}</span>)
         }
        <label
        className='text-slate-800 block text-sm'
         htmlFor="confirmPassword">Confirm Password</label>
        <input type="confirmPassword" placeholder='Password123!' 
         className='p-3 rounded block mb-2 bg-slate-300
         text-slate-900 w-full'
        {...register("confirmPassword",{required:{
                    value:true,
                    message:"confirmPassword is required"
                }})}
        />
        {
            errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && (<span className='text-red-500 text-sm'>{errors.confirmPassword.message}</span>)
         }

        <button className='w-full p-3 rounded-sm bg-blue-500 font-semibold '>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage;