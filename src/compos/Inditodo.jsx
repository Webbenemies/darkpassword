import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Dataserv from '../appwrite/Data'
import { useState } from 'react'
import Loading from './Loading'



const Inditodo = () => {
    const [inditododata, setinditododata] = useState(null)
    const { slug } = useParams()
    const [discription, setdiscription] = useState("")
    const navea = useNavigate()

    const gettodofun = async () => {
        if (slug) {
            let data = await Dataserv.gettodo(slug)
            if (data) {
                setinditododata(data)
                setdiscription(data.content)
            }
        }
    }


    const savetodo = async()=>{
        let update = await Dataserv.updatetodo(inditododata.$id, {content: discription})
        if(update) console.log("save");
    }

    const deletetodo = async ()=>{
        let delet = await Dataserv.deletetodo(inditododata.$id) 
        if (delet) navea("/") 
    }

    useEffect(() => {
        gettodofun()
    }, [])
    return inditododata? (

        <div className='w-full h-[100vh] bg-neutral-900 relative flex items-center justify-center z-[2] '>
            <h1 className=" text-neutral-800 text-[10rem] uppercase absolute font-semibold z-[-1] opacity-60">Target.</h1>
            <div className="rounded p-4 relative opacity-100 backdrop-blur-sm  text-white  flex items-center justify-center flex-col w-[80%] border-2 border-purple-500">
                <div className='flex justify-between w-[80%] p-2'>
                <h3 className=" capitalize text-[1.4rem] font-semibold w-[60%] overflow-y-scroll" style={{scrollbarWidth:"none"}}>{inditododata?.title}</h3>
                <div className='flex gap-2'>
                <button onClick={savetodo} className=' capitalize text-white font-semibold bg-green-500 rounded-md px-4 py-0 whitespace-nowrap'>save <span className="material-symbols-outlined align-middle symbols-defult ">beenhere</span></button>
                <button onClick={deletetodo} className='capitalize text-white font-semibold bg-red-500 rounded-md px-4 py-0 whitespace-nowrap  '>delete <span className="material-symbols-outlined symbols-defult align-middle">delete</span> </button>
                </div>

                </div>

                <textarea style={{scrollbarWidth:"none"}} spellCheck="false" className=' selection:text-purple-400 resize-none rounded h-[70vh] w-[90%] px-1 py-2 border-orange-500 outline-none bg-transparent text-white' onChange={(e)=>setdiscription(e.target.value)} rows="10" value={discription}>{discription}</textarea>
            </div>
        </div>
    ):(<Loading/>)
}

export default Inditodo