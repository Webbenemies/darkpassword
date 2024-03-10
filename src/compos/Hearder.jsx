import { useEffect, useState } from 'react'
import Bg from './Bg'
const Hearder = () => {
  const [hightis, sethightis] = useState("")
  // 87vh
  useEffect(()=>{
    if (window.outerWidth <= "640") {
      sethightis("40vh")
    }else{
      sethightis("84vh")
    }
  },[])
  return (
    <>
    <Bg hight={hightis}/>
      </>
  )
}

export default Hearder