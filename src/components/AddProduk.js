import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';

const AddProduk = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [harga, setHarga] = useState('');
    const [file, setFile] = useState('');

    const history = useHistory();


    const onClickSaveProduct = async (e) => {
        e.preventDefault()

        var tokoId = window.sessionStorage.getItem("tokoId");
        const formData = new FormData();
        console.log("file ====>", file)
        formData.append("file", file);
        formData.append("nama_produk", name);
        formData.append("deskripsi_produk", description);
        formData.append("harga_produk", harga);
        formData.append("toko_id", tokoId);
        try {
          await axios.post("http://localhost:5000/produk", formData, {
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

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        //setPreview(URL.createObjectURL(image));
      };


    return (
        <div class="container">
            <form onSubmit={onClickSaveProduct}>
                <Card>
                    <h5 className='text-center my-3 text-upporcase'>Tambahkan Produk</h5>
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
                        <input type="file" class="form-control" id="inputGroupFile02"  onChange={loadImage} />
                        <label class="input-group-text" for="inputGroupFile02">Upload Gambar</label>
                    </div>
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
export default AddProduk