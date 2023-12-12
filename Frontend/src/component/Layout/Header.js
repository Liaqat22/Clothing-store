import React, { useState } from 'react'
import { NavLink , Link } from 'react-router-dom'
import { useAuth } from '../../context/userContext'
import { useCart } from '../../context/cartContext'


function Header() {
  const [auth , setAuth] = useAuth()
  const [dropdownOpen,setDropdown] = useState(false)
  const [cart] = useCart()
  const handleLogout =()=>{
    setAuth({
      ...auth ,
      user : null,
      token :''
    })
    localStorage.removeItem('auth');
setDropdown(false)
  }
  return (
    <div >
  <nav className="  navbar navbar-expand-lg bg-body-tertiary p-0">
  <div className="container-fluid containerfluidnav" >
    <Link className="navbar-brand" to="#"><b >
    🛒 Clothing Store </b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
             
<div className='d-flex align-items-center'>
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              {/* <li className="nav-item" >
                <NavLink to="/" className="nav-link " >
                  Category
                </NavLink>
              </li> */}
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) :(
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      onClick={()=>{setDropdown(!dropdownOpen)}}
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} style={{position:'absolute'}}>
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
               )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart {cart?.length}
                </NavLink>
              </li>
              </div>
            </ul>
     
    </div>
  </div>
</nav>



    </div>
  )
}

export default Header


