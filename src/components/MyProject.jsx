import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteProjectApi, getUserProjectApi } from '../services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'

function MyProject() {
    const [userProject, setuserProject] = useState([]);
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const getUserProjects = async () => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const result = await getUserProjectApi(reqHeader);
        console.log("User project");
        console.log(result)
        setuserProject(result.data)
    }
    useEffect(() => {
        getUserProjects()
    }, [addProjectResponse, editProjectResponse])
    const handleDelete = async (id) => {
        // alert(id)
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const result = await deleteProjectApi(id, reqHeader)
        console.log("Delete Response");
        console.log(result);
    }
    return (
        <>
            <div className='shadow p-5 mb-5'>
                <div className='d-flex mt-4'>
                    <h5 className='text-success me-auto'>My Projects</h5>
                    <AddProject />
                </div>
                {
                    userProject?.length > 0 ?
                        userProject.map((item) => (
                            <div className='p-3 mt-4 rounded-2 d-flex bg-light'>
                                <h5>{item.title}</h5>

                                <div className='d-flex ms-auto align-items-center'>
                                    <EditProject project={item} />
                                    {/* <Link className='ms-3 text-success'>
                                        
                                    </Link>
                                    <Link className='ms-3 text-warning'>
                                        
                                    </Link> */}
                                    <a href={item.website} className='btn' target='_blank'>
                                        <i class="fa-solid fa-link text-info ms-3"></i>
                                    </a>
                                    <a href={item.github} className='btn' target='_blank'>
                                        <i class="fa-brands fa-github text-dark"></i>
                                    </a>
                                    <button className='btn' onClick={() => handleDelete(item._id)}>
                                        <i class="fa-solid fa-trash text-danger"></i>
                                    </button>
                                </div>
                            </div>
                        )) :
                        <p>No Projects found</p>
                }
            </div>
        </>
    )
}

export default MyProject