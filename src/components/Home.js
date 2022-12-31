/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';
import { CardActionArea, Grid } from '@mui/material';
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
    const [product, setProduct] = useState([]);
    const [isProductLoading, setProductLoading] = useState(true);
    const [listProvinsi, setListProvinsi] = useState([]);
    const [provinsiIdSelected, setProvinsiIdSelected] = useState(null)
    const [listKota, setListKota] = useState([]);
    const [kotaIdSelected, setKotaIdSelected] = useState(null)
    const [searchProduct, setSearchProduct] = useState("")

    useEffect(() => {
        refreshToken();
        getUsers();
        getProduct();
        getListProvinsi()
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

    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const getProduct = async () => {
        console.log("provinsiIdSelected ==>", provinsiIdSelected)
        console.log("kotaIdSelected ==>", kotaIdSelected)
        console.log("searchProduct ==>", searchProduct)
        setProductLoading(true)

        //TODO: this is mock timeout 
        await timeout(300)
        let dataProduct = [{
            'nama': 'beras a',
            'imgUrl': 'https://s2.bukalapak.com/product-description-image/11197/large/beras%20premium%20SR%205%20kg.png',
            'harga': '60,000',
            'namaToko': 'Toko Budi',
            'alamat': 'Jl Merdeka'
        },
        {
            'nama': 'beras b',
            'harga': '59,500',
            'imgUrl': 'https://s2.bukalapak.com/product-description-image/11197/large/beras%20premium%20SR%205%20kg.png',
            'namaToko': 'Toko Cempaka',
            'alamat': 'Jl Kemana Aja'
        }, {
            'nama': 'beras a',
            'harga': '69,000',
            'imgUrl': 'https://s2.bukalapak.com/product-description-image/11197/large/beras%20premium%20SR%205%20kg.png',
            'namaToko': 'Toko Putri',
            'alamat': 'Jl Kenangan'
        }, {
            'nama': 'beras a',
            'harga': '61,000',
            'imgUrl': 'https://s2.bukalapak.com/product-description-image/11197/large/beras%20premium%20SR%205%20kg.png',
            'namaToko': 'Toko Cahaya',
            'alamat': 'Jl Medan Utara'
        }];
        setProduct(dataProduct);
        setProductLoading(false)
    }

    const getListProvinsi = () => {
        let res = [
            {
                "id": "1101",
                "name": "KABUPATEN SIMEULUE",
            },
            {
                "id": "1102",
                "name": "KABUPATEN ACEH SINGKIL",
            },
            {
                "id": "1103",
                "name": "KABUPATEN ACEH SELATAN",
            }]
        setListProvinsi(res)
    }

    const getListKota = (id) => {
        console.log("provinsiIdSelected ==>", id)
        let res = [
            {
                "id": "1",
                "name": "Medan",
            },
            {
                "id": "2",
                "name": "Padang Sidempuan",
            },
            {
                "id": "33",
                "name": "Jakarta",
            }]
        setListKota(res)
    }

    const onchangeProvince = (e) => {
        setProvinsiIdSelected(e.target.value)
        setKotaIdSelected(null)
        setListKota([])
        getListKota(e.target.value);
    }

    const onchangeKota = (e) => {
        setKotaIdSelected(e.target.value)
    }

    const onSearchProudct = (e) => {
        e.preventDefault();
        setSearchProduct("")
        getProduct();
    }

    const onChangeSearch = (e) => {
        setSearchProduct(e.target.value)
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
            <div class='row mt-5 mb-4'>
                <div class='col' />
                <div class='col'>
                    <div class="mb-2 mt-2">
                        <Form.Select aria-label="Provinsi" value={provinsiIdSelected ?? ""} onChange={onchangeProvince}>
                            <option>Provinsi</option>
                            {listProvinsi.map((e, i) => (<option value={e.id}>{e.name}</option>))}
                        </Form.Select>
                    </div>
                    <div class="mb-2">
                        <Form.Select aria-label="Kota" value={kotaIdSelected ?? ""} onChange={onchangeKota}>
                            <option>Kota</option>
                            {listKota.map((e, i) => (<option value={e.id}>{e.name}</option>))}
                        </Form.Select>
                    </div>
                </div>
                <div class='col' />
            </div>
            <div class="mb-5">
                <form class="row g-3" onSubmit={onSearchProudct}>
                    <div class="col">
                    </div>
                    <div class="col">
                        <input type="text" class="form-control" id="inputProduk" placeholder="Masukkan Nama Produk" onChange={onChangeSearch} value={searchProduct} />
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
                {isProductLoading ? <div class="d-flex justify-content-center" >
                    <div class="spinner-border m-5" role="status" />
                </div> : <Card>
                    <Grid container>
                        {product.map((product, index) => (
                            <div class="m-3">
                                <Card style={{ width: '15rem' }}>
                                    <Card.Img variant="top" src={product.imgUrl} />
                                    <Card.Body>
                                        <Card.Title>{product.nama}</Card.Title>
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
                </Card>}
            </div>
        </div >
    )
}

export default Home
