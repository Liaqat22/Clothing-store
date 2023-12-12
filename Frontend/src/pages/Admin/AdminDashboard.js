import React from 'react'
import { useAuth } from '../../context/userContext'
import AdminMenu from './AdminMenu'


function AdminDashboard() {
  const [auth] = useAuth()
 

  return (
    <div>
      <div className="container-fluid">
        <div className='row d-flex align-items-start justify-content-evenly'>
          <div className='col-md-3'>
            <AdminMenu />

          </div>
          <div className='col-md-8'>
            <div className=' card  p-3 width75-100'>
            <h1 className='productTitle p-3' style={{color:"steelblue"}}>My Profile</h1>
            <p className='paragraphText'>Name :  <b>{auth?.user?.name}</b></p>
            <p className='paragraphText'>Email : <b> {auth?.user?.email}</b></p>
            <p className='paragraphText'>Address :<b> {auth?.user?.address}</b></p>
            <p className='paragraphText'>Phone : <b> {auth?.user?.phone}</b></p>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
