    
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom"
import Dataserv from "../appwrite/Data"
import { useDispatch } from "react-redux"
import { showtost } from "../store/Storeslice"
const Todocard = ({info, reference}) => {
    const navig = useNavigate()
    const disp = useDispatch()


    const gotodo = ()=>{
        navig(`/todo/${info.$id}`)
    }
    const deletetoso = async(id)=>{
      let dele = await Dataserv.deletetodo(id)
      if (dele) {
        disp(showtost({ "display": true, "mass": "deleted", icon: 'delete', bg: "bg-red-400", time: '1500' }))
      }
    }
const scrw = window.outerWidth


  return scrw>640? (
    <motion.div 
    dragConstraints={reference} drag dragTransition={{ bounceStiffness: 900, bounceDamping: 200 }} whileDrag={{scale:1.02}}
    className=" select-none bg-opacity-70 backdrop-blur-[2px] bg-black-400 border-[1px] border-white rounded p-1 opacity-100  overflow-hidden text-white w-[15rem] h-[15rem] bg-black relative ">
      
      <div className="flex justify-between">
    <h3 className=" w-[80%] overflow-hidden font-semibold text-neutral-400 whitespace-nowrap capitalize text-[1.1rem]">{info?.title}</h3>
    <div className="flex items-center">
    <span onClick={gotodo}  className="material-symbols-outlined text-[1.1rem] text-neutral-400 hover:text-neutral-200  cursor-pointer">open_jam</span>
    <span onClick={()=>deletetoso(info.$id)}  className="material-symbols-outlined text-[1.1rem] text-neutral-400 hover:text-neutral-200  cursor-pointer">delete</span>
    </div>
      </div>
    <p className="text-[0.7rem] text-justify">{info?.content}</p>
  </motion.div>
  ):(
    <div className=" select-none bg-opacity-70 backdrop-blur-[2px] bg-black-400 border-[1px] border-white rounded p-1 opacity-100  overflow-hidden text-white w-[15rem] h-[15rem] bg-black relative max-sm:w-[95%] max-sm:h-1/3">
      <div className="flex justify-between">
    <h3 className=" w-[80%] overflow-hidden font-semibold text-neutral-400 whitespace-nowrap capitalize text-[1.1rem]">{info?.title}</h3>
    <span onClick={gotodo}  className="material-symbols-outlined text-[1.1rem] text-neutral-400 hover:text-neutral-200  cursor-pointer">open_jam</span>
      </div>
    <p className="text-[0.7rem] text-justify">{info?.content}</p>
    </div>
  )
}

export default Todocard