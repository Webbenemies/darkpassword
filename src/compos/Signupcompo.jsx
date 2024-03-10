import React, { useState } from 'react'
import Auth from '../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { storelogin } from '../store/Storeslice'
import { useNavigate, Link } from 'react-router-dom'

const Signupcompo = () => {
    const [email, setemail] = useState("")
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [erro, seterro] = useState("")
    let disp = useDispatch()
    const navig = useNavigate()

    const handelsub= async(e)=>{
        seterro("")
        e.preventDefault()
        try {
            let up = await Auth.createaccount({'email':email,'password':password,'name':name})
            if (up) {
                let data = await Auth.getcurrentacc()
                if (data) {
                disp(storelogin(data))
                navig("/")
                }
            }
        } catch (error) {
            seterro(error)
        }
    }
  return (
    <>
    <div className=' bg-black text-white w-full h-screen flex flex-col items-center justify-center '>
    <h1 className='text-[1.5rem] uppercase font-[600] font-mono tracking-[6px] select-none'>signup</h1>
    <form onSubmit={handelsub} className='flex flex-col items-center justify-center p-5 gap-8'>
        <p className='text-[0.7rem] text-red-300'>{erro && erro.response.message?erro.response.message:null}</p>
        <p className='text-[0.7rem] text-red-300'>{navigator.onLine?(null):("OFFLINE")}</p>
        <input className=' text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder='email' spellCheck="false" 
        onChange={(e)=> setemail(e.target.value)}
        value={email}/>
        <input className='text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder='password' spellCheck="false" 
        onChange={(e)=> setpassword(e.target.value)}
        value={password}/>
        <input className=' text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder='name' spellCheck="false" 
        onChange={(e)=> setname(e.target.value)}
        value={name}/>
        <button type='submit' className=' bg-blue-500 text-white px-10 py-1 outline-none rounded'>signup</button>
    </form>
    <p>create account useing <Link className='text-blue-300' to={"/phonelogin"}>phone</Link></p>
    </div>
    </>
  )
}

export default Signupcompo