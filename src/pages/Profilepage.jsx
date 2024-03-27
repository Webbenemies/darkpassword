import Profhead from '../compos/Profhead'
import Profnavbar from '../compos/Profnavbar'
import { Outlet } from 'react-router-dom'

const Profilepage = () => {
  return (
    <>
        <Profnavbar/>
        <Profhead/>
        <Outlet/>
    </>
  )
}

export default Profilepage