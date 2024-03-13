import { useNavigate, useSearchParams } from 'react-router-dom'
import Auth from '../appwrite/Auth'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { showtost } from '../store/Storeslice'

const Varify = () => {
    const [params] = useSearchParams() 
    const paramid = params.get('userId')
    const paramsecret = params.get('secret')
    const disp = useDispatch()
    const navig = useNavigate()

    const vafrfyfun = async()=>{
        try {
            let vari = await Auth.emailsecret({'id':paramid,'secret':paramsecret})
            if (vari) {
                navig("/account")
                disp(showtost({"display":true, "mass":"account secure and verified", icon:'verified_user', bg:"bg-green-500", time:'1500'}))
            }
        } catch (error) {
            navig("/account")
            disp(showtost({"display":true, "mass":"an error occurred", icon:'error', bg:"bg-red-500", time:'2500'}))
        }
            
    }
        vafrfyfun()
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <motion.div
        animate={{
            rotate:[0,180,360]
        }}
        transition={{
            repeat:Infinity,
            times:[0,0.5]
        }}
        >
        <span className="material-symbols-outlined">progress_activity</span>
        </motion.div>
    </div>
  )
}

export default Varify