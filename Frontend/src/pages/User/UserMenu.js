import React from 'react'
import { NavLink } from 'react-router-dom'

function UserMenu() {
  return (
    <>
              <div className="card" style={{borderColor :'gold'}}>
              <NavLink to = "/dashboard/user" className= "adminmenuBTN p-3 text-center"style={{background : 'azure'}} >User Panel</NavLink>

  <ul className="list-group list-group-flush">
    <li className="list-group-item "><NavLink to = "/dashboard/user/profile" className= "adminmenuBTN">Profile</NavLink></li>
    <li className="list-group-item "><NavLink to = "/dashboard/user/orders" className= "adminmenuBTN">Order</NavLink></li>
    {/* <li className="list-group-item "><NavLink to = "/dashboard/admin/allproducts" className= "adminmenuBTN">Products List</NavLink></li> */}
    
  </ul>
</div>
    

    </>
  )
}

export default UserMenu
