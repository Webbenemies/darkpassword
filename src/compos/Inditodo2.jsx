
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Dataserv from '../appwrite/Data'
import Loading from './Loading'
import { useDispatch } from 'react-redux'
import { showtost } from '../store/Storeslice'

const Inditodo2 = () => {
    const { slug } = useParams()
    const disp = useDispatch()
    const nevi = useNavigate()
    const [fetchedata, setfetchedata] = useState(null)
    const [areavalue, setareavalue] = useState('')
    const [toggledit, settoggledit] = useState(true)

    let arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9',' ']

    const createciper = async(plaintext)=>{
        let ciphertext = '';
        let ramdom = Number(Math.round((Math.random()*15)+5))
        const setramdom = await Dataserv.updatetodo(fetchedata.$id, { code: ramdom })
        if (setramdom) {
            let arrvalue = Array.from(plaintext)
        arrvalue.map((e)=>{
          if (arr.includes(e)) {
              let num = arr.indexOf(e)+ramdom
              if (num < arr.length) {
                ciphertext += arr[num];

            }
            if (num >= arr.length) {
                num = num % arr.length
                ciphertext += arr[num];
                
            }
        }else{
            ciphertext += e;
        }
    })
    console.log('>>>>>>>>>chipertextfun>>', ciphertext)
    return ciphertext
}
    }


    const descript = (chipercontent, code)=>{
        let descriptext = ''
        let arrvalue = Array.from(chipercontent)

        arrvalue.map((e)=>{
            let num = arr.indexOf(e)-code
          if (arr.includes(e)) {
              if (num < arr.length && num >= 0) {
                descriptext +=arr[num]
              }
             else if (num < 0) {
                  num = num + arr.length
                  descriptext+=arr[num]
              }
          }else{
              descriptext+= e
          }
        })
        console.log('>>>>>chipertext>>>>>>', descriptext)
        return descriptext
    }
  

    const fetchtodo = async () => {
        try {
            const data = await Dataserv.gettodo(slug)
            if (data) {
                setfetchedata(data)
                let darkcomp = descript(data.content, data.code)
                setareavalue(darkcomp)
                console.log('data = ', data);
            }
        } catch (error) {
            nevi("/")
            disp(showtost({ "display": true, "mass": "page not found", icon: 'error', bg: "bg-red-400", time: '1500' }))
        }
    }

    const savetarget = async () => {
        try {
            const ciphertext = await createciper(areavalue);
            console.log('Ciphertext:', ciphertext);
            
            const savedata = await Dataserv.updatetodo(fetchedata.$id, { content: ciphertext })
            if (savedata) {
                settoggledit(true)
                disp(showtost({ "display": true, "mass": "saved", icon: 'done', bg: "bg-green-500", time: '1000' }))
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

    return fetchedata ? (
        <>
            <div className=' p-4 w-[95%] mx-auto'>
                <h1 className=' text-neutral-300 font-semibold tracking-[2px] text-[2rem]'>{fetchedata.title}</h1>
            </div>
            <div className=' w-[100%] h-screen flex items-center justify-center poppins-regular'>
                <div className=' flex justify-between items-center w-[90%] h-[90vh]  max-sm:w-full max-sm:flex-col-reverse max-sm:gap-4'>
                    <div className=' w-[90%] h-[100%] flex flex-col  max-sm:w-[95%]'>
                        <div className=' h-full overflow-hidden flex items-center justify-center'>
                            <h1 className="absolute  text-neutral-800 text-[10rem] uppercase  font-semibold z-[-1] opacity-60 max-sm:text-[20vw]">Target.</h1>
                            <textarea value={areavalue} readOnly={toggledit} onChange={(e) => setareavalue(e.target.value)} className=' w-[100%] bg-transparent selection:text-amber-500 resize-none border-2 px-2 py-3 outline-none self-stretch max-sm:border-0' spellCheck="false" name="editor"></textarea>
                        </div>
                    </div>

                    <div className='w-[5%] flex flex-col justify-center items-center gap-4 max-sm:flex-row'>
                        <button onClick={() => settoggledit(!toggledit)}><span className={`p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100 ${!toggledit ? "bg-neutral-100 text-neutral-800" : null}`}>edit</span></button>
                        <button onClick={savetarget}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100'>save</span></button>
                        <button onClick={deletetodo}><span className='p-1 border-[2px] rounded-full text-[1.2rem] text-neutral-100 material-symbols-outlined hover:text-neutral-800 hover:bg-neutral-100'>delete</span></button>
                    </div>
                </div>
            </div>
        </>
    ) : (<Loading />)
}

export default Inditodo2