import React from 'react'

const Loading = ({mas}) => {
  return (
    <div className='w-full h-full flex items-center justify-center text-white'>
      <p className=' py-2 px-5 blur-background rounded-md'>
        {navigator.onLine?(mas?mas:"LOADING..."):("OFLLINE...")}
        </p>
    </div>
  )
}

export default Loading