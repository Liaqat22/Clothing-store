import React, { createContext, useContext, useEffect, useState } from 'react'

const Cart = createContext()

function CartProvider({children}) {
    const [cart , setCart] = useState([])


    useEffect(()=>{
        const cartdataGet = localStorage.getItem('CART')
        if(cartdataGet){
        const cartdataParse = JSON.parse(cartdataGet)
setCart(cartdataParse)
console.log(cartdataParse , "parsedata")
        }
    },[])
  return (
    <>
      <Cart.Provider value={[cart , setCart]}>{children}</Cart.Provider>
    </>
  )
}
const useCart = ()=>useContext(Cart)
export  {CartProvider ,Cart, useCart}
