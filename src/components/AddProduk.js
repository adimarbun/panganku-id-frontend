import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';

const AddProduk =() =>{
    return(
        <div class="container">
                <Card>
                    <h5 className='text-center my-3 text-upporcase'>Tambahkan Produk</h5>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Nama</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Deskripsi</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroup-sizing-default">Harga</span>
                        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <div class="input-group mb-3">
                        <input type="file" class="form-control" id="inputGroupFile02"/>
                        <label class="input-group-text" for="inputGroupFile02">Upload Gambar</label>
                    </div>
                    <div class='row'>
                        <div class='col'/>
                        <div class="d-grid gap-2 col-4 mx-auto my-2">
                            <button type="button" class="btn btn-danger">Simpan Produk</button>
                        </div>
                        <div class='col'/>
                    </div>
                    
                </Card> 
        </div>
    )
}
export default AddProduk