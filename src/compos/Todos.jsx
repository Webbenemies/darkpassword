import { useEffect, useRef, useState } from "react"
import Dataserv from "../appwrite/Data"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loading from "./Loading"
import Todocard from "./Todocard"

const Todos = () => {
  const [formtitle, setformtitle] = useState("")
  const [loadlist, setloadlist] = useState("")
  const [arrtodos, setarrtodos] = useState([])
  const selet = useSelector(state => state.track)
  const navia = useNavigate()
  const refer = useRef(null)
  let todoinputref = useRef(null)
  
  const gettodos = async () => {
    let quries = selet.userdata.$id
    let todos = await Dataserv.alltodos(quries)
    if (todos) {
      setarrtodos(todos.documents)
    }
  }


  let handelsubmit = async () => {
    if (formtitle == "") return todoinputref.current.className = "border-2  border-red-400 rounded-sm"
    todoinputref.current.className = "border-2  border-white rounded-sm"
    try {
      let data = await Dataserv.createtodo({ 'title': formtitle, 'content': "", "colluserid": selet.userdata.$id })
      setformtitle("")
      if (data) {
        navia(`/todo/${data.$id}`)
      }
    } catch (error) {
      console.log('>>>>>>>>>>>', error)
    }
  }

  const unauther = () => {
    console.log('>>>>>>>>>>>', "unother")
  }

  const managesubmites = (e) => {
    e.preventDefault()
    if (selet.status) {
      handelsubmit()
    } else {
      unauther()
    }
  }

  const listmasfun = () => {
    selet.status ? (setloadlist("No todos created")) : (setloadlist("sign in to see todos"))
  }

  const arrangefun = ()=>{
    if (arrtodos.length !=0) {
      setloadlist("sorting...")
      setarrtodos([])
      gettodos()
    }else{
      setloadlist("No todos found")
    }
    
  }

  useEffect(() => {
    if (selet.status) gettodos()
    listmasfun()
  }, [])

  return (
    <>
      <div className=" h-full w-full flex items-center justify-between flex-col z-[2]">
        <div className=" select-none h-[20vh]  w-full flex flex-col items-center justify-center">
          <h2 className=" uppercase text-white font-semibold text-[3rem]">target</h2>

          <div className="flex items-center justify-between px-[5%] w-full">
            <div>
              <form ref={todoinputref} onSubmit={managesubmites} className=" border-2  border-white rounded-sm">
                <input className="w-[20rem] outline-none py-1 px-3 text-[0.9rem] border-0 bg-transparent backdrop-blur-sm text-white" spellCheck="false" type="text"
                  placeholder="set targets"
                  value={formtitle}
                  maxLength={50}
                  onChange={(e) => setformtitle(e.target.value)}
                />
                <button className="py-1 px-3 text-[0.9rem] uppercase outline-none text-white backdrop-blur-sm border-none hover:text-blue-200 " type="submit">add</button>
              </form>
            </div>

            <div className=" text-white text-[2rem] flex items-center justify-center ">
              <button className="flex items-center justify-center" onClick={arrangefun}><span className=" text-[1.1rem] p-2 rounded-full hover:bg-white hover:text-black material-symbols-outlined">grid_view</span></button>
            </div>

          </div>

        </div>

        <div className=" h-[80vh] w-full" ref={refer}>
          {arrtodos.length != 0 ? (
            <div style={{ scrollbarWidth: "none" }} className={`flex items-start flex-wrap justify-start gap-4 relative  px-10 py-6  w-full h-full  overflow-y-scroll `} >
              {arrtodos?.map((e) => (
                <Todocard key={e.$id} info={e} reference={refer} />
              ))}
            </div>
          ) : (<Loading mas={loadlist} />)}

        </div>
      </div>
    </>
  )
}

export default Todos