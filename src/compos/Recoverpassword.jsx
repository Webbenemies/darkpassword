import React, { useState } from 'react'
import Auth from '../appwrite/Auth'
import {useDispatch } from 'react-redux'
import { showtost } from '../store/Storeslice'
const Recoverpassword = () => {
    const [email, setemail] = useState('')
    const [erro, seterro] = useState('')
    const disp = useDispatch()
    const loca = String(`${window.location.origin}/forgetpassword/varify`)

    const handelsub = async(e)=>{
        e.preventDafault()
        try {
            let triy = await Auth.createRepassword(email,loca)
            if (triy) {
                disp(showtost({"display":true, "mass":"chack your email and forget password", icon:'contact_mail', bg:"bg-green-500", time:'5000'}))
            }
        } catch (error) {
            seterro(error)
            console.log(error);
        }
    }

  return (
<div className=' bg-black text-white w-full h-screen flex flex-col items-center justify-center'>
<h1 className='text-[1.5rem] uppercase font-[600] font-mono tracking-[6px] select-none'>forget password</h1>
<form onSubmit={handelsub} className='flex flex-col items-center justify-center p-5 gap-8'>
        <p className='text-[0.7rem] text-red-300'>{erro && erro.response.message?erro.response.message:null}</p>
        <p className='text-[0.7rem] text-red-300'>{navigator.onLine?(null):("OFFLINE")}</p>
        <input className=' text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder='email' spellCheck="false"
        onChange={(e)=> setemail(e.target.value)}
        value={email}/>
        <button type='submit' className=' bg-blue-500 text-white px-10 py-1 outline-none rounded'>login</button>
    </form>
</div>
  )
}

export default Recoverpassword