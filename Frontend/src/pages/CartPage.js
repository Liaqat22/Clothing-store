import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cartContext'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/userContext'
import axios from "axios"
import DropIn from "braintree-web-drop-in-react";


function CartPage() {
  const [cart, setCart] = useCart()
  const [auth] =useAuth()
  const [clientToken , setClientToken] = useState("")
  const [instance , setInstance] = useState("")
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()

  //Romove Cart
  const removeCart = (id)=>{
    const myCart = [...cart]
    const index = myCart.findIndex((item)=>(item._id === id))
    myCart.splice(index , 1)
    console.log( index , "remove cart")
    setCart(myCart)
    localStorage.setItem("CART" , JSON.stringify(myCart))
  }
  // totalPrice
  const totalPrice = () =>{
    let total = 0
    cart?.map((item)=>(total = total + item.price))
    return total
  } 

  const getClientToken = async() =>{
    try {
      const {data} = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/product/braintree/token`)
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log("clienttoken error")
    }
  }

  // get client token at initial time
  useEffect(()=>{
    getClientToken()
  },[auth?.token])

  //handlePayment
  const handlePayment = async() =>{
    try {
      setLoading(true)
      const {nonce} = await instance.requestPaymentMethod()
      const {data} =  axios.post(`https://vercel-api-deployment.vercel.app/api/v1/product/braintree/payment` , {nonce , cart , userId:auth.user._id, Bname : auth?.user?.name})
      setLoading(false)
localStorage.removeItem('CART')
setCart([])
navigate("/dashboard/user/orders")

    } catch (error) {
      console.log("error in payment")
      setLoading(false);
    }
  }
  return (
    <>
      <div className='container-fluid'>
          <h5 className='helouser'>Hello <span style={{color :'cornflowerblue'}}>{!auth?.user? "Guest" : auth?.user?.name}</span></h5>
        <div className='row d-flex justify-content-evenly align-items-start'>
            <h3 className='text-center m-3'> {auth?.token? "":" ----PLEASE LOGIN TO CHECKOUT----"} </h3>
          <div className='col-md-8 tableCOl8 mb-3'>
            <table className="table  table-hover">
              <thead>
                <tr>
                  <th><h6 className='tablehead'>Product Name</h6></th>
                  <th><h6 className='tablehead'>Description</h6></th>
                  <th><h6 className='tablehead'>Price</h6></th>
                  <th><h6 className='tablehead'>Action</h6></th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((p) => (

                  <tr key={p._id} > 
                    <td><h6 className='tableData'>{p.name}</h6></td>
                    <td><h6 className='tableData'>{p.description}</h6></td>
                    <td><h6 className='tableData'>{p.price}</h6></td>
                    <td>

                      <button className='btn btn-danger cartDetailBTN' onClick={()=>{removeCart(p._id)}} >
                        Remove
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <div className='col-md-3 tableCOl3 mb-3'>
              
            <p className='ttlCartPrice'><span>Total Cart :</span> <span style={{color:'#01541b'}}>{cart?.length}</span></p>
            <p className='ttlCartPrice'><span>Total Price :</span> <span style={{color:'#01541b'}}>{totalPrice()}$</span></p>
            <div className='m-1'>
              {!clientToken||!auth?.token || !cart?.length ? (""):(<>
                <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                      <NavLink className='btn btn-warning cartDetailBTN' onClick={handlePayment} >
                       {loading ? "processing...." : "Make payment"}
                      </NavLink>
              </>)}
                     
                      </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default CartPage
