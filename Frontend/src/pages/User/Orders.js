import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {message} from 'antd'
import { useAuth } from '../../context/userContext'
import UserMenu from './UserMenu'


function Orders() {
  const [getOders , setgetOders] =useState ([])
  const [auth ]  = useAuth()

  const getUserOrders  =  async()  => {
    try {
      const {data} = await axios.post(`https://vercel-api-deployment.vercel.app/api/v1/auth/orders`, {userId:auth?.user?._id , Bname : auth?.user?.name})
setgetOders(data)
console.log(data)
message.success ('getiing order successfully')
    } catch (error) {
      message.error ('order getting error')

    }
  }
  useEffect (()=>{
    getUserOrders()
  },[auth?.token])
  return (
    <>
    <div className='container-fluid'>
      <div className='row d-flex align-items-start'>
        <div className='col-md-3'>
          <UserMenu/>
        </div>
        <div className='col-md-8'>
          <p className='productTitle' style={{color: "brown"}}>Order list</p>
    {getOders?.map((o, i) => {
              return (
    <div className='row d-flex justify-content-center mb-3'>
                <div className="col-md-11">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className='tablehead'  style={{color:'brown', fontWeight:"bold"}}>{i + 1})</th>
                        <th className='tablehead'>Status</th>
                        <th className='tablehead'> date</th>
                        <th className='tablehead'>Payment</th>
                        <th className='tablehead'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='tableData' style={{color:'transparent', fontWeight:"bold"}}>-</td>
                        <td className='tableData'>{o?.status}</td>
                        <td className='tableData'>{new Date(o?.createdAt).toISOString().slice(0, 10)}</td>
                        <td className='tableData'>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td className='tableData'>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>

                  <div className="col-md-11">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row m-0" key={p._id} style={{boxShadow:'unset',borderRadius:'0rem'}}>
                        <div className="col-md-4">
                          <img
                            src={`https://vercel-api-deployment.vercel.app/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top mb-3"
                            alt={p.name} style= {{borderRadius:'0rem'}}
                          />
                        </div> 
                        <div className="col-md-8">
                          <p className='price'>{p.name}</p>
                          <p className='paragraphText'>{p.description.substring(0, 30)}</p>
                          <p className='paragraphText'>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
            </div>
              );
            })}

        </div>
      </div>
    </div>


      

    </>
  )
}

export default Orders
