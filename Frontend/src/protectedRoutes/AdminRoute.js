import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/userContext'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../component/Spinner'

function AdminRoute() {
    const [ok , setOk] = useState(false)
    const [auth ] = useAuth()

    const authcheck = async()=> {
        const {data} = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/auth/admin-auth`,{
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
        if(auth?.token){
            authcheck()
        }
    },[ auth?.token])
  return ok ? <Outlet/> : <Spinner />
}

export default AdminRoute
