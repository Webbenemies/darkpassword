import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Bucket from '../appwrite/Storage'
import Loading from './Loading'
import Dataserv from '../appwrite/Data'
import { useDispatch } from 'react-redux'
import { showtost } from '../store/Storeslice'
const Pdfpriview = () => {
    const navia = useNavigate()
    const { pdfid } = useParams()
    const [url, seturl] = useState(null)
    const disp = useDispatch()


    const priview = async () => {
        try {
            let pri = await Bucket.FileView(pdfid)
            if (pri) {
                seturl(pri)
            }
        } catch (error) {
            disp(showtost({"display":true, "mass":"an error occurred", icon:'error', bg:"bg-red-500", time:'900'})) 
        }
    }

    const deletepdf = async ()=>{
        let dele = await Bucket.deletfile(pdfid)
        let ultra = await Dataserv.getultra(pdfid)
        let ultradelet = await Dataserv.deleteaultra(ultra.$id)
        if (dele && ultra && ultradelet){ 
            navia("/")
            disp(showtost({"display":true, "mass":"file deleted", icon:'delete', bg:"bg-red-500", time:'900'})) 
        }
    }

    useEffect(() => {
        priview()
    }, [pdfid])

    return url != null ? (
        <div className={`w-[100%] h-[100vh] bg-cover bg-center relative pb-4 bg-black `}>
            <div className='w-full py-3 flex items-center justify-center  flex-col'>
                <div className='w-full flex items-center justify-end px-3'>
                <button onClick={deletepdf} className='capitalize text-white font-semibold bg-red-500 rounded-md px-4 py-1 whitespace-nowrap  '>delete <span className="material-symbols-outlined symbols-defult align-middle">delete</span></button>
                </div>
            </div>
                <div className=' w-[100%] h-[100vh]'>
                <embed src={url} frameBorder="0" className=' w-full h-full'></embed>
                </div>
        </div>
    ) : <Loading />

}

export default Pdfpriview