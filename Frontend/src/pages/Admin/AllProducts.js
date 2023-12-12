import { message } from 'antd'
import confirm from 'antd/es/modal/confirm'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {NavLink} from "react-router-dom"
import AdminMenu from './AdminMenu'

function AllProducts() {
    const [products , setProducts] = useState([])
    const getAllProducts = async () => {
        try {
          const { data } = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/product/get-product`)
          if (data.success) {
            setProducts(data.products)
          }
        } catch (error) {
          message.error('error in product getting')
    
        }
      }
      useEffect(()=>{
        getAllProducts()
      },[])

      const handleDelete = async(id) =>{
        try {
          let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
          const {data} = await axios.delete(`https://vercel-api-deployment.vercel.app/api/v1/product/delete-product/${id}`)
          message.success('product deleted')
          getAllProducts()
        } catch (error) {
          message.error(' error in product deleting')

        }
      }
  return (
    <>
      <div className='container-fluid'>
      <div className="row d-flex align-items-start justify-content-evenly">
<div className='col-md-3'>
  <AdminMenu/>
</div>
<div className='col-md-8'>

<div className='row' >
              {products.map((p) => (
                <div className='col-md-4 allproductsAdminCol' key={p._id}>
                  <div className='card' >
                    <div>
                      <img src={`https://vercel-api-deployment.vercel.app/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title productTitle"> {p.name}</h5>
                        <p className="card-text paragraphText">{p.description.substring(0, 30)}</p>
                        <p className="card-text paragraphText">Price: {p.price}$</p>
                        <p className="card-text paragraphText">Category :{p.category.name}</p>
                       
                      </div>
                    </div>
                    <div className='m-3'>
                    <NavLink onClick={()=>handleDelete(p._id)} className='btn btn-danger  cartDetailBTN'>Delete </NavLink>
          <NavLink to={`/dashboard/admin/updateproduct/${p.slug}`} className='btn btn-warning cartDetailBTN'>Update </NavLink>
          </div>
                  </div>
                </div>
              ))}
            </div>

      </div>

    </div>
    </div>
    </>
  )
}

export default AllProducts
