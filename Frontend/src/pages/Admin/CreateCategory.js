import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CategoryForm from './CategoryForm';
import { Button, Modal, message } from 'antd';
import AdminMenu from './AdminMenu';



function CreateCategory() {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [updatedName, setUpdatedName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedid , setSelectedid] = useState(null)

   

        // creating category
    const handleSubmit = async () => {
        try {

            const { data } = await axios.post(`https://vercel-api-deployment.vercel.app/api/v1/category/create-category`, { name })
            if (data.success) {
                message.success(data.message)
                setName("")
            } else {
                console.log(data.message)
            }
            allCategories()
        } catch (error) {
            console.log("error in category creating CATCH")
        }
    }

       // getting all category
 const allCategories = async () => {
        try {
            const { data } = await axios.get(`https://vercel-api-deployment.vercel.app/api/v1/category/get-category`)
            if (data.success) {
                setCategories(data.category)
                console.log(data.category)
                console.log(data.message)
            } else {
                console.logr(data.message)
            }
        } catch (error) {
            console.log("error in category getting CATCH")

        }
    }
    useEffect(() => {
        allCategories()
    }, [])

    // delete category
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`https://vercel-api-deployment.vercel.app/api/v1/category/delete-category/${id}`)
            message.success(data.message)
            allCategories()
        } catch (error) {
            console.log("error in category deleting CATCH")

        }
    }


    // update category
    const handleUpdate = async () => {
        try {
            const { data } = await axios.put(`https://vercel-api-deployment.vercel.app/api/v1/category/update-category/${selectedid}`, { name : updatedName })
            message.success("category updated")
            setSelectedid(null);
            setUpdatedName("")
            setIsModalOpen(false)
            allCategories()
        } catch (error) {
            console.log("error in category updating CATCH")
        }
    }
    return (
        <div>
            <div className="container-fluid">
                <div className='row d-flex align-items-start justify-content-evenly'>
                    <div className='col-md-3'>

                    <AdminMenu/>


                    </div>
                    <div className='col-md-8'>
                        <h1>CreateCategory</h1>
                        
                            <CategoryForm value={name} setValue={setName} handleform={handleSubmit} />

                        <table className="table  table-hover" style={{textAlign :"left"}}>
                            <thead>
                                <tr>
                                    <th><h6 className='tablehead'>Categories</h6></th>
                                    <th><h6 className='tablehead'>Action</h6></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((c) => (

                                    <tr key={c._id}>

                                        <td><h6 className='tableData'>{c.name}</h6></td>
                                        <td>

                                            <button className='btn btn-danger m-1 tableData' style={{ background: 'transparent', border: 'none' }} onClick={() => { handleDelete(c._id) }}>
                                                <i className="fa-solid fa-trash-can" style={{ color: 'red' }} />
                                            </button>

                                            <Button  onClick={()=>{setIsModalOpen(true) ;
                                                 setUpdatedName(c.name);
                                                  setSelectedid(c._id)}}> 
                                                     <i className="fa-solid fa-pen tableData" /> 
                                                        </Button>

                        <Modal title="update Category" onClick ={()=>{setIsModalOpen(false)}} open={isModalOpen}
                         footer = {null}>             
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleform={handleUpdate} />
                        </Modal>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCategory
