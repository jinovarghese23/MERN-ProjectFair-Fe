import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../context/ContextShare';
import { toast } from 'react-toastify';

function AddProject() {
    const [show, setShow] = useState(false);
    const [token, setToken] = useState("");
    // useContext() hook os used to accesss state created inside contentShare
    const {addProjectResponse, setAddProjectResponse}= useContext(addProjectResponseContext);

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [projectDetails, setProjectDetails] = useState({
        title: '',
        language: '',
        github: '',
        website: '',
        overview: '',
        projectImage: ''
    });
    // state for showing previewImage
    const [preview, setPreview] = useState("");
    useEffect(() => {
        if (projectDetails.projectImage) {
            // To create image url for preview URL.createObjectURL('Image value')
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }

    }, [projectDetails.projectImage])
    const handleAddProject = async (e) => {
        e.preventDefault();
        const { title, language, github, website, overview, projectImage } = projectDetails;
        if (!title || !language || !github || !website || !overview || !projectImage) {
            toast.error("please fill the form completely")
        }
        else {
            // here we are also uploading afile,so we should sent  body in the form of FormData
            const reqBody = new FormData();
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            reqBody.append("projectImage", projectImage)

            // here content type we are passing is mutipart form data,so specfic req header needed
            const reqHeader = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            const result = await addProjectApi(reqBody, reqHeader);
            if (result.status === 200) {
                setAddProjectResponse(result.data)
                toast.success(`${title} uploaded successfully`);
                setProjectDetails(
                    {
                        title: '',
                        language: '',
                        github: '',
                        website: '',
                        overview: '',
                        projectImage: ''
                    }
                )
                setPreview("")
                handleClose()
            }
            else if (result.status === 409) {
                alert(`${title} already exist`)
            }
            else {
                toast.error(`${title} uploaded failed`)
            }
        }
    }
    const handleClose1 = () => {
        handleClose();
        setPreview("")
        setProjectDetails(
            {
                title: '',
                language: '',
                github: '',
                website: '',
                overview: '',
                projectImage: ''
            }
        )
    }

    return (
        <>
            <button className='btn btn-success' onClick={handleShow}>ADD PROJECT</button>
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
                                <img src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_640.png"}
                                    className='w-100'
                                    alt="" />
                            </label>
                        </div>
                        <div className='col-md-6'>
                            <input type="text" placeholder='Project Title'
                                value={projectDetails.title}
                                onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })}
                                className='form-control mb-3' />
                            <input type="text" placeholder='Languages Used'
                                value={projectDetails.language}
                                onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}
                                className='form-control mb-3' />
                            <input type="text" placeholder='Github Link'
                                value={projectDetails.github}
                                onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })}
                                className='form-control mb-3' />
                            <input type="text" placeholder='Website Link'
                                value={projectDetails.website}
                                onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })}
                                className='form-control mb-3' />
                            <textarea placeholder='Project Overview'
                                value={projectDetails.overview}
                                onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                                rows={4} className='form-control mb-3'></textarea>

                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose1}>
                        CANCEL
                    </Button>
                    <Button variant="success" onClick={handleAddProject} >
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddProject