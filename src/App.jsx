import { useEffect, useState } from "react"

import Auth from "./appwrite/Auth"
import { useDispatch } from "react-redux"
import { storelogin, storelogout } from "./store/Storeslice"
import { Outlet } from "react-router-dom"
import Navbar from "./compos/Navbar"
import Noty from "./compos/Noty"
function App() {

  let disp = useDispatch()
  const [loding, setloding] = useState(true)

  useEffect(()=>{
    Auth.getcurrentacc().then((e)=>{
      if (e) {
        disp(storelogin(e))
      } else {
        disp(storelogout())
      }
    })
    .finally(()=> setloding(false))
  },[])


   return loding?(<p>loading</p>):( 
   <>
   <Navbar/>
   <Noty/>
   <Outlet/>
  </>
    
    )
}


export default App
