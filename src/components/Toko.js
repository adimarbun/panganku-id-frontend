/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { CardActionArea, Grid } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const Toko = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const [product, setProduct] = useState([]);
    const [myToko, setMyToko] = useState(null);

    useEffect(() => {
        refreshToken();
        getUsers();
        getProduct();
        getMyToko()
    }, []);

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

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    const getProduct = async () => {
        var dataProduct = [{
            'nama': 'Sasa/Bahan Tambahan Pangan (Penguat Rasa) 1kg',
            'imgUrl': 'https://images.tokopedia.net/img/cache/100-square/VqbcmM/2020/12/1/ea465782-2fbd-4e1b-a8ca-24e899792496.jpg.webp?ect=4g',
            'harga': '60,000',
            'namaToko': 'Toko Budi',
            'alamat': 'Jl Merdeka'
        }];

        var tokoId = window.sessionStorage.getItem("tokoId");
        const res = await axiosJWT.get(`http://localhost:5000/produk/by-toko/${tokoId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setProduct(res.data);
    }

    const getMyToko = async() => {
        var userId = window.sessionStorage.getItem("userId");
        console.log(userId);
        const res = await axiosJWT.get(`http://localhost:5000/toko/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(res.data){
            setMyToko(res.data)
            window.sessionStorage.setItem("tokoId", res.data.id);
        }   
    }

    const onCLickEditToko = () => {
        history.push('/editToko')
    }


    if (myToko == null) return (
        <div className="container ">
            <div class="row my-5">
                <h1>Toko Saya</h1>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-column'>
                    <h2>Belum Ada Toko</h2>
                    <Button variant='warning' onClick={() => history.push("/addToko")}> <h2>Buat Toko</h2></Button></div>
            </div>
        </div>
    )
    return (
        <div className="container ">
            <div class="row my-5">
                <div class="col">
                    <Card>
                        <div className='container-fluid bg-light'>
                            <h3 className=' mt-5 text-upporcase'>{myToko.nama_toko}</h3>
                            <p>{myToko.alamat}</p>
                            <p>{myToko.no_hp}</p>
                        </div>
                        <Button variant='warning' onClick={onCLickEditToko}>Edit</Button>
                    </Card>
                </div>
                <div class="col">
                </div>
            </div>
            <div>
                <div class="row">
                    <div class="col" />
                    <div class="col" />
                    <div class="d-grid gap-2 col-4 mx-auto my-2">
                        <button type="button" class="btn btn-success" onClick={() => history.push('/addProduk')}>Tambahkan Produk</button>
                    </div>
                </div>
                <Card >
                    <div class=" container-fluid pl-2 ">
                        <h3>Daftar Produk</h3>
                    </div>
                    <Grid container>
                        {product.map((product, index) => (
                            <div class="m-3">
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={product.img_produk} />
                                    <Card.Body>
                                        <Card.Title>{product.nama_produk}</Card.Title>
                                        <Card.Text>
                                            Rp {product.harga_produk}
                                        </Card.Text>
                                        <Card>
                                        </Card>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Grid>
                </Card>
            </div>
        </div>
    )
}

export default Toko
