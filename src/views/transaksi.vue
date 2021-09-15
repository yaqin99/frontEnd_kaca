<script lang="ts">
import { defineComponent} from 'vue'
    type pembeli = {
        id : number;
        nama: string;
        hp: string;
        alamat: string;
    }
    type jenis_kaca = {
        id: number;
        nama: string;
        panjang: number;
        lebar: number;
        tebal: number;
    }
    export default defineComponent({
        name: 'Page2',
        data() {
            return {
                harga:[{price: 0}],
                panjang:0, lebar:0 , tebal: 0,
                Buyer: { id: 0, nama: 'Umar', hp: '085231339223', alamat: 'Rombasan'},
                Pilihan:'',
                opsi: [
                    {id: 0, nama:'Kaca Jenis 1'}, {id: 0, nama:'Kaca Jenis 2'},
                ],
                jenis:[
                    {id: 0, nama:'Kaca Jenis 1', panjang: 34, lebar:45 , tebal: 2 },
                    {id: 1, nama:'Kaca Jenis 2', panjang: 21, lebar:45 , tebal: 2 }
                ]
                
            }
        },
        methods: {
         orderKaca(){
             this.jenis.push({
                 id: this.jenis.length+1, nama: this.Pilihan, panjang: this.panjang, lebar: this.lebar, tebal: this.tebal
             })
             this.Pilihan = '' ;
             this.panjang = 0;
             this.lebar = 0;
             this.tebal = 0;
             
         },
         hargaKaca(){
             let arge = (this.panjang*this.lebar) * 2000;
             this.harga.push({price: arge})
         }   
        }
    

    })
    
    
</script>


<template>

    <div class="container">
        <div class="row ">
            <div class="col">
                <h1 class="text-center">Toko Anugerah</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-7">
                <form>
                    <div class="col-12 row mt-3">
                        <label for="jenis_kaca" class="col-sm-3 col-form-label fw-bold">JENIS KACA</label>
                        <div class="col-9">
                            <select v-model="Pilihan" class=" col-sm-8 form-select">
                                <option disabled value="">Pilih Jenis Kaca</option>
                                <option v-for="option in opsi" :key="option.id">{{option.nama}}</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="col-12 row mt-3">
                        <label for="ukuran" class="col-sm-3 col-form-label fw-bold">Ukuran</label>
                        <div class="col-sm-3">
                           <input type="text" class="form-control text-center" placeholder="Panjang" v-model="panjang">
                        </div>
                        <div class="col-sm-3 offset-sm-1">
                            <input type="text" class="form-control text-center" placeholder="Lebar" v-model="lebar">
                         </div>
                    </div>

                    <div class="col-12 row mt-3">
                        <label for="Jumlah" class="col-sm-3 col-form-label fw-bold">JUMLAH</label>
                        <div class="col-sm-2">
                           <input type="text" class="form-control text-center" placeholder="Jumlahs">
                        </div>

                        <div class="col-sm-4 offset-sm-1 ">
                            <div class="input-group sm-2">
                                <span class="input-group-text" id="harga"><i class="bi bi-cash-coin"></i></span>
                                <input type="text" class="form-control" placeholder="Rp. 0" aria-label="Username" aria-describedby="basic-addon1">
                            </div>

                        </div>

                        <div @click="orderKaca(); hargaKaca()" class="col-sm-2 d-flex flex-column">
                            <a href="#" class="btn btn-primary">
                                <span class="bi bi-check-circle"></span>
                            </a>
                        </div>
                    </div>
                </form> 

                <table class="table table-bordered text-center mt-5">
                    <thead class="table-secondary">
                        <tr>
                            <th class="col-sm-1">#</th>
                            <th class="col-sm-3">Kaca</th>
                            <th class="col-sm-3">Ukuran</th>
                            <th class="col-sm-2">Jumlah</th>
                            <th class="col-sm-10 ">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(kaca, i) in jenis" :key="i" >
                            <td>{{i+1}}</td>
                            <td>{{kaca.nama}}</td>
                            <td>{{kaca.panjang}} x {{kaca.lebar}}</td>
                            <td>1</td>
                            <td>{{}}</td>
                        </tr>
                    </tbody>
                </table>                                    
            </div>
            
                <div class="col-sm-4 offset-sm-1">
                    <form>
                    <div class="row">
                        <div class="col-12 row mt-3">
                            <label class="col-sm-3 col-form-label fw-bold">Nama</label>
                            <div class="col-sm-9 mt-1">
                                <div class="input-group input-group-sm">
                                    <button class="input-group-text">
                                        <span class="fas fa-search"></span>
                                    </button>
                                    <input   type="text" class="form-control" placeholder="Username">
                                </div>                               
                            </div>
                            <label for="hp" class="col-sm-3 col-form-label fw-bold">HP</label>
                            <div class="col-sm-9 mt-1">
                                <div class="input-group input-group-sm">
                                    <input type="text" class="form-control" placeholder="Input">
                                </div>
                            </div>
                             <label for="alamat" class="col-sm-3 col-form-label fw-bold">Alamat</label>
                            <div class="col-sm-9 mt-1">
                                <textarea class="form-control form-control-xg" id="addres"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12  d-sm-flex justify-content-sm-end mt-2">
                             <router-link to="/" class="btn btn-info text-white">
                                 <i class="fas fa-history"></i>                                 
                             </router-link>                           
                        </div>

                        <div class=" col-12 row mt-2 py-4 px-2 bg-secondary" style=" border-radius: 15px;">
                            <label for="bayar" class="col-sm-3 col-form-label fw-bold ">BAYAR</label>
                            <div class="col-sm-9 ">
                                <input type="text" class="form-control" placeholder="Input">
                            </div>
                            <label for="nama" class="col-sm-3 col-form-label fw-bold mt-4">KEMBALI</label>
                            <div class="col-sm-9 mt-4">
                                <input type="text" class="form-control" placeholder="Input">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="row">
                                <div class=" col-5  d-flec d-flex-column rounded btn btn-primary btn-md mt-2">
                                    <span>SIMPAN</span>                                
                              </div>
                              
                              <div class=" col-5 offset-1 d-flec d-flex-column rounded btn btn-danger btn-md mt-2">
                                <span class="bi bi-printer"></span>
                              </div>

                            </div>
                        </div>
                    </div>
                </form>            
            </div>
        </div>
    </div>
</template>
