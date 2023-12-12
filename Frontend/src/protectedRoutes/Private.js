import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/userContext'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../component/Spinner'

function Private() {
    const [auth ] = useAuth()
    const [ok , setOk] = useState(false)

    const authCheck = async()=>{
       const {data} = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/auth/user-auth`, {
        headers : {
            Authorization : auth?.token
        }
       })
       if(data.ok){
        setOk(true)
       }else{
        setOk(false)
       }
    }
    useEffect(()=>{
       if(auth?.token) { authCheck()}
    },[auth?.token])
  return ok? <Outlet/>: <Spinner/>;
}

export default Private
