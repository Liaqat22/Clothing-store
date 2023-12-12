import React from 'react'
import axios from "axios"
import { useSearch } from '../context/searchContext'
import { useNavigate } from 'react-router-dom'

function Searchbar() {
    const [values , setValues] = useSearch()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
try {
    const {data} = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/product/search/${values.keyword}`)
    setValues({...values , result : data})
navigate("/searchedproducts")
} catch (error) {
    console.log("error in searching products")
}
    }
  return (
    <div>
      
    <form className="d-flex searchBarMain align-items-center justify-content-center" role="search" onSubmit={handleSubmit}>
  <input className="form-contro me-2 searchInput" type="search" placeholder="Search Product" aria-label="Search"
   value={values.keyword}
    onChange={(e)=>setValues({...values,keyword : e.target.value})}/>
  <button className="btn btn-outline-success searchBTN" type="submit">Search</button>
</form>


    </div>
  )
}

export default Searchbar
