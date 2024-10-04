import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteProjectApi, getUserProjectApi } from '../services/allApi'
import { addProjectResponseContext, editprojectResponseContext } from '../context/ContextShare'

function MyProject() {
    const [userProject, setuserProject] = useState([]);
    const { editprojectResponse, setEditProjectResponse } = useContext(editprojectResponseContext)
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
    }, [addProjectResponse, editprojectResponse])

    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token");
        const reqHeader = {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
        }
        console.log("reqHeader");
        console.log(reqHeader)
        const result = await deleteProjectApi(id, reqHeader)
        console.log("delete resposne");
        console.log(result)
        if (result.status === 200) {
            alert("Project deleted successfully");
            getUserProjects()
        }
        else {
            alert("Something went wrong")
        }
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
                                    <a href={item.website} target='_blank' className='btn'>
                                        <i class="fa-solid fa-link"></i>
                                    </a>
                                    <a href={item.github} target='_blank'
                                        className='btn'><i class="fa-brands fa-github"></i></a>

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