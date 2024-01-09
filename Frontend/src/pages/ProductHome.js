import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/cartContext'
import { Prices } from '../component/Prices'
import Slider from './Slider'


function ProductHome() {
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [pages, setPages] = useState(6)


  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/product/get-product`)
      if (data.success) {
        setProducts(data.products)
      }
    } catch (error) {
      console.log('error in product getting')

    }
  }


  const allCategories = async () => {
    try {
      const { data } = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/category/get-category`)
      if (data.success) {
        setCategories(data.category)
        console.log(data.message)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log("error in category getting CATCH")

    }
  }
  useEffect(() => {
    allCategories()
  }, [])
// filter Api
const filteredProduct = async() =>{
  try {
    const {data} = await axios.post(`https://vercel-api-deployment.vercel.app/api/v1/product/product-filters` , {checked , radio})
    setProducts(data?.products)
  } catch (error) {
    console.log("error in filter")
  }
} 
//filter category
  const handleFilter = (checkedvalues, cid) => {
    const all = [...checked]
    if (checkedvalues) {
      all.push(cid)
    } else {
      all.filter((c) =>c !== cid)
    }
    setChecked(all)
    console.log(cid)
  }
  useEffect(()=>{
    if(checked.length || radio.length) filteredProduct()
  },[checked , radio])

  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts()
   }, [checked.length, radio.length])
  return (
    <>
      {/* <p>user :{auth?.user?.role}</p>
      <p>token :{auth?.token.slice(0 , 20)}</p> */}

      <div className='container-fluid'>
        <div className='row d-flex justify-content-center'>
        <Slider/>
        </div>
        <div className='row d-flex align-items-start'>
        <div className='col-md-3 d-flex justify-content-center'>
        <div className='filters'>
         {/* ======================= filter by category ====================== */}
      <div className='checkbox d-flex flex-column p-3'>
      
      <h1 className='p-3'>filter by Category</h1>
      {categories.map((c) => (
      
       <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className='paragraphText'>
         {c.name}
       </Checkbox>
      ))}
      </div>
    {/* ======================= filter by Prices ====================== */}
    <div className='pricefiltermain p-3'>
    <h1 className='p-3'>filter by Price</h1>
    <Radio.Group onChange={(e) => setRadio(e.target.value)} >
     {Prices.map((p) => (
       <div key={p._id}>
         <Radio value={p.array} className='paragraphText'>{p.name}</Radio>
       </div>
     ))}
    </Radio.Group>
    </div>
    <div className='mt-3'>
    
    <button className='btn btn-warning cartDetailBTN ' onClick={() => window.location.reload()}>Clear filters</button>
    </div>
</div>
        <div className='offcanvasmain'>
        <button className="btn btn-primary cartDetailBTN mt-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" style={{width:"100%"}}>Filters <i className=" fa-solid fa-filter mx-3"/></button>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
<button type="button" className="btn-close cartDetailBTN" data-bs-dismiss="offcanvas" aria-label="Close" />

          <div className="offcanvas-body">
      
      {/* ======================= filter by category ====================== */}
      <div className='checkbox d-flex flex-column p-3'>
      
      <h1 className='p-3'>filter by Category</h1>
      {categories.map((c) => (
      
       <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} className='paragraphText'>
         {c.name}
       </Checkbox>
      ))}
      </div>
      {/* ======================= filter by Prices ====================== */}
      <div className='pricefiltermain p-3'>
      <h1 className='p-3'>filter by Price</h1>
      <Radio.Group onChange={(e) => setRadio(e.target.value)} >
       {Prices.map((p) => (
         <div key={p._id}>
           <Radio value={p.array} className='paragraphText'>{p.name}</Radio>
         </div>
       ))}
      </Radio.Group>
      </div>
      <div className='mt-3'>
      
      <button className='btn btn-warning cartDetailBTN ' onClick={() => window.location.reload()}>Clear filters</button>
      </div>
      
     
          </div>
        </div>
      </div>
      </div>
          <div className='col-md-9 '>
            <div className='row' >
              {products.slice(0,pages).map((p) => (
                <div className='col-md-4 mt-2 mb-2 homePimgCOL' key={p._id}>
                  <div className='card' > 
                    <div>
                      <img src={`https://vercel-api-deployment.vercel.app/api/v1/product/product-photo/${p?._id}`} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title productTitle">{p.name}</h5>
                        <p className="card-text paragraphText">{p.description.substring(0, 30)}</p>
                        <p className="card-text price">{p.price}$</p>
                        <NavLink to={`/productdetail/${p.slug}`} className="btn btn-info cartDetailBTN">More Details</NavLink>
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
              {products.length<=pages ? " ":(<>
                <button className='btn btn-warning cartDetailBTN' style={{width:"fit-content"}} onClick={()=>setPages(pages+6)} >Load more</button>
              </>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductHome
