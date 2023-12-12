import React, { useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/userContext'
import { message } from 'antd'

function Profile() {
  const [auth , setAuth] = useAuth()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault()
    try {
const {data} =await axios.put(`https://vercel-api-deployment.vercel.app/api/v1/auth/profile` , {name , email , address , phone,password, USERid:auth?.user?._id })

  setAuth({...auth , user : data?.updatedUser})
  let ls = localStorage.getItem("auth")
  ls = JSON.parse(ls)
  ls.user = data?.updatedUser
  localStorage.setItem("auth" , JSON.stringify(ls))
  message.success("updated profile")

    } catch (error) {
      message.error("error while updated profile")

    }
  }
  useEffect(() => {
    setName(auth?.user?.name);
    setPhone(auth?.user?.phone);
    setEmail(auth?.user?.email);
    setAddress(auth?.user?.address);
  }, [auth?.user]);
  return (
    <div>
      <div className='container-fluid'>
        <div className='row d-flex align-items-start'>
          <div className='col-md-3'>
            <UserMenu/>
          </div>
          <div className='col-md-8 '>
            
            <h1 className='productTitle mb-3'>Update profile</h1>
<div className='width75-100 '>
<form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter Your Name"
          autoFocus
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter Your Email "
          disabled
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter Your Password"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter Your Phone"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter Your Address"
        />
      </div>
      

      <button type="submit" className="btn btn-primary cartDetailBTN">
        Save
      </button>
    </form>
    </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
