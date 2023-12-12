import { message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useCart } from '../context/cartContext'

function ProductDetail() {
    const { slug } = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [id, setId] = useState("")
    const [newcart, setnewCart] = useState()
    const [similarProducts, setSimilarProducts] = useState([])
    const [cart , setCart] = useCart()

    const productInfo = async () => {
        try {
            const { data } = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/product/get-product/${slug}`)
            setName(data.product.name)
            setPrice(data.product.price)
            setDescription(data.product.description)
            setCategory(data.product.category.name)
            setId(data.product._id)
            getSimilarProducts(data?.product._id , data?.product?.category._id) //calling a function to get similar products
            setnewCart(data.product)
            message.success('getting product detail')
        } catch (error) {
console.log("error in getting product details")
        }
    }
    useEffect(() => {
        productInfo()
    }, [])

    // similar products
    const getSimilarProducts = async(pid , cid)=>{
        try {
            const {data} = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/product/related-product/${pid}/${cid}`)
            setSimilarProducts(data.products)
        } catch (error) {
            console.log("error in getting similar product ")

        }
    }
  
    return (
        <>
            <div className='container-fluid'>
                <div className='row d-flex justify-content-evenly'>
                    <h1 className='p-3'>ProductDetail</h1>

                    <div className='col-md-4'>
                        <img src={`https://vercel-api-deployment.vercel.app/api/v1/product/product-photo/${id}`} />
                    </div>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-body'>
                            <p className='productTitle card-header p-2 mb-2'> {name}</p>
                            <p className='paragraphText '>price : {price}$</p>
                            <p className='paragraphText'>description : {description}</p>
                            <p className='paragraphText'>category : {category}</p>
                                <NavLink className="btn btn-primary cartDetailBTN"
                                    onClick={() => {
                                        setCart([...cart, newcart]);
                                        localStorage.setItem("CART", JSON.stringify([...cart, newcart]))
                                    }} to="/cart">Add to Cart</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
<hr/>
                <div className='row mt-3' >
                    <h1 className='text-center'>similarProducts</h1>
                    {similarProducts.length === 0 && (<p className='paragraphText'>no similar product found</p>)}
              {similarProducts.map((p) => (
                <div className='col-md-3 ' key={p._id}>
                  <div className='card' >
                    <div>
                      <img src={`https://vercel-api-deployment.vercel.app/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                      <div className="card-body">
                        <h5 className="card-title productTitle">{p.name}</h5>
                        <p className="card-text paragraphText">{p.description}</p>
                        <p className="card-text price">{p.price}$</p>
                        <p className="card-text price">category : {p.category.name}$</p>
                        <a href={`/productdetail/${p.slug}`} className="btn btn-info cartDetailBTN">More Details</a>
                        <NavLink className="btn btn-primary cartDetailBTN"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem("CART", JSON.stringify([...cart, p]))
                          }}>Add to Cart</NavLink>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            </div>

        </>
    )
}

export default ProductDetail
