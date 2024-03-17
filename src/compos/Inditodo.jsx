import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Dataserv from '../appwrite/Data'
import { useState } from 'react'
import Loading from './Loading'
import { useDispatch } from 'react-redux'
import { showtost } from '../store/Storeslice'
import { motion } from 'framer-motion'



const Inditodo = () => {
    const [inditododata, setinditododata] = useState(null)
    const { slug } = useParams()
    const [discription, setdiscription] = useState("")
    const [act, setact] = useState(false)
    const [lastact, setlastact] = useState("")
    const [lastarget, setlastarget] = useState("")
    const [uploading, setuploading] = useState(false)
    const [editon, setediton] = useState(false)
    const navea = useNavigate()
    const textarref = useRef(null)
    const disp = useDispatch()

    const gettodofun = async () => {
        if (slug) {
            let data = await Dataserv.gettodo(slug)
            if (data) {
                setinditododata(data)
                setdiscription(data.content)
            }
        }
    }

    const savetodo = async () => {
        try {
            setuploading(true)
            let update = await Dataserv.updatetodo(inditododata.$id, { content: textarref.current.innerHTML })
            if (update) {
                disp(showtost({ "display": true, "mass": "saved", icon: 'done', bg: "bg-green-500", time: '1000' }))
                setuploading(false)
                setediton(false)
            }
        } catch (error) {
            setuploading(false)
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    const deletetodo = async () => {
        try {
            let delet = await Dataserv.deletetodo(inditododata.$id)
            if (delet) navea("/")
            disp(showtost({ "display": true, "mass": "deleted", icon: 'delete', bg: "bg-red-400", time: '1500' }))
        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error occurred", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }


    let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '{', '}', '[', ']', ';', ':', '<', '>', ',', '.', '?', '/', "Backspace", "Enter", " ", "'"]

    const handelclicks = (e) => {
        e.preventDefault()
        if (e.key) {
            let fi = arr.filter((r) => {
                return e.key == r
            })
            if (fi == "Backspace") {
                setdiscription(discription.slice(0, -1))
            } else if (fi == "Enter") {
                setdiscription(discription.concat(" <br> "))
            } else if (fi == " ") {
                setdiscription(discription.concat(" "))
            } else {
                setdiscription(discription.concat(fi))
            }
        }
    }

    useEffect(() => {
        if (textarref.current) {
            (textarref.current.innerHTML = discription)
        }
    }, [handelclicks])

    const toolbtns = (e) => {
        let tag = e.target.dataset.id
        let lastag = e.target
        let firstag = ""
        if (tag == "h2") {
            firstag = `<${tag} style="font-size: 2rem; color: white; text-transform: capitalize; text-align: center;">`
        }
        if (tag == "b") {
            firstag = `<${tag} style="font-weight: 900;" >`
        }
        if (tag == "h3") {
            firstag = `<${tag} style="font-size:1.5rem; padding-left:1rem;" >`
        }
        if (tag == "li") {
            firstag = `<${tag} style="list-style-type: disc; padding-left:0.7rem;" >`
        }

        if (act) {
            if (lastact == tag) {
                lastarget.style.background = 'transparent'
                lastarget.style.color = 'white'
                setdiscription(discription + `</${tag}>`)
                setlastact(tag)
                setlastarget(lastag)
                setact(false)
            } else {
                setdiscription(discription + `</${lastact}> ${firstag}`)
                lastarget.style.background = 'transparent'
                lastarget.style.color = 'white'
                lastag.style.background = 'white'
                lastag.style.color = 'black'
                setlastarget(lastag)
                setlastact(tag)
                setact(true)
            }
        } else {
            lastag.style.background = 'white'
            lastag.style.color = 'black'
            setdiscription(discription + `${firstag}`)
            setlastact(tag)
            setlastarget(lastag)
            setact(true)
        }

    }

    const subtool = (e) => {
        let tag = e.target.dataset.id
        if (tag == "past") {
            navigator.clipboard.readText().then((e) => {
                if (e != "") {
                    setdiscription(discription + ` ${e}`)
                    disp(showtost({ "display": true, "mass": "paste", icon: 'content_paste', bg: "bg-green-500", time: '800' }))
                } else {
                    disp(showtost({ "display": true, "mass": "No Clipboards", icon: 'priority_high', bg: "bg-red-500", time: '900' }))
                }
            })
        }

    }

    useEffect(() => {
        gettodofun()
    }, [])


    return inditododata ? (
        <div className='w-full h-[100vh] bg-neutral-900 relative flex items-center justify-center z-[2] max-sm:flex-col-reverse max-sm:gap-2 '>
            <div className='w-[80%] max-sm:w-full'>
                <div className="rounded p-4 relative opacity-100 backdrop-blur-sm  text-white   flex items-center justify-center flex-col border-2 border-purple-500 max-sm:p-2 max-sm:bottom-1">
                    <h1 className=" text-neutral-800 text-[10rem] uppercase absolute font-semibold z-[-1] opacity-60 max-sm:text-[20vw]">Target.</h1>
                    <div className='flex justify-between w-[85%] p-2 max-sm:w-[100%]'>
                        <h3 className=" capitalize text-[1.4rem] font-semibold w-[60%] overflow-y-scroll max-sm:text-[0.9rem]" style={{ scrollbarWidth: "none" }}>{inditododata?.title}</h3>

                        <div className='flex justify-between w-[35%]'>
                            <div className='flex gap-2 select-none max-sm:items-center'>
                                {window.outerWidth <= 640?(
                                    <>
                                    <button onClick={savetodo} className=" flex items-center justify-center rounded-full max-sm:bg-white max-sm:text-black">{uploading ? (<motion.span
                                        animate={{
                                            rotate: [0, 180, 360]   
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            times: [0, 0.5]
                                        }}
                                        className=" text-[0.8rem] p-1  rounded-full material-symbols-outlined  ">progress_activity</motion.span>) : (<span className="text-[0.8rem] p-1 rounded-full material-symbols-outlined  ">beenhere</span>)
                                    }</button>
                                    <button onClick={deletetodo} className=" flex items-center justify-center rounded-full max-sm:bg-white max-sm:text-black"><span className={`border-[1px] text-[0.8rem] p-1 rounded-full material-symbols-outlined  `}>delete</span></button>
                                    </>
                                ):(
                                    <>
                                    <button onClick={savetodo} className='capitalize text-white font-semibold bg-green-500 rounded-md px-4 py-0 whitespace-nowrap'>save
                                    {uploading ? (<motion.span
                                        animate={{
                                            rotate: [0, 180, 360]   
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            times: [0, 0.5]
                                        }}
                                        className="material-symbols-outlined align-middle symbols-defult rounded-full">progress_activity</motion.span>) : (<span className="material-symbols-outlined align-middle symbols-defult ">beenhere</span>)
                                    }
                                    </button>
                                    <button onClick={deletetodo} className='capitalize text-white font-semibold bg-red-500 rounded-md px-4 py-0 whitespace-nowrap  '>delete <span className="material-symbols-outlined symbols-defult align-middle">delete</span> </button>
                                    </>
                                    )}
                                    
                            </div>

                            <div className="editbtns">
                                <button className=" flex items-center justify-center hover:bg-white hover:text-black rounded-full max-sm:bg-white max-sm:text-black"><span onClick={() => setediton(!editon)} className={`border-[1px] text-[1.1rem] p-2 rounded-full material-symbols-outlined max-sm:text-[1.1rem] max-sm:p-1 `}>edit</span></button>
                            </div>
                        </div>

                    </div>

                    <div className="h-[70vh] w-[90%] relative max-sm:w-[99%] max-sm:h-[75vh] ">
                        <div ref={textarref} onKeyDown={handelclicks} style={{ scrollbarWidth: 'none', caretColor: "transparent" }} spellCheck="false" data-value={discription} contentEditable={editon} className='  text-[1rem] z-[2] bg-transparent text-white poppins-regular  border-0 outline-0 overflow-scroll  resize-none absolute w-full h-full top-0 left-0'></div>
                    </div>
                </div>
            </div>

            {editon ? (<div className='edit w-[10%]  max-sm:w-full'>
                <div className=" select-none  text-white text-[2rem] flex flex-col items-center justify-center gap-3 max-sm:flex-row ">
                    <button className=" flex items-center justify-center hover:bg-neutral-400 hover:text-white rounded-full"><span onClick={toolbtns} data-id='b' className={`border-[1px] text-[1.1rem] p-2 rounded-full material-symbols-outlined  `}>format_bold</span></button>

                    <button className=" flex items-center justify-center hover:bg-neutral-400 hover:text-white rounded-full"><span onClick={toolbtns} data-id='h2' className={`border-[1px] text-[1.1rem] p-2 rounded-full  material-symbols-outlined  `}>subheader</span></button>

                    <button className=" flex items-center justify-center hover:bg-neutral-400 hover:text-white rounded-full"><span onClick={toolbtns} data-id='h3' className={` border-[1px] text-[1.1rem] p-2 rounded-full  material-symbols-outlined `}>keyboard_capslock_badge</span></button>

                    <button className=" flex items-center justify-center hover:bg-neutral-400 hover:text-white rounded-full"><span onClick={toolbtns} data-id='li' className={` border-[1px] text-[1.1rem] p-2 rounded-full  material-symbols-outlined `}>list</span></button>

                    <button className="flex items-center justify-center hover:bg-neutral-400 hover:text-white rounded-full"><span onClick={subtool} data-id='past' className={` border-[1px] text-[1.1rem] p-2 rounded-full  material-symbols-outlined `}>content_paste</span></button>

                </div>
            </div>) : null}

        </div>
    ) : (<Loading />)
}

export default Inditodo