import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Bucket from '../appwrite/Storage'
import Loading from './Loading'
import Dataserv from '../appwrite/Data'
const Pdfpriview = () => {
    const navia = useNavigate()
    const { pdfid } = useParams()
    const [url, seturl] = useState(null)


    const priview = async () => {
        let pri = await Bucket.FileView(pdfid)
        if (pri) {
            seturl(pri)
        }
    }

    const deletepdf = async ()=>{
        let dele = await Bucket.deletfile(pdfid)
        let ultra = await Dataserv.getultra(pdfid)
        let ultradelet = await Dataserv.deleteaultra(ultra.$id)
        if (dele && ultra && ultradelet){ 
            navia("/")
        }
    }

    useEffect(() => {
        priview()
    }, [pdfid])

    return url != null ? (
        <div className={`w-[100%] h-[100vh] bg-cover bg-center relative pb-4 bg-black `}
        style={{ backgroundImage: `url(${url}) ` }}>
            <div className='w-full h-full flex items-center justify-center  flex-col gap-20'>
                <div className='w-full flex items-center justify-end px-3'>
                <button onClick={deletepdf} className='capitalize text-white font-semibold bg-red-500 rounded-md px-4 py-1 whitespace-nowrap  '>delete <span className="material-symbols-outlined symbols-defult align-middle">delete</span></button>
                </div>
                <iframe src={url} frameBorder="0" className=' w-[90%] h-[90vh]'></iframe>
            </div>
        </div>
    ) : <Loading />

}

export default Pdfpriview