import { useState } from "react"
import { useDispatch } from "react-redux"
import { toggleultra } from "../store/Storeslice"
import { useEffect } from "react"

const Ultrabox = ({classname=""}) => {
  const [name, setname] = useState("")
  const [url, seturl] = useState("")
  const [storecon, setstorecon] = useState([])
  const disp = useDispatch()

  useEffect(()=>{
    const ultratagoflocal =  localStorage.getItem("ultratag")
    ultratagoflocal?(setstorecon(JSON.parse(ultratagoflocal))):null
  },[])

  const controle = (e)=>{
    e.preventDefault()
    if (name == "" || url == "") return disp(toggleultra())
    let obj = {"name":name, "url":url}
    storecon.push(obj)
    localStorage.setItem("ultratag",JSON.stringify(storecon))
    console.log(storecon);
    disp(toggleultra())
  }

  return (
    <div className={` bg-stone-900 text-white p-3 opacity-65 backdrop-blur-sm ${classname}`}>
      <form onSubmit={controle}>
    <input type="text" 
    className=' text-white w-[90%] h-[2rem] rounded bg-transparent border-2 border-yellow-400 outline-none p-2 font-mono '
    spellCheck="false"
    placeholder="Name"
    value={name}
    onChange={(e)=>setname(e.target.value)}
    />
    <input type="text" 
    className=' text-white w-[90%] h-[2rem] rounded bg-transparent border-2 border-yellow-400 outline-none p-2 font-mono '
    spellCheck="false"
    placeholder="Url"
    value={url}
    onChange={(e)=>seturl(e.target.value)}
    />
    <button type="submit" className=" w-[30%] text-white text-[0.7rem] border-2 rounded-xl border-yellow-400 font-semibold py-1 px-4 uppercase bg-black">add+</button>
    </form>
    </div>
  )
}

export default Ultrabox