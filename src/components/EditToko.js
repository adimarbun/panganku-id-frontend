import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';

const EditToko = () => {

    const [nameToko, setNameToko] = useState('');
    const [addressToko, setAddressToko] = useState('');
    const [codePosToko, setCodePosToko] = useState('');
    const [noHpToko, setNoHpToko] = useState('');
    const history = useHistory();
    const [listProvinsi, setListProvinsi] = useState([]);
    const [provinsiIdSelected, setProvinsiIdSelected] = useState(null)
    const [listKota, setListKota] = useState([]);
    const [kotaIdSelected, setKotaIdSelected] = useState(null)
    let {id} = useParams();

    useEffect(() => {
        getListProvinsi();
        getMyToko();
    }, []);

    const getMyToko = async() => {
        console.log("csdasd",id);
        const res = await axios.get(`http://localhost:5000/toko-by-id/${3}`);
        if(res.data){
            setNameToko(res.data.nama_toko);
            setAddressToko(res.data.alamat);
            setNoHpToko(res.data.no_hp);
            setCodePosToko(res.data.kode_pos);
            setProvinsiIdSelected(res.data.province.id);
            setKotaIdSelected(null)
            setListKota([])
            getListKota(res.data.province.id);
            setKotaIdSelected(res.data.kotum.id);
        }   
    }

    const onClickSaveToko = async(e) => {
        var userId = window.sessionStorage.getItem("userId");
        e.preventDefault()
        try {
            await axios.put('http://localhost:5000/toko', {
                "id" :id,
                "province_id" : provinsiIdSelected,
                "kota_id" : kotaIdSelected,
                "user_id" : userId,
                "alamat" : addressToko,
                "nama_toko" : nameToko,
                "kode_pos" : codePosToko,
                "no_hp" : noHpToko
            });
            history.push("/toko");
        } catch (error) {
            if (error.response) {
                console.log("err",error)
            }
        }
    }

    const axiosJWT = axios.create();
    const getListProvinsi = async() => {
        const response = await axiosJWT.get('http://localhost:5000/provinces', {
        });
        setListProvinsi(response.data)
    }

    const getListKota = async(id) => {    
        const response = await axiosJWT.get(`http://localhost:5000/kota/${id}`, {
        });
        setListKota(response.data)
    }

    const onChangeNameToko = (e) => {
        console.log(e.target.value, " name toko")
        setNameToko(e.target.value)
    }

    const onChangeAddressToko = (e) => {
        console.log(e.target.value, " address toko")
        setAddressToko(e.target.value)
    }

    const onChangeCodePosToko = (e) => {
        console.log(e.target.value, " code pos toko")
        setCodePosToko(e.target.value)
    }

    const onChangeNoHpToko = (e) => {
        console.log(e.target.value, " no toko")
        setNoHpToko(e.target.value)
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

    return (
        <div class="container">
            <form onSubmit={onClickSaveToko}>
                <Card>
                    <h5 className='text-center my-3 text-upporcase'>Tambahkan Toko</h5>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Nama Toko</span>
                        <input required value={nameToko} onChange={onChangeNameToko} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Alamat</span>
                        <input required value={addressToko} onChange={onChangeAddressToko} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
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
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Kode Pos</span>
                        <input required value={codePosToko} onChange={onChangeCodePosToko} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">No Hp</span>
                        <input required value={noHpToko} onChange={onChangeNoHpToko} type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div class='row mt-5 mb-4'>
                    
                <div class='col' />
                <div class='col' />
            </div>
                    <div class='row'>
                        <div class='col' />
                        <div class="d-grid gap-2 col-4 mx-auto my-2">
                            <button type="submit" class="btn btn-warning" >Edit Toko</button>
                        </div>
                        <div class='col' />
                    </div>
                </Card>
            </form>
        </div>
    )
}
export default EditToko