import React, { useState } from 'react'

const Time = () => {
const [color, setcolor] = useState(true)
    const tomeis = (()=>{
        let t = new Date()
        let munth = t.toDateString()
        return munth
    })()

  return (
    <>
    <div className=' w-full flex items-center justify-end'>
    <time onClick={()=>setcolor(!color)} className={` max-sm:text-[1rem] select-none poppins-regular  uppercase font-[600] text-[2rem] p-2 ${color?"text-neutral-300":"text-neutral-700"}`}
    >{tomeis}</time>
    </div>
    </>
  )
}

export default Time