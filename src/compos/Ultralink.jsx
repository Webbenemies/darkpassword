import { useEffect, useState } from "react"
import Bucket from "../appwrite/Storage"
import {Link} from "react-router-dom"
import Dataserv  from "../appwrite/Data.js"
import {useSelector} from "react-redux"

  const Ultralink = () => {
  const [tagarr, settagarr] = useState([])
  const [run, setrun] = useState(false)
  const [load, setload] = useState(false)
  const [masgg, setmasgg] = useState("fetch...")
  const selet = useSelector(state=>state.track.userdata)


  const uploadpdf= async(e)=>{
    setload(true)
    setmasgg("uploading...")
    let file = e.target.files[0]
    let uplo = await Bucket.uploadfile(file)
   if (uplo) {
    let baseupload =  await Dataserv.createultratag({'ultraname':uplo.name, 'ulteruserid':selet.$id, "ultratagfileid":uplo.$id})
     if (baseupload) {
      setrun(!run)
     }
   }
  }

  const listpdfs = async()=>{
    setload(true)
    console.log(selet.$id)
    let urls = await Dataserv.allultratags(selet.$id)
    if (urls) {
      setload(false)
      settagarr(urls.documents)
      console.log("urls",urls);
    }

  }

  useEffect(()=>{
   listpdfs()
  },[run])


  return (
    <>
    <div className='bg-black relative flex items-center justify-between px-[3%] h-14 text-white overflow-x-scroll no-scrollbar border-b-[1px]'>

   {load?(<div className=" w-full h-full bg-black absolute opacity-80 flex items-center justify-center"><span className="material-symbols-outlined">cloud_upload</span> {masgg}</div>):null}

        <div className="">
          <input type="file" name="" accept=".pdf" onChange={uploadpdf} id="fileupload" className=" hidden" />
          <label htmlFor="fileupload" className="border-2 rounded-xl border-yellow-400 px-5 py-1 text-[0.7rem] uppercase font-semibold">add+</label>
        </div>
        <div className="links overflow-x-scroll no-scrollbar whitespace-nowrap flex items-center gap-2 px-8">
          {tagarr?.map((e)=>(
            <Link className=" px-1 text-[0.7rem] text-stone-300 hover:text-white " key={e.ultratagfileid} to={`/pdf/${e.ultratagfileid}`}>{e.ultraname}</Link>
          ))}
        </div>
    </div>
    </>
  )
}

export default Ultralink