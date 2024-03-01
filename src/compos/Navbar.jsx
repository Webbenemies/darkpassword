import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Auth from '../appwrite/Auth'
import { storelogout } from '../store/Storeslice'

const Navbar = () => {
  let selet= useSelector(state=>state.track.status)
  let disp = useDispatch()
  let navia = useNavigate()

  const appwritelogout = async()=>{
   let out = await Auth.logout()
   if (out) {
    disp(storelogout())
    navia("/")
   }
  }
  return (
    <>
    <div className={ `bg-black text-white z-10 h-14 flex  items-center  justify-between px-[5%]`}>
      <Link to={"/"}>
        <h1 className='text-[1.5rem] uppercase font-[600] font-mono tracking-[6px] select-none'>create your world</h1>
      </Link>
        {!selet?(
          <div className=' flex gap-6 '>
          <p className=' text-[0.9rem] hover:text-blue-300 '><Link to={"/login"} className='flex items-center'><span className="material-symbols-outlined">login</span>login</Link></p>
          <p className=' text-[0.9rem] text-white'><Link to={"/signup"} className=' rounded-md bg-blue-600 py-1 px-3'>signup</Link></p>
          </div>
        ):(<span className="material-symbols-outlined symbols-defult hover:text-red-400" onClick={appwritelogout}>logout</span>)}
    </div>
    </>
  )
}

export default Navbar