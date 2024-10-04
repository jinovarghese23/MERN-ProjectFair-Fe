import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({ register }) {
    const registerForm = register ? true : false;
    // useNavigate() hook is used to redirect to a particular path
    const navigate = useNavigate()
    const [userData, setUSerData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, email, password } = userData;
        if (!username || !email || !password) {
            toast.warning("Please fill the form completely")
        }
        else {
            const result = await registerApi(userData)
            console.log(result)
            if (result.status === 201) {
                // toastify implement
                setUSerData({
                    username: "",
                    email: "",
                    password: ""
                })
                toast.success(`${username} registered successfully`)
                // navigate to login page on successfull user registration
                navigate('/login')
            }
            else if (result.status == 400) {
                toast.error(result.response.data)
            }
            else {
                toast.error("Something happened")
            }

        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = userData;
        if (!email || !password) {
            toast.warning("Please fill the form completely")
        }
        else {
            const result = await loginApi(userData);
            console.log("login result");
            console.log(result)
            if (result.status === 200) {
                sessionStorage.setItem("loggedUser", JSON.stringify(result.data.data));
                sessionStorage.setItem('token', result.data.token);
                setUSerData({
                    username: "",
                    email: "",
                    password: ""
                })
                toast.success('Logged in successfully')
                navigate('/')
            }
            else if (result.status === 401) {
                toast.error("Invalid Email or password")
            }
            else {
                toast.error("Something went wrong")
            }

        }
    }
    return (
        <>
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className='container w-75'>
                    <h5>
                        <Link className='text-warning' style={{ textDecoration: 'none', fontWeight: 'bolder' }} to={'/'}>
                            <i class="fa-solid fa-arrow-left me-3"></i>BACK TO HOME</Link>
                    </h5>
                    <div className='bg-light'>
                        <Row>
                            <Col md={6} className='p-4 d-flex justify-content-center align-items-center'>
                                <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
                                    width='70%'
                                    alt=""

                                />
                            </Col>
                            <Col md={6} className='p-5 d-flex justify-content-center '>
                                <form className='w-100'>
                                    <h5 className='text-center'>
                                        <i class="fa-brands fa-stack-overflow me-3"></i>Project Fair</h5>
                                    {registerForm ?
                                        <>
                                            <h6 className='text-center mb-3 mt-3'>Sign Up To Your Account</h6>
                                            <input type="text" name="" id="" placeholder='Name' className='form-control rounded'
                                                value={userData.username}
                                                onChange={(e) => setUSerData({ ...userData, username: e.target.value })}
                                            />
                                        </>

                                        :
                                        <h6 className='text-center mb-3 mt-3'>Sign In To Your Account</h6>
                                    }
                                    <div className='mb-3 mt-3'>
                                        <input type="text" placeholder='Email Id' className='form-control rounded'
                                            value={userData.email}
                                            onChange={(e) => setUSerData({ ...userData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input type="password" placeholder='password' className='form-control rounded'
                                            value={userData.password}
                                            onChange={(e) => setUSerData({ ...userData, password: e.target.value })}
                                        />
                                    </div>
                                    {registerForm ?
                                        <div className='mb-3 mt-3'>
                                            <button className='btn btn-warning w-100 rounded' onClick={handleRegister}> REGISTER</button>
                                            <p className='mt-3'> Already A User? Click Here To
                                                <Link className='ms-2' style={{ textDecoration: 'none' }} to={'/login'}>LOGIN</Link></p>
                                        </div> :
                                        <div >
                                            <button className='btn btn-warning w-100 rounded' onClick={handleLogin}>LOGIN</button>
                                            <p className='mt-3'> Not Registered yet? Click Here To
                                                <Link className='ms-2' style={{ textDecoration: 'none' }} to={'/register'}>REGISTER</Link></p>
                                        </div>
                                    }
                                </form>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default Auth