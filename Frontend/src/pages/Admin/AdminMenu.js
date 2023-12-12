import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminMenu() {
  return (
    <div>
              <div className="card" style={{borderColor :'gold'}}>
              <NavLink to = "/dashboard/admin" className= "adminmenuBTN p-3 text-center"style={{background : 'azure'}} >Admin Panel</NavLink>

  <ul className="list-group list-group-flush">
    <li className="list-group-item "><NavLink to = "/dashboard/admin/createcategory" className= "adminmenuBTN">Create Category</NavLink></li>
    <li className="list-group-item "><NavLink to = "/dashboard/admin/createproduct" className= "adminmenuBTN">Create Product</NavLink></li>
    <li className="list-group-item "><NavLink to = "/dashboard/admin/allproducts" className= "adminmenuBTN">Products List</NavLink></li>
    <li className="list-group-item "><NavLink to = "/dashboard/admin/adminorders" className= "adminmenuBTN">Orders</NavLink></li>
    
  </ul>
</div>
    </div>
  )
}

export default AdminMenu
