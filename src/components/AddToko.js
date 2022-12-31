import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';

const AddToko = () => {

    const [nameToko, setNameToko] = useState('');
    const [addressToko, setAddressToko] = useState('');
    const [codePosToko, setCodePosToko] = useState('');
    const [noHpToko, setNoHpToko] = useState('');

    const onClickSaveToko = (e) => {
        e.preventDefault()
        console.log("submit do something here ==>")
        console.log("nameToko:", nameToko)
        console.log("addressToko:", addressToko)
        console.log("codePosToko:", codePosToko)
        console.log("noHpToko:", noHpToko)
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
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">Kode Pos</span>
                        <input required value={codePosToko} onChange={onChangeCodePosToko} type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-default">No Hp</span>
                        <input required value={noHpToko} onChange={onChangeNoHpToko} type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    </div>
                    <div class='row'>
                        <div class='col' />
                        <div class="d-grid gap-2 col-4 mx-auto my-2">
                            <button type="submit" class="btn btn-warning" >Buat Toko</button>
                        </div>
                        <div class='col' />
                    </div>
                </Card>
            </form>
        </div>
    )
}
export default AddToko