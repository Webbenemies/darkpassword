import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
  let selet= useSelector(state=>state.track.status)


  return (
    <>
    <div className={ `bg-black text-white z-10 h-14 flex  items-center  justify-between px-[5%]`}>
      <Link to={"/"}>
        <h1 className='text-[1.5rem] uppercase font-[600] font-mono tracking-[6px] select-none'>create your world</h1>
      </Link>
        {!selet?(
          <div className=' flex gap-6 '>
          <p className=' text-[0.9rem] hover:text-blue-300 '><Link to={"/login"} className='flex items-center'><span className="material-symbols-outlined">login</span>login</Link></p>
          <p className=' text-[0.9rem] text-white'><Link to={"/signup"} className=' rounded-md bg-blue-600 py-1 px-3'>signup</Link></p>
          </div>
        ):(<Link to={"/account"}><span className={` hover:text-neutral-200 text-[1.9rem] rounded-full  material-symbols-outlined `}>account_circle</span></Link>)}
    </div>
    </>
  )
}

export default Navbar