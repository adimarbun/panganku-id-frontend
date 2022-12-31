/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { CardActionArea ,Grid} from '@mui/material';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import AddProduk from './AddProduk';

const Home = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const [product,setProduct] = useState([]);

    useEffect(() => {
        refreshToken();
        getUsers();
        getProduct();
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

    const getProduct = async() =>{
        var dataProduct = [{'nama' : 'beras a',
                            'imgUrl' :'aa',
                            'harga' : '60,000',
                            'namaToko' : 'Toko Budi',
                            'alamat' :'Jl Merdeka'
                            },
                            {
                            'nama' : 'beras b',
                            'harga' : '59,500',
                            'imgUrl' :'https://s2.bukalapak.com/product-description-image/11197/large/beras%20premium%20SR%205%20kg.png',
                            'namaToko' : 'Toko Cempaka',
                            'alamat' :'Jl Kemana Aja'
                            },{
                            'nama' : 'beras a',
                            'harga' : '69,000',
                            'imgUrl' :'aa',
                            'namaToko' : 'Toko Putri',
                            'alamat' :'Jl Kenangan'
                            },{
                            'nama' : 'beras a',
                            'harga' : '61,000',
                            'imgUrl' :'aa',
                            'namaToko' : 'Toko Cahaya',
                            'alamat' :'Jl Medan Utara'
                            }];
        setProduct(dataProduct);
    }

    return (
        <div className="container ">
            <div className='container-fluid'>
                <h1 className='mt-5 text-upporcase'>Panganku.id</h1>
            </div>
            <div className='container-fluid'>      
                <h5 class='text-warning'>Temukan Toko dan bahan pangan yang adanda cari di sekitarmu</h5>
                <h5 class='text-warning'>Tambahkan Toko Anda supaya banyak di lihat orang</h5>
            </div>
            <div class ='row mt-5 mb-4'>
                <div class='col'/>
                <div class='col'>
                    <Card>
                        <div class="mb-2 mt-2">
                            <Form.Select aria-label="Provinsi">
                            <option>Provinsi</option>
                            <option value="1">DKI Jakarta</option>
                            <option value="2">Sumatra Utara</option>
                            <option value="3">Three</option>
                            </Form.Select>
                        </div>
                        <div class="mb-2">
                            <Form.Select aria-label="Kota">
                            <option>Kota</option>
                            <option value="1">Jakarta Pusat</option>
                            <option value="2">Jakarta Selatan</option>
                            <option value="3">Jakarta Barat</option>
                            </Form.Select>  
                        </div>       
                    </Card>                
                </div>
                <div class='col'/>
            </div>
            <div class="mb-5">
                <form class="row g-3">
                <div class="col">
                </div>
                <div class="col">
                    <input type="text" class="form-control" id="inputProduk" placeholder="Masukkan Nama Produk"/>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-primary mb-3">Telusuri</button>
                </div>
                </form>
            </div>
            <div class="col-3">
                <Card>
                    <h3>Rekomendasi Produk</h3>
                </Card>       
            </div>   
            <div>
                <Card>
                    
                    <Grid container>
                    {product.map((product,index)=>(
                        <div class ="m-3">
                            <Card style={{ width: '15rem'}}>
                            <Card.Img variant="top" src="https://s2.bukalapak.com/product-description-image/11197/large/beras%20premium%20SR%205%20kg.png" />
                            <Card.Body>
                            <Card.Title>Beras Sania 5 Kg</Card.Title>
                            <Card.Text>
                            Rp {product.harga}
                            </Card.Text>
                            <Card>         
                            </Card>
                            <div class="d-grid gap-2  mx-auto ">  
                            <Card class='bg-light' >
                                <Card.Title>{product.namaToko}</Card.Title>
                                <Card.Text>{product.alamat},Jakarta Pusat</Card.Text>
                            </Card>             
                            </div>         
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

export default Home
