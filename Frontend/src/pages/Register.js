import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate()
  
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const res = await axios.post(`https://vercel-api-deployment.vercel.app/api/v1/auth/register`, { email, password ,name,address,phone  })
        if (res.data.success) {
          console.log(res.data.message)
          //     toast.success(res.data.message)
          navigate('/login')
        } else {
          console.log(res.data.message)
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
        <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
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
    </>
  )
}

export default CreateUser
