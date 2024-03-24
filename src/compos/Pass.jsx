import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setvisualtartus } from '../store/Storeslice'

const Pass = () => {
  const [pass,setpass ] = useState("")
  const [ram,setram ] = useState("")
  const disp  = useDispatch()
  const passstatus = useSelector(state=>state.password.visual)

  const control = (e)=>{
    setpass(e.target.value)
    }

    useEffect(()=>{
      let refer= ""
      for (let index = 0; index < 3; index++) {
      let anynum = Math.floor(Math.random()*9)
      refer += anynum
    }
    setram(refer)
  },[])

  useEffect(()=>{
    let last = Number(pass[pass.length-1])
    let entrypass = `im${ram*last}${last}`
    entrypass == pass? disp(setvisualtartus(true)):null
  },[pass])
  
  
  return (
    <>
    <div className={` z-50 w-full h-[100%] flex justify-center items-center bg-[#0000009e]  backdrop-blur-[2px] flex-col text-white ${passstatus?"hidden":"absolute"} `}>
    <p className='font-mono'>{ram}</p>
    <input type="text" 
    className=' text-white w-[25rem] h-12 bg-transparent border-2 border-yellow-400 outline-none p-4 font-mono max-sm:w-[90%] max-sm:h-8'
    spellCheck="false"
    onChange={(e)=>control(e)}
    value={pass}
    />
    </div>
    </>
  )
}

export default Pass