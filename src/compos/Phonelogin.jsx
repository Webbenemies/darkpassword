import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Auth from '../appwrite/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { setphoneid, storelogin } from '../store/Storeslice'

const Phonelogin = () => {
    const [number, setnumber] = useState("")
    const [erro, seterro] = useState("")
    const [otpstart, setotpstart] = useState(false)
    const inputref = useRef()
    const disp = useDispatch()
    const seletor = useSelector(state=>state.phoneid.ids)
    const navi = useNavigate()

    const sendotp = async()=>{
        try {
            let log = await Auth.createphone(number)
            if (log) {
                console.log(log);
                disp(setphoneid(log.userId))
                setnumber("")
                setotpstart(true)
            }
        } catch (error) {
            seterro(error)
        }
    }

    const varifyotp = async()=>{
        try {
            let id = seletor
            let otp = await Auth.otpphone({'phoneid':id,'code':number})
            if (otp) {
                console.log('>>>>>>>>>>otp>', otp)
                let data = await Auth.getcurrentacc()
                if (data) {
                    console.log('>>>>>>>>>>data>', data)
                    disp(storelogin(data))
                    navi("/")
                }
            } 
        } catch (error) {
            seterro(error)
            console.log(error);
        }
    }

    const handelsub = (e)=>{ 
    e.preventDefault()
    if (number == "") return inputref.current.classList = "text-white bg-transparent border-x-2 border-red-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]"
    inputref.current.classList = "text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]"
{!otpstart?sendotp():varifyotp()}

}
  return (
    <>
    <div className=' bg-black text-white w-full h-screen flex flex-col items-center justify-center '>
    <h1 className='text-[1.5rem] uppercase font-[600] font-mono tracking-[6px] select-none'>{otpstart?"varify OTP":"get otp"}</h1>
    <form onSubmit={handelsub} className='flex flex-col items-center justify-center p-5 gap-8'>
        <p className='text-[0.7rem] text-red-300'>{erro && erro.response.message?erro.response.message:null}</p>
        <p className='text-[0.7rem] text-red-300'>{navigator.onLine?(null):("OFFLINE")}</p>
        <input ref={inputref} className=' text-white bg-transparent border-x-2 border-blue-400 outline-none px-2 py-1 text-[0.9rem] w-[20rem]' type="text" placeholder={!otpstart?"+123":"otp"} spellCheck="false" autoFocus
        onChange={(e)=> setnumber(e.target.value)}
        value={number}/>

        <button type='submit' className=' bg-blue-500 text-white px-10 py-1 outline-none rounded'>{otpstart?"varify otp":"get otp"}</button>
    </form>
    <p>you have an account <Link className='text-blue-300' to={"/login"}>login now</Link></p>
    </div>
    </>
  )
}

export default Phonelogin