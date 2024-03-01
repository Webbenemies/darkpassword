import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Authlayout = ({authencation = true, child}) => {
    const userstatus = useSelector(state=> state.track.status)
    const navigate = useNavigate()
    const [load, setload] = useState(true)
    useEffect(()=>{
        if (authencation && userstatus !== authencation) {
            console.log('>>>>>>>>>>>', "first")
            navigate("/signup")
        }else if (!authencation && userstatus !== authencation) {
            console.log('>>>>>>>>>>>', "second")
            navigate("/")
        }
        setload(false)
    },[authencation, navigate, userstatus])

  return load?(<p>load of Authlayout</p>):<>{child}</>
}

export default Authlayout