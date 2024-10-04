import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseurl';
import { editUserProjectApi } from '../services/allApi';
import { editprojectResponseContext } from '../context/ContextShare';

function EditProject({ project }) {
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const {editprojectResponse, setEditProjectResponse }= useContext(editprojectResponseContext)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [projectDetails, setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
    })
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("update values");
        console.log(projectDetails);
        const { title, language, github, website, overview, projectImage, id } = projectDetails;
        if (!title || !language || !github || !website || !overview || !id) {
            alert("Please fill the form completely")
        }
        else {
            const reqBody = new FormData();
            reqBody.append("title", title);
            reqBody.append("language", language);
            reqBody.append("github", github);
            reqBody.append("website", website);
            reqBody.append("overview", overview);
            preview ? reqBody.append("projectImage", projectImage) :
                reqBody.append("projectImage", project.projectImage)
            const token = sessionStorage.getItem("token");
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editUserProjectApi(id, reqBody, reqHeader);
                console.log("===update project result===");
                console.log(result)
                if (result.status === 200) {
                    handleClose()
                    setEditProjectResponse(result)
                }
            }
            else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editUserProjectApi(id, reqBody, reqHeader);
                console.log("===update project result===");
                console.log(result)
                if (result.status === 200) {
                    handleClose();
                    setEditProjectResponse(result)
                }
            }
        }
    }
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    const handleClose1 = () => {
        handleClose();
        setProjectDetails({
            id: project._id,
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""
        })
        setPreview("")
    }
    return (
        <>
            <i class="fa-regular fa-pen-to-square text-primary" onClick={handleShow}></i>
            <Modal show={show} onHide={handleClose} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>ADD PROJECT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-6'>
                            <label htmlFor="projectImg">
                                <input type="file" style={{ display: 'none' }} id="projectImg"
                                    onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })}
                                />
                                <img src={preview ? preview : `${BASE_URL}/uploads/${project?.projectImage}`}
                                    className='w-100'
                                    alt="" />
                            </label>
                        </div>
                        <div className='col-md-6'>
                            <input type="text" value={projectDetails.title} placeholder='Project Title' className='form-control mb-3'
                                onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                            />

                            <input type="text" value={projectDetails.language} placeholder='Languages Used' className='form-control mb-3'
                                onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}
                            />

                            <input type="text" value={projectDetails.github} placeholder='Github Link' className='form-control mb-3'
                                onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })}
                            />
                            <input type="text" value={projectDetails.website} placeholder='Website Link' className='form-control mb-3'
                                onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })}
                            />
                            <textarea value={projectDetails.overview} placeholder='Project Overview' rows={4} className='form-control mb-3'
                                onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                            ></textarea>

                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose1}>
                        CANCEL
                    </Button>
                    <Button variant="success" onClick={handleUpdate}>
                        UPDATE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProject