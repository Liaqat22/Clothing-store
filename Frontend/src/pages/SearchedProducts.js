import React from 'react'
import { useSearch } from '../context/searchContext'
import { useCart } from '../context/cartContext'
import { NavLink } from 'react-router-dom'

function SearchedProducts() {
    const [values ] = useSearch()
    const [cart, setCart] = useCart()

  return (
    <>

<div className='container-fluid'>
        <div className='row'>
              {values?.result.map((p) => (
                <div className='col-md-3 ' key={p._id}>
                  <div className='card' >
                    <div>
                      <img src={`https://vercel-api-deployment.vercel.app/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title productTitle">{p.name}</h5>
                        <p className="card-text paragraphText">{p.description}</p>
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
        </div>
      </div>
    </>
  )
}

export default SearchedProducts
