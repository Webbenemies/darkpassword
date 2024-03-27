
import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Dataserv from '../appwrite/Data'
import Loading from './Loading'
import { useDispatch } from 'react-redux'
import { showtost } from '../store/Storeslice'
import { usecretecode } from '../hooks/usedecode'
import { decodetoplain } from '../hooks/usecodetoplain'
import { textformater } from '../hooks/usetexteff'

const Inditodo2 = () => {
    const { slug } = useParams()
    const disp = useDispatch()
    const nevi = useNavigate()
    const [fetchedata, setfetchedata] = useState(null)
    const [areavalue, setareavalue] = useState('')
    const [toggledit, settoggledit] = useState(true)
    const [letters, setletters] = useState()
    const arearef = useRef(null)

    const fetchtodo = async () => {
        try {
            const data = await Dataserv.gettodo(slug)
            if (data) {
                setfetchedata(data)
                let darkcomp = decodetoplain(data.content, data.code)
                let formatedtext = textformater(data.content)
                setareavalue(darkcomp)
            }
        } catch (error) {
            console.log(error);
            nevi("/")
            disp(showtost({ "display": true, "mass": "page not found", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    const savetarget = async () => {
        try {
            if (letters>50000) {
                disp(showtost({ "display": true, "mass": "content overloaded", icon: 'full_stacked_bar_chart', bg: "bg-red-500", time: '1000' }))
            }else{
                const dd = await usecretecode(areavalue, slug)
                const savedata = await Dataserv.updatetodo(fetchedata.$id, { content: dd })
                if (savedata) {
                    settoggledit(true)
                    disp(showtost({ "display": true, "mass": "saved", icon: 'done', bg: "bg-green-500", time: '1000' }))
                }
            }
        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    const deletetodo = async () => {
        try {
            const deletetarget = await Dataserv.deletetodo(fetchedata.$id)
            if (deletetarget) {
                nevi("/")
                disp(showtost({ "display": true, "mass": "deleted", icon: 'delete', bg: "bg-red-400", time: '1500' }))
            }
        } catch (error) {
            disp(showtost({ "display": true, "mass": "an error accourd", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    useEffect(() => {
        fetchtodo()
    }, [slug])

    useEffect(()=>{
        let len = Array.from(areavalue)
        let truelen = len.length
        setletters(truelen)
    },[areavalue])



    return fetchedata ? (
        <>
            <div className=' p-4 w-[95%] mx-auto max-sm:p-2 max-sm:text-left'>
                <h1 className=' text-neutral-300 font-semibold tracking-[2px] text-[2rem] max-sm:text-[1.7rem]'>{fetchedata.title}</h1>
            </div>
            <div className=' w-[100%] h-screen flex items-center justify-center poppins-regular'>
                <div className=' flex justify-between items-center w-[90%] h-[90vh]  max-sm:w-full max-sm:flex-col-reverse max-sm:gap-4'>
                    <div className=' w-[90%] h-[100%] flex flex-col  max-sm:w-[95%]'>
                            <p className=' self-end text-[0.6rem] p-1'>{letters} / 50000</p>
                        <div className=' h-full overflow-hidden flex items-center justify-center'>
                            <h1 className="absolute select-none text-neutral-800 text-[10rem] uppercase  font-semibold z-[-1] opacity-60 max-sm:text-[20vw]">Target.</h1>
                            <textarea style={{scrollbarWidth:"none"}} ref={arearef} value={areavalue} readOnly={toggledit} onChange={(e) => setareavalue(e.target.value)} autoFocus={!toggledit} className=' text-[1rem] w-[100%] bg-transparent selection:text-amber-500 resize-none border-2 px-2 py-3 outline-none self-stretch max-sm:text-[0.8rem] max-sm:border-0' spellCheck="false" name="editor"></textarea>
                        </div>
                    </div>

                    <div className='w-[5%] flex flex-col justify-center items-center gap-4 max-sm:flex-row'>
                        <button onClick={() => settoggledit(!toggledit)}><span className={`p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100  max-sm:hover: ${!toggledit ? "bg-neutral-100 text-neutral-800" : null}`}>edit</span></button>
                        <button onClick={savetarget}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>save</span></button>
                        <button onClick={deletetodo}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 max-sm:hover:bg-transparent max-sm:hover:text-white max-sm:active:bg-neutral-100 max-sm:active:text-neutral-900'>delete</span></button>
                    </div>
                </div>
            </div>
        </>
    ) : (<Loading />)
}

export default Inditodo2