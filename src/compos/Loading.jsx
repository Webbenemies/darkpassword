import React from 'react'

const Loading = ({mas}) => {
  console.log("mas",mas);
  return (
    <div className='w-full h-full flex items-center justify-center text-white'>
      <p className=' py-2 px-5 blur-background rounded-md'>
        {navigator.onLine?(mas?mas:"LODAING..."):("OFLLINE...")}
        </p>
    </div>
  )
}

export default Loading