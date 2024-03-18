import { useEffect, useState } from 'react'
import Auth from '../appwrite/Auth'
import { useDispatch } from 'react-redux'
import { showtost, storelogout } from '../store/Storeslice'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const Profile = () => {
const [datas, setdatas] = useState(null)
const [logdatas, setlogdatas] = useState([])
const [logourl, setlogourl] = useState("")
const [newname, setnewname] = useState("")
const [editname, seteditname] = useState(false)
const disp = useDispatch()
const navia  = useNavigate()
const loca = String(`${window.location.origin}/varify`)


  const currentfun = async()=>{
    let getuser = await Auth.getcurrentacc()
    if (getuser) {
      setdatas(getuser)
    }
  }

  const getlogos = async()=>{
    let logo = await Auth.getlogo()
    if (logo) {
      setlogourl(logo.href)
    }
  }

  const usersessions = async()=>{
    let logs = await Auth.Listsessions()
    if (logs) {
      setlogdatas(logs.sessions)
    }
  }

  const appwritelogout = async()=>{
    let out = await Auth.logout()
    if (out) {
     disp(storelogout())
     navia("/")
    }
   }

  const time = ()=>{
    if (datas) {
      let date = String(datas.registration)
      let regx = /\d{4}-\d{2}-\d{2}/
      let timeis = date.match(regx) 
      return timeis
    }
  }

  const editnamefun = async()=>{
    if (editname) {
      let sandname  = await Auth.updatename(newname)
      if (sandname) {
      currentfun()
      getlogos()
      seteditname(false)
      }
    }else{
      setnewname(datas.name)
      seteditname(true)
    }
  }

  const emailva = async ()=>{
    try {
      let work = await Auth.emailvarify(loca)
      if (work) {
        disp(showtost({"display":true, "mass":"chack your email and varify email", icon:'contact_mail', bg:"bg-green-500", time:'4000'}))
      }
    } catch (error) {
      disp(showtost({"display":true, "mass":"an error occurred try again some time leter", icon:'error', bg:"bg-red-500", time:'4000'}))
    }
  }

  


  useEffect(()=>{
    currentfun()
    getlogos()
    usersessions()
  },[])

  return datas?  (
    <>
<div className=' lable w-full bg-transparent text-gray-200 h-[30vh] flex items-start justify-center flex-col px-10 poppins-regular tracking-[1.5px] max-[800px]:h-[20vh]'>
<h1 className=' capitalize font-semibold text-[2rem] select-none max-[800px]:text-[4vw]'>wellcome {datas.name}</h1>
<p className=' ml-4 text-[0.6rem] max-[800px]:text-[2vw] max-[800px]:ml-1'>ID: {datas.$id}</p>
</div>
<div className=' w-[90%] mx-auto p-7 rounded-md h-[100%] bg-neutral-900 flex justify-between items-start mb-4 max-[800px]:flex-col max-[800px]:w-[95%] max-[800px]:px-1 max-[800px]:py-7'>

<div className='w-[70%] h-full rounded-md p-2 max-[800px]:w-full'>
<div className='flex items-center w-full justify-between '>
  <div className=' flex items-center  gap-7'>
  <div className=' bg-slate-900 w-[3rem] rounded-full select-none'>
  <img src={logourl} className='w-full rounded-full' />
  </div>
  <div className='text-gray-200'>
  <p className='capitalize font-semibold text-[2rem] select-none max-[800px]:text-[3vw]'>{datas.name}</p>
  <p className='text-[0.8rem] flex items-center gap-2 max-[800px]:text-[2vw]'>{datas.email?`Signed in as ${datas.email}`:null}</p>

  <p className='text-[0.8rem] flex items-center gap-2'>{datas.phone?`Signed in as ${datas.phone}`:null} {datas.phoneVerification?<span className="material-symbols-outlined text-[1rem] bg-green-400 rounded-full text-black">check_circle</span>:null}</p>
  </div>
  </div>
<button className=' px-2 py-1/2   rounded-sm text-neutral-100 hover:scale-105 text-[0.8rem] bg-red-500' onClick={appwritelogout}>logout</button>
</div>

  <div className={`w-[80%] p-4 mt-[3rem]  max-[800px]:w-full max-[800px]:p-1`}>
  <div className=' flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-md max-[800px]:hover:bg-transparent'>
    <div className=' flex gap-20'>
    <p className=' capitalize max-[800px]:text-[2.5vw]'>Name:</p>
    <div className='flex items-start'>
    {editname?null:<p className=' max-[800px]:text-[3vw]'>{datas.name}</p>}
    {editname?<input onChange={(e)=>setnewname(e.target.value)} type="text" maxLength={40} autoFocus spellCheck="false" value={newname} className=' bg-transparent border-r-[2px] border-l-[2px] px-[0.3rem] h-full outline-none max-[800px]:text-[3vw]'/>:null}
    </div>
    </div>
    <span onClick={editnamefun} className="material-symbols-outlined select-none text-[1.2rem] p-2 rounded-full hover:bg-neutral-700 cursor-pointer max-[800px]:hover:bg-transparent max-[800px]:active:bg-neutral-800 ">{editname?'save':'edit_road'}</span>
  </div>
{datas.email?

<div className=' flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-md max-[800px]:hover:bg-transparent'>
    <div className=' flex gap-20'>
    <p className=' capitalize max-[800px]:text-[2.5vw]'>Email:</p>
    <p className='flex items-center gap-2 max-[800px]:text-[3vw]'>{datas.email}{datas.emailVerification?<span className="material-symbols-outlined text-[1rem] bg-green-400 rounded-full text-black">check_circle</span>:<span className="material-symbols-outlined text-[1rem] bg-red-500 rounded-full text-black">error</span>}</p>
    </div>
    {!datas.emailVerification?(<button onClick={emailva} className='text-[0.7rem] rounded-sm hover:bg-neutral-600 text-neutral-200 px-1.5 '>verifiy email</button>):null}
  </div>:null}

  <div className=' flex items-center justify-between px-3 py-2 hover:bg-neutral-800 rounded-md max-[800px]:hover:bg-transparent'>
    <div className=' flex gap-20'>
    <p className=' capitalize max-[800px]:text-[2.5vw]'>Joined:</p>
    <p className='flex items-center gap-2 max-[800px]:text-[3vw]'>{time( )}</p>
    </div>
  </div>
</div>

</div>

<div className='  h-full rounded-md p-2 max-[800px]:self-center max-[800px]:w-full '>
<div className='w-[100%] sessons rounded-md border-[2px] py-2 px-1 border-white/70'>
  <h3 className=' font-semibold capitalize text-neutral-200 text-[1.3rem]'>your devices</h3>
  <p className='text-[0.7rem]'>Where you’re signed in</p>
{logdatas.map((e)=>(
<div key={e.$id} className='relative bg-neutral-600/50 p-2 my-2 backdrop-blur-sm rounded-md w-max'>
{e.current?<span className="material-symbols-outlined absolute select-none right-1 top-1 text-[1rem] text-green-400 cursor-default">offline_bolt</span>:null}
<p className=' capitalize text-neutral-300 font-semibold text-[0.9rem]'>{e.clientType}: {e.clientName}</p>
<p className='capitalize text-[0.9rem] font-light'>{e.deviceName}: {e.osName} {e.osVersion}</p>
<div className='flex items-center mt-1'>
<p className=' capitalize text-[0.9rem]'>{e.provider}: </p> 
<p className='text-[0.9rem]'> {e.providerUid}</p>
</div>

</div>
))}
</div>

</div>

</div>
    </>
  ):(<Loading/>)
}

export default Profile