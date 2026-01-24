"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { serviceAuth } from '@/app/service/authService';
import { LoginPayload } from '@/app/types/auth';
import {toast} from "sonner"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginPage() {
  const router = useRouter();
  
  const {register,handleSubmit, formState:{errors}} = useForm();

  const handleError = (message ="Error al guardar", description="Intenta de nuevo más tarde") => {
    toast.error(message, {
      description: description,
      duration: 6000,
    });
  };

  const loginUser = async(data : LoginPayload)=>{
    try {
        const response: any = await serviceAuth.login(data);
        if(response.token){
            serviceAuth.setToken(response.token);
            router.push('/dashboard/home');
        }
    } catch (error: any) {
        handleError('Error al iniciar sesión', error.response?.data?.message || 'Credenciales inválidas');
    }
  }

  const onSubmit = handleSubmit(data=>{

    const payload: LoginPayload = {
        email: data.email,
        password: data.password,
    }
    loginUser(payload);    
  });

  return (
    <div className='h-[calc(100vh-7rem)] flex justify-center items-center'>
      <form action="" onSubmit={onSubmit} className='w-1/4'>
        <h1 className='font-bold text-4xl mb-4 text-center'>
            Login
        </h1>
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
      

        <button className='w-full p-3 rounded-sm bg-blue-500 font-semibold '>Login</button>
        
       <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            ¿Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage;