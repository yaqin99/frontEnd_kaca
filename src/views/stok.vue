<template>
  <div class="container"> 
    <div class="row  mt-5">
      <div class="col-sm-6">
        <router-link to="/" class="btn btn-info">
          <span class="bi bi-chevron-left text-white"></span>
        </router-link>
      </div>
      <div class="col-sm-6 ">
      <div class="d-grid gap-2  d-md-block text-end ">
        <button class="btn btn-primary col-4 bi bi-plus-circle" type="button" @click="isTambah = true" data-bs-toggle="modal" data-bs-target="#TambahJenisKaca"> Jenis kaca</button>    
      </div>
      <div class="modal fade" id="TambahJenisKaca" tabindex="-1" aria-labelledby="TambahJenisKaca" aria-hidden="true">
        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="alert alert-success modal-header text-center">
                                <h5 class="alert-heading" id="TambahJenisKaca">Tambah Jenis Kaca</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <input type="text" class="form-control" v-model="jenisKacaBody.nama" placeholder="Nama Kaca">
                                    </div>
                                    <div class="col-12 row mt-3">
                                        <label class="col-sm-3 col-form-label fw-bold">Ukuran(cm)</label>
                                        <div class="col-sm-3">
                                            <input type="text" v-model="jenisKacaBody.panjang" class="form-control text-center" placeholder="Panjang">
                                        </div>
                                        <div class="col-sm-3 ">
                                            <input type="text" v-model="jenisKacaBody.lebar" class="form-control text-center" placeholder="Lebar">
                                        </div>
                                        <div class="col-sm-3 ">
                                            <input type="text" v-model="jenisKacaBody.tebal" class="form-control text-center" placeholder="Tebal">
                                        </div>
                                    </div>
                                   
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                <button type="button" class="btn btn-primary" @click="inputJenis()" data-bs-dismiss="modal">Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        <div class="row">
            <div class="col-sm-6 mt-5">
                <table class="table table-borderless table table-striped text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Ukuran</th>
                            <th>Total Stok</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stok, i) in dataStok" :key="stok.id">
                            <td>{{ i + 1}}</td>
                            <td @click="munculTableStok(stok.id_jenis_kaca)">{{ stok.nama}}</td>
                            <td>{{ stok.panjang}} x {{ stok.lebar}} x {{ stok.tebal}}</td>
                            <td>{{ stok.stok > 0 ? stok.stok : stok.optional_stok}}</td>
                        </tr>    
                    </tbody>
                </table>
            </div>
            <div class="col-sm-6 mt-5 "  v-show="stokTampil">
                <div class="row">
                    <div class="col-6">
                        <div class="col-6">
                            <h1 class="fw-bold text-end border">STOK</h1>
                        </div>
                    </div>
                    <div class="col-5 px-3 d-flex align-items-center">
                        <div class="col-12 d-flex justify-content-end">
                             <button type="button" class="btn btn-primary" @click="ambilJenis()" data-bs-toggle="modal" data-bs-target="#tambahstok" ><i class="bi bi-plus-circle"></i></button>
                             <button type="button" class="btn btn-secondary" @click="tableStokHide()" ><i class="bi bi-arrow-counterclockwise"></i></button>
                        </div>
                        <div class="modal fade" id="tambahstok" tabindex="-1" aria-labelledby="tambahstok" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="tambahstok">Tambah Stok</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                               <div class="form-group  mt-3">
                                     <div class="col-12 row mt-3 mb-3">
                                        <label class="col-sm-3 col-form-label fw-bold">Tentukan :</label>
                                            <div class="col-sm-5">
                                                <select class="form-select" v-model="stokKaca.id_jenis_kaca" aria-label="Default select example" >
                                                <option selected>Open this select menu</option>
                                                <option :value="jenis.id" v-for="jenis in dataJenis" :key="jenis.id">{{ jenis.nama}}</option>
                                                
                                                </select>
                                            </div>
                                            
                                    </div>  
                                    
                                        <input type="text" v-model="stokKaca.stok"  class="form-control" placeholder="Total Stok">
                                    </div>
                                    <div class="form-group  mt-3">
                                        <input type="text mt-3" v-model="stokKaca.harga" class="form-control" placeholder="Harga Beli">
                                    </div>
                                    <div class="form-group  mt-3">
                                        <input type="text" v-model="jumlah"  class="form-control" placeholder="Jumlah">
                                    </div>
                                    <div class="form-group  mt-3">
                                        <input type="date" v-model="stokKaca.tanggal"  class="form-control" placeholder="Jumlah">
                                    </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                <button type="button" class="btn btn-primary" @click="inputStok()" data-bs-dismiss="modal">Simpan</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>    
                <table class="table table-bordered text-center" >
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Harga Beli</th>
                            <th>Jumlah</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stk) in dataStokId" :key="stk.id">
                            <td>{{stk.tanggal}}</td>
                            <td>{{'Rp.' + stk.harga}}</td>
                            <td>{{stk.jumlah}}</td>  
                        </tr>                      
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <nav aria-label="d-grid gap-2 d-md-block">
                    <ul class="pagination">
                        <li class="page-item col-3 me-sm-5"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item col-3 text-center"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        </div>       
    </div>

    
</template>

<script setup lang="ts">
     import { onMounted, reactive, ref } from 'vue';
     import Api from '../services/api';

    
     type stokType = {
         nama : string , 
         panjang : number , 
         lebar : number , 
         tebal : number , 
         tanggal:string , 
         harga : number , 
         stok : number , 
     }
    
    
    
    let selected = '';
    
    let stokTampil = ref();
    let id = ref<number>();
    // const munculTableStok = (i:number) => {
    //      id.value = i ; 
    //      console.log('ini id Value' + id.value)
    //      stokTampil.value = true ; 
    //      dataStokId.splice(0,dataStokId.length);
    //      tampilStok();
    // };
    const tableStokHide = () => {
        stokTampil.value = false ; 
    };
    
    

    const jenisKacaBody = {
        nama: '' , 
        panjang : '' ,
        lebar: '',
        tebal: '' , 
        stok:0,
    }

    const stokKaca =  {
        
        id_jenis_kaca: '', 
        tanggal:'',
        stok:'',
        harga:'',
       
    }

    console.log(stokKaca)
    
   
     
     const dataStok = reactive<stokType[]>([])
     const dataStokId = reactive<stokType[]>([])
    console.log(dataStokId)


    // const inputJenis = async () => {
    //     try {
    //         const data = await Api.postResource('/jenis',jenisKacaBody,'POST')
    //         dataStok.splice(0,dataStok.length);
    //         const ambil = await Api.getStok('/tampil/stok',dataStok,0);
           
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }; 


    // const ambilJenis = async () => {
    //     const ambil = await Api.getJenis('/jenis',dataJenis)
    // };


    const jumlah = ref();
    console.log('ini adalah jumlahnya'+jumlah.value)
    // const inputStok = async ()=> {
    //     try {
    //         const data = await Api.postResource('/stok',stokKaca,'POST')
    //          dataStok.splice(0,dataStok.length);
    //         const ambil = await Api.getStok('/tampil/stok',dataStok,0,jumlah.value);
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // };

    
    // const tampilStok = async () => {
    //     const url = await'/tampil/stok/history/' + id.value ;
    //     const ambil = await Api.getStok(url,dataStokId)
    // };
     type jenisType = {
         nama : string , 
         panjang : number , 
         lebar : number , 
         tebal : number , 
         
     }
    
    const dataJenis = reactive<jenisType[]>([])
    console.log(dataJenis)

     onMounted(async() =>{
    
      const response = await fetch('http://localhost:8181/jenis');
      const data = await response.json();
                
                if(data.length > 0 ){
                    data.forEach((d: any) => {
                      dataJenis.push({
                        nama : d.nama , 
                        panjang : d.panjang , 
                        lebar : d.lebar , 
                        tebal : d.tebal , 
                       
                       
                      })
                    });
                  }
                }
            )
</script>
