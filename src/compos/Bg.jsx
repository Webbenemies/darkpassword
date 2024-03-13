import { useEffect, useState } from "react"
import bginde from "../assets/bginde"
import Time from "./Time"
const Bg = ({hight}) => {

  const [url, seturl] = useState("")
  useEffect(()=>{
      let lenth = bginde.length
      let randomnum = Math.floor(Math.random()*lenth)
      seturl(bginde[randomnum])
  },[])


  return (
    <>
    <div className={`w-[100%] bg-cover bg-center relative`}
    style={{height:`${hight}`,backgroundImage:`url(${url}) `}}
    >
      <Time/>
      <h2 className=" text-center capitalize text-[2rem] font-semibold bg-neutral-950  text-slate-300 select-none ">{navigator.onLine?null:"you are offline"}</h2>
    </div>
    </>
  )
}

export default Bg