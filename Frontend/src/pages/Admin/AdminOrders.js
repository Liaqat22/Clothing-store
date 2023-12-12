import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import { useAuth } from '../../context/userContext'
import axios from 'axios'
import {Select } from "antd"

function AdminOrders() {
  const [allOrder, setAllOrder] = useState([])
  const [status ] = useState ([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ])
  const [auth] = useAuth()

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/auth/all-orders`)
      setAllOrder(data)

    } catch (error) {
      console.log("error in getting all orders")
    }
  }
  useEffect(() => {
    getAllOrders()
  }, [auth?.token])

  const handleStatusChange = async(value, id) => {
try {
  const {data} = await axios.put(`https://vercel-api-deployment.vercel.app/api/v1/auth/order-status/${id}`,{
    status : value
  })
  getAllOrders()
} catch (error) {
  console.log("error in status updating")
}
  }

  return (
    <div>
      <div className="container-fluid">
        <div className='row d-flex align-items-start justify-content-evenly'>
          <div className='col-md-3'>
            <AdminMenu />

          </div>
          <div className='col-md-8'>
          <p className='productTitle text-center' style={{color: "brown"}}>Client Orders</p>
          <p className='price m-3' style={{color: "#197402"}}>Total Orders - {allOrder?.length}</p>
    {allOrder?.map((o, i) => {
              return (
    <div className='row d-flex justify-content-center mb-3'>
                <div className="col-md-11">
                  <table className="table ordertable">
                    <thead>
                      <tr>
                        <th className='tablehead'  style={{color:'brown', fontWeight:"bold"}}>{i + 1})</th>
                        <th className='tablehead'>Buyer</th>
                        <th className='tablehead'>Status</th>
                        <th className='tablehead'> date</th>
                        <th className='tablehead'>Payment</th>
                        <th className='tablehead'>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='tableData' style={{color:'transparent', fontWeight:"bold"}}>-</td>
                        <td className='tableData'>{o?.buyername}</td>
                        <td className='tableData'>
                        <Select 
                        defaultValue={o?.status} 
onChange={(value)=>handleStatusChange(value , o?._id)}
                        >Status : {status.map((s,i)=>(
                          <Select.Option key = {i} value = {s}>
                            {s}
                          </Select.Option>
                        ))}</Select>
                        </td>
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
                          <p className='paragraphText'>Price : {p.price}$</p>
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
    </div>
  )
}

export default AdminOrders
