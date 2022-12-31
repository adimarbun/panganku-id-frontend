import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useHistory();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            console.log("email", email);
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            history.push("/home");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    const onHandleRegister = () => {
        history.push("/register");
    }

    return (
        <section class="vh-100" styles={"background-color: #eee;"}>
            <div class="container h-100">
                <div className='container-fluid'>
                    <h1 className='text-center mt-3 text-upporcase'>Panganku.id</h1>
                </div>
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" styles={"border-radius: 25px;"}>
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                                        <p class="d-flex flex-row mx-md-4">Belum punya akun? <p class="text-primary" onClick={onHandleRegister}>&nbsp; Daftar Disini</p></p>
                                        <form class="mx-1 mx-md-4" onSubmit={Auth}>
                                            <p className="has-text-centered">{msg}</p>
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <label class="form-label" for="form3Example3c">Your Email</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                    <label class="form-label" for="form3Example4c">Password</label>
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" class="btn btn-primary btn-lg" onClick={Auth}>Login</button>
                                            </div>
                                        </form>

                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            class="img-fluid" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
