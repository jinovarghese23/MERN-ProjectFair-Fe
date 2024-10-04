import React from 'react'
import Card from 'react-bootstrap/Card';
import media_player_img from '../assets/video-player.png'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseurl';

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card className='mt-4' style={{ width: '100%' }} onClick={handleShow}>
                <Card.Img variant="top" src={`${BASE_URL}/uploads/${project.projectImage}`}  height="200px"/>
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>

                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <img src={`${BASE_URL}/uploads/${project.projectImage}`} alt="" width='100%' />
                        </Col>
                        <Col md={6}>
                            <h4>Description:</h4>
                            <p>{project.overview}</p>
                            <h4>Technologies</h4>
                            <p>{project.language} </p>
                        </Col>
                    </Row>
                </Modal.Body>
                <div className='d-flex mt-3 ms-3 mb-4'>
                    <Link className='ms-5 me-3' to={project.github} target='_blank'>
                        <i class="fa-brands fa-github fa-2x text-primary">
                        </i>
                    </Link>
                    <Link className=''to={project.website} target='_blank'>
                        <i class="fa-solid fa-link fa-2x text-info">
                           
                        </i>
                    </Link>
                </div>
            </Modal>
        </>
    )
}

export default ProjectCard