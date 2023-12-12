import React, { useEffect, useState } from 'react'
import AdminMenu from './AdminMenu'
import axios from "axios"
import {  Select, message } from 'antd'
import { Option } from 'antd/es/mentions'
import { useNavigate } from 'react-router-dom'

function CreateProduct() {
  const [allCategories, setAllCategories] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate  = useNavigate()

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.post(
        `https://vercel-api-deployment.vercel.app/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        message.error(data?.message);
      } else {
        message.success("Product Created Successfully");
        navigate("/dashboard/admin/allproducts")
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };

  const AllCategories = async () => {
    try {
      const { data } = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/category/get-category`)
      if (data.success) {
        setAllCategories(data.category)
        message.success(data.message)
      } else {
        message.error(data.message)
      }
    } catch (error) {
      console.log("error in category getting CATCH")

    }
  }
  useEffect(() => {
    AllCategories()
  }, [])


  return (
    <div>
      <div className="container-fluid">
        <div className='row d-flex align-items-start justify-content-evenly'>
          <div className='col-md-3'>
            <AdminMenu />

          </div>
          <div className='col-md-8'>
            <h1>CreateProduct</h1>
            <div className="m-1  width75-100">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 form-control"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {allCategories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12 cartDetailBTN">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3 form-control"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary cartDetailBTN" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
