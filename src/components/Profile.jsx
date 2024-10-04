import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className='shadow p-4'>
                <div className='d-flex'>
                    <h5>Profile</h5>
                    <button className='ms-auto btn btn-primary' onClick={() => setOpen(!open)}>
                        {open ?
                            <i class="fa-solid fa-angle-up"></i> :
                            <i class="fa-solid fa-angle-down"></i>
                        }
                    </button>
                </div>
                <Collapse in={open}>
                    <div>
                        <div className='d-flex justify-content-center align-items-center'>
                            <label htmlFor="profileImg">
                                <input type="file" id="profileImg" style={{display:'none'}}/>
                                <img src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" 
                                width='180px'
                                style={{borderRadius:'50%'}}
                                alt="" />
                            </label>
                        </div>
                        <div>
                            <input type="text"  placeholder='Github Link' className='form-control mb-3 mt-3'/>
                            <input type="text" placeholder='Linkedin Link' className='form-control mb-3'/>
                            <button className='btn btn-primary w-100'>UPDATE</button>
                        </div>
                    </div>
                </Collapse>
            </div>
        </>
    )
}

export default Profile