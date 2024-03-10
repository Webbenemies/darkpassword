    
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom"
const Todocard = ({info, reference}) => {
    const navig = useNavigate()
    const gotodo = ()=>{
        navig(`/todo/${info.$id}`)
    }



  return (
    <motion.div 
    dragConstraints={reference} drag dragTransition={{ bounceStiffness: 900, bounceDamping: 200 }} whileDrag={{scale:1.02}}
    className=" select-none bg-opacity-70 backdrop-blur-[2px] bg-black-400 border-[1px] border-white rounded p-1 opacity-100  overflow-hidden text-white w-[15rem] h-[15rem] bg-black relative max-sm:w-1/3 max-sm:h-1/3">
      
      <div className="flex justify-between">
    <h3 className=" w-[80%] overflow-hidden font-semibold text-neutral-400 whitespace-nowrap capitalize text-[1.1rem]">{info?.title}</h3>
    <span onClick={gotodo}  className="material-symbols-outlined text-[1.1rem] text-neutral-400 hover:text-neutral-200  cursor-pointer">open_jam</span>
      </div>
    <p className="text-[0.7rem] text-justify">password</p>
    
  </motion.div>
  )
}

export default Todocard