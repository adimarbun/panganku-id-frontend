import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";

const Navbar = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const TokoSaya = async() =>{
        history.push("toko");
    }

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                history.push("/");
            }
        }
    }

    return (
        <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <a href ="/home" class="navbar-brand">Panganku.Id</a>
            <button class="btn btn-outline-success" onClick={TokoSaya}>Toko Saya</button>
            <form class="d-flex">            
                <button class="btn btn-outline-success" onClick={Logout} type="submit">Hello , {name}</button>
            </form>
        </div>
        </nav>
    )
}

export default Navbar
