import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/userContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  const location = useLocation()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`https://vercel-api-deployment.vercel.app/api/v1/auth/login`, { email, password })
      if (data.success) {
        console.log(data.message)
        setAuth({
          ...auth,
          user: data.user,
          token: data.token
        })
        //     toast.success(res.data.message)
        localStorage.setItem('auth', JSON.stringify(data))
        navigate(location.state || '/')
      } else {
        console.log(data.message)
      }

    } catch (error) {
      console.log('something went wrong')
    }
  }
  return (
    <>
     

      <div className = "container-fluid">
      <div className='row d-flex justify-content-center'>
        <div className = "col-md-5">
        <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="email" className="form-control" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email address' onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" value={password} id="exampleInputPassword1" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className='btn btn-primary cartDetailBTN' >Log In</button>
      </form>
        </div>
        </div>
        </div>
    </>
  )
}

export default Login
