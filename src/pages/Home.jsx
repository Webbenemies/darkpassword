import { useSelector } from 'react-redux'
import Hearder from '../compos/Hearder'
import Todocon from '../compos/Todocon'
import Ultralink from '../compos/Ultralink'
const Home = () => {
  const autharized = useSelector(state=>state.track.status)
  return autharized?(
    <>
    <Hearder/>
    <Ultralink/>
    <Todocon/>
    </>
  ):(<Hearder/>)
  
}

export default Home