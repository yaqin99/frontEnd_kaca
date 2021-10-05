
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Api from '../services/api';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import ModalJenis from '../components/modalJenis.vue';
import ModalEditJenis from '../components/modalEditJenis.vue'
import ModalStok from '../components/modalStok.vue'
import ModalStokEdit from '../components/modalStokEdit.vue'



type stokType = {
    id_jenis_kaca:number,
    tanggal:string , 
    stok:number,
    harga_beli:number,
    harga_jual:number,
}


let id_jenis_kaca = ref() ;

let stokTampil = ref();
let id = ref<number>();
let idnya = ref();  

const dataStok = reactive<stokType[]>([])
const editModal = reactive<stokType[]>([])

const munculTableStok = async (i:number) => {
    id.value = i ; 
    idnya.value = i;
    stokTampil.value = true ; 
    id_jenis_kaca.value = i;
    
    const response = await fetch('http://localhost:8181/stok/history/' + id.value);
    const data = await response.json();
    console.log(data)
          dataStok.splice(0,dataStok.length)
          if(data.length > 0 ){
              data.forEach((d: any) => {
                dataStok.push({
                  id_jenis_kaca:d.id_jenis_kaca,
                  tanggal:d.tanggal ,
                  stok:d.stok, 
                  harga_beli:d.harga_beli, 
                  harga_jual:d.harga_jual,
                })
              });
            }
      console.log(dataStok)
};


type editJenisType = {
    nama:string , 
    panjang:string , 
    lebar:string , 
    tebal:string,
}
const idJenis = ref();
const editJenisBody = reactive<editJenisType[]>([])

const editJenis = async (i:number) => {
  idJenis.value = i ; 
  const response = await fetch('http://localhost:8181/jenis?id=' + idJenis.value);
  const data = await response.json();
          
          if(data.length > 0 ){
              data.forEach((sub: any) => {
                editJenisBody.push({
                  nama:sub.nama , 
                  panjang:sub.panjang , 
                  lebar:sub.lebar,
                  tebal:sub.tebal,
                })
              });
            }
            console.log(editJenisBody)
};




const tableStokHide = () => {
  stokTampil.value = false ; 
};

const edit = async () => {
const response = await fetch('http://localhost:8181/stok/history/' + id.value);
    const data = await response.json();
          editModal.splice(0,editModal.length)
          if(data.length > 0 ){
              data.forEach((d: any) => {
                editModal.push({
                  id_jenis_kaca:d.id_jenis_kaca,
                  tanggal:d.tanggal, 
                  stok:d.stok,
                  harga:d.harga,
                  
                })
              });
            }
            console.log(editModal)
};
  
const idStok = ref()
const tambahStok = ()=> {
  idStok.value = id.value;
};



const inputJenis = async (el:any) => {
  try {
      const data = await Api.postResource('/jenis',{nama:el.nama , panjang:el.panjang , lebar:el.lebar, tebal:el.tebal},'POST')
      dataJenis.splice(0,dataJenis.length);
      const response = await fetch('http://localhost:8181/jenis/listjenis');
      const sample = await response.json();
          
          if(sample.length > 0 ){
              sample.forEach((d: any) => {
                dataJenis.push({
                      id:d.id,
                      nama : d.nama , 
                      panjang : d.panjang , 
                      lebar : d.lebar , 
                      tebal : d.tebal , 
                      stok:d.stok,
                })
              });
            }
          
          el.nama.value = '' ; 
          el.panjang.value = '' ; 
          el.lebar.value = '' ; 
          el.tebal.value = '' ; 
          
  }
  catch(err){
      console.log(err)
  }
}; 



const inputStok = async (sam:any)=> {
  try {
      const data = await Api.postResource('/stok',{id_jenis_kaca:id_jenis_kaca.value , tanggal:sam.tanggal , stok:sam.stok , harga_beli:sam.harga_beli , harga_jual:sam.harga_jual},'POST')
      dataStok.splice(0,dataStok.length);
      const response = await fetch('http://localhost:8181/stok/history/' + id.value);
      const ambil = await response.json();
          dataStok.splice(0,dataStok.length)
          if(ambil.length > 0 ){
              ambil.forEach((d: any) => {
                dataStok.push({
                  id_jenis_kaca:d.id_jenis_kaca,
                  tanggal:d.tanggal, 
                  stok:d.stok,
                  harga_beli:d.harga_beli,
                  harga_jual:d.harga_jual,
                })
              });
            }

          // stokKaca.tanggal = '' ; 
          // stokKaca.stok = '' ; 
          // stokKaca.harga = '' ; 

      const res = await fetch('http://localhost:8181/jenis/listjenis');
      const sample = await res.json();
      dataJenis.splice(0,dataJenis.length)
          if(sample.length > 0 ){
              sample.forEach((d: any) => {
                dataJenis.push({
                  id:d.id,
                  nama : d.nama , 
                  panjang : d.panjang , 
                  lebar : d.lebar , 
                  tebal : d.tebal , 
                  stok:d.stok,
                  
                })
              });
            }
  }
  catch(err){
      console.log(err)
  }
};

type jenisType = {
    id:number,
    nama : string , 
    panjang : number , 
    lebar : number , 
    tebal : number , 
    stok:number,
}
const simpanEdit = () => {
  console.log(editJenisBody)
}

const dataJenis = reactive<jenisType[]>([])
console.log('Ini Data Jenis')
console.log(dataJenis)


onMounted(async() =>{

const response = await fetch('http://localhost:8181/jenis/listjenis');
const data = await response.json();

          if(data.length > 0 ){
              data.forEach((sub: any) => {
                dataJenis.push({
                  id:sub.id,
                  nama : sub.nama , 
                  panjang : sub.panjang , 
                  lebar : sub.lebar , 
                  tebal : sub.tebal , 
                  stok:sub.stok,
                
                })
              });
            }
          }
      )
      
</script>



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
          <button class="btn btn-primary col-4 bi bi-plus-circle" type="button" @click="isTambah = true" data-bs-toggle="modal" data-bs-target="#TambahJenisKaca">Jenis kaca</button>    
        </div>
        
        <ModalJenis @inputJenis="inputJenis"></ModalJenis>

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
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(jenis, i) in dataJenis" :key="jenis.id" >
              <td @click="munculTableStok(jenis.id)">{{ i + 1}}</td>
              <td @click="munculTableStok(jenis.id)">{{ jenis.nama}}</td>
              <td @click="munculTableStok(jenis.id)">{{ jenis.panjang}} x {{ jenis.lebar}} x {{ jenis.tebal}}</td>
              <td @click="munculTableStok(jenis.id)">{{ jenis.stok }}</td>
              <!-- SAYA BUAT SEPERTI INI SEBAB KALAU TR NYA YANG DI BERI FUNGSI MUNCUL TABLE TOMBOL EDIT TIDAK BISA DI AKSES  -->
              <td><button type="button" class="btn btn-info" @click="editJenis(jenis.id)" data-bs-toggle="modal" data-bs-target="#editJenis" >Edit</button></td>
            </tr>    
          </tbody>
        </table>
        </div>
        <div class="col-sm-6 mt-5 "  v-if="stokTampil">
          <div class="row">
            <div class="col-6">
              <div class="col-6">
                <h1 class="fw-bold text-end border">STOK</h1>
              </div>
            </div>
            <div class="col-5 px-3 d-flex align-items-center">
              <div class="col-12 d-sm-flex justify-content-end">
                <button type="button" class="btn btn-primary" @click="tambahStok()"  data-bs-toggle="modal" data-bs-target="#tambahstok" ><i class="bi bi-plus-circle"></i></button>
                <button type="button" class="btn btn-secondary" @click="tableStokHide()" ><i class="bi bi-arrow-counterclockwise"></i></button>
              </div> 
                
                  <ModalStok @inputStok ="inputStok"></ModalStok>
                    </div>
                </div>    
                <table class="table table-bordered text-center" >
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Harga Beli</th>
                            <th>Harga Jual</th>
                            <th>Jumlah</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stk) in dataStok" :key="stk.id">
                            <td>{{stk.tanggal}}</td>
                            <td>{{'Rp.' + stk.harga_beli}}</td>
                            <td>{{'Rp.' + stk.harga_jual}}</td>
                            <td>{{stk.stok}}</td>  
                            <td><button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdit" @click="edit()">Edit</button></td>
                        </tr>                      
                    </tbody>
                </table>
                
            </div>
        </div>

        <!-- MODAL EDIT  -->

        <ModalStokEdit></ModalStokEdit>


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

        <!-- MODAL EDIT JENIS KACA  -->
        <ModalEditJenis :nama="editJenisBody.nama" :panjang="editJenisBody.panjang" :tebal="editJenisBody.tebal" :lebar="editJenisBody.lebar" @simpanEdit="simpanEdit"></ModalEditJenis>


    </div>

    
</template>
