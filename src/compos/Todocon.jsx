import Todos from "./Todos"
import Pass from "./Pass"
const Todocon = () => {

  return (
    <>
    {/* <Pass/> */}
    <div className={`w-[100%] h-[100vh] bg-black relative`}>
      <div className="w-full h-full flex justify-center absolute  items-center">
        <Todos/>  
      <h1 className=" text-gray-400 text-[10rem] uppercase absolute font-semibold z-[1] opacity-60">Target.</h1>
      </div>
    </div>
    </>
  )
}

export default Todocon