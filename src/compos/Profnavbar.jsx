import {NavLink } from 'react-router-dom'

function Profnavbar() {
  return (
    <div className=' bg-neutral-900 w-full h-11 flex px-16 items-center gap-3'>
        <NavLink  className={({isActive})=>`${isActive?"bg-neutral-800/80":null} flex justify-center items-center py-1 px-3 hover:bg-neutral-700/80 rounded-md text-[0.9rem] `} to={"/account"}>overview</NavLink>
        {/* <NavLink  className={({isActive})=>`${isActive?"bg-neutral-800/80":null} flex justify-center items-center py-1 px-3 hover:bg-neutral-700/80 rounded-md text-[0.9rem] `} to={"/account/password"}>password</NavLink> */}
    </div>
  )
}

export default Profnavbar