import React from 'react'

const Time = () => {

    const tomeis = (()=>{
        let t = new Date()
        let munth = t.toDateString()
        return munth
    })()

  return (
    <>
    <div className=' w-full flex items-center justify-end'>
    <time className=' text-neutral-300 selection:text-neutral-700  uppercase font-[600] text-[2rem] p-2 '
    style={{fontFamily:"cursive"}}
    >{tomeis}</time>
    </div>
    </>
  )
}

export default Time