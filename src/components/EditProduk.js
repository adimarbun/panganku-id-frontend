import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { useHistory, useParams } from 'react-router-dom';

const EditProduk = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [harga, setHarga] = useState('');
    const [stok, setStok] = useState('');
    const [file, setFile] = useState('');
    const [produk,setProduk] = useState('');
    let {id} = useParams();

    const history = useHistory();

    useEffect(async() => {
        console.log("vvvvv",id);  
        await getProduk();  
    }, []);

    const axiosJWT = axios.create();

    const getProduk = async (e) =>{
        const res = await axios.get(`http://localhost:5000/produk/${id}`, {
        });
        console.log("ress",res.data);
        setProduk(res.data);
        setName(res.data.nama_produk);
        setDescription(res.data.deskripsi_produk);
        setHarga(res.data.harga_produk);
        setStok(res.data.stok);
    }

    const onClickSaveProduct = async (e) => {
        e.preventDefault()

        var tokoId = window.sessionStorage.getItem("tokoId");
        const formData = new FormData();
        console.log("file ====>", file)
        formData.append("id", id);
        formData.append("nama_produk", name);
        formData.append("deskripsi_produk", description);
        formData.append("harga_produk", harga);
        formData.append("stok", stok);
        formData.append("toko_id", tokoId);
        try {
          await axios.put("http://localhost:5000/produk", formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          });

          history.push("/toko");
        } catch (error) {
          console.log(error);
        }
    }

    const onChangeName = (e) => {
        console.log(e.target.value, "name")
        setName(e.target.value)
    }

    const onChangeDescription = (e) => {
        console.log(e.target.value, "description")
        setDescription(e.target.value)
    }

    const onChangeharga = (e) => {
        console.log(e.target.value, "harga")
        setHarga(e.target.value)
    }

    const onChangeStok = (e) => {
        console.log(e.target.value, "stok")
        setStok(e.target.value)
    }

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
      };


    return (
        <div class="container">
            <form onSubmit={onClickSaveProduct}>
                <Card>
                    <h5 className='text-center my-3 text-upporcase'>Edit Produk</h5>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Nama</span>
                        <input required value={name} onChange={onChangeName} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Deskripsi</span>
                        <input required value={description} onChange={onChangeDescription} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Harga</span>
                        <input required value={harga} onChange={onChangeharga} type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Jumlah Stok</span>
                        <input required value={stok} onChange={onChangeStok} type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    {/* <div class="input-group mb-3">
                        <input type="file" class="form-control" id="inputGroupFile02"  onChange={loadImage} />
                        <label class="input-group-text" for="inputGroupFile02">Upload Gambar</label>
                    </div> */}
                    <div class='row'>
                        <div class='col' />
                        <div class="d-grid gap-2 col-4 mx-auto my-2">
                            <button type="submit" class="btn btn-danger" >Simpan Produk</button>
                        </div>
                        <div class='col' />
                    </div>
                </Card>
            </form>
        </div>
    )
}
export default EditProduk;