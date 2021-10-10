
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import Api from '../services/api';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import ModalJenis from '../components/modalJenis.vue';
import ModalStok from '../components/modalStok.vue'
import * as alertify from 'alertify.js';
import { array } from 'yup/lib/locale';


type stokType = {
    id:number ; 
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

// const jumlahData = ref();

const stokPage = ref([1])
const index = ref()
const dipilih = ref()
const indexStok = ref(1)

const munculTableStok = async (i:number) => {
    id.value = i ; 
    idnya.value = i;
    indexStok.value = 1 ;
    stokTampil.value = true ; 
    id_jenis_kaca.value = i;
     dipilih.value = true ; 
    const ambilArr = await fetch('http://localhost:8181/stok/pagingHistory/' + id.value);
    const result = await ambilArr.json();
    const arrLength = await result.length;
    const pagingLength = Math.ceil(arrLength / 3);
    stokPage.value.length = pagingLength;

    
    const response = await fetch('http://localhost:8181/stok/history/' + id.value);
    const data = await response.json();
          dataStok.splice(0,dataStok.length)
          if(data.length > 0 ){
              data.forEach((d: any) => {
                dataStok.push({
                  id:d.id,
                  id_jenis_kaca:d.id_jenis_kaca,
                  tanggal:d.tanggal ,
                  stok:d.stok, 
                  harga_beli:d.harga_beli, 
                  harga_jual:d.harga_jual,
                })
              });
            }
};


type editJenisType = {
    nama:string , 
    panjang:string , 
    lebar:string , 
    tebal:string,
}
const idJenis = ref();
const editJenisBody = reactive<editJenisType[]>([])
const jumlahData = ref();

const coba = ref([1])

const namaEdit = ref();
const panjangEdit = ref();
const lebarEdit = ref();
const tebalEdit = ref();
const idEdit = ref(1);

const isEdit = ref(false); 


const editJenis = async (i:number) => {
  isEdit.value = true ; 
  const data = dataJenis[i]
  
  idEdit.value = data.id ; 
  namaEdit.value = data.nama ; 
  panjangEdit.value = data.panjang ; 
  lebarEdit.value = data.lebar ; 
  tebalEdit.value = data.tebal ; 
          
          
              
};




const tableStokHide = () => {
  stokTampil.value = false ; 
};

// const edit = async () => {
// const response = await fetch('http://localhost:8181/stok/history/' + id.value);
//     const data = await response.json();
//           editModal.splice(0,editModal.length)
//           if(data.length > 0 ){
//               data.forEach((d: any) => {
//                 editModal.push({
//                   id_jenis_kaca:d.id_jenis_kaca,
//                   tanggal:d.tanggal, 
//                   stok:d.stok,
//                   harga:d.harga,
                  
//                 })
//               });
//             }
//             console.log(editModal)
// };
  
const idStok = ref()
const hargaBeliEdit = ref() ; 
const hargaJualEdit = ref() ; 
const tanggalEdit = ref('') ; 
const jumlahEdit = ref() ; 
const tambahStok = ()=> {
  idStok.value = id.value;
  hargaBeliEdit.value = '' ; 
  hargaJualEdit.value = '' ; 
  tanggalEdit.value = '' ; 
  jumlahEdit.value = '' ;
};


const newNama = ref('');
const newPanjang = ref();
const newLebar = ref() ; 
const newTebal = ref();

const inputJenis = async (el:any) => {
  try {
      console.log('input called')
      newNama.value = el.nama ; 
      newPanjang.value = el.panjang ; 
      newLebar.value = el.lebar ; 
      newTebal.value = el.tebal ; 
      const data = await Api.postResource('/jenis',{nama:newNama.value , panjang:newPanjang.value , lebar:newLebar.value, tebal:newTebal.value},'POST')
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
          
         
  }
  catch(err){
      console.log(err)
  }
}; 
const updateJenis = async (sub:any) => {
  namaEdit.value = sub.nama ; 
  panjangEdit.value = sub.panjang ; 
  lebarEdit.value = sub.lebar ; 
  tebalEdit.value = sub.tebal ; 
  const response = await Api.putResource('/jenis/'+idEdit.value,{nama:namaEdit.value , panjang:panjangEdit.value , lebar:lebarEdit.value , tebal:tebalEdit.value} , 'PUT')
  dataJenis.splice(0,dataJenis.length);
  const takeAgain = await fetch('http://localhost:8181/jenis/listjenis');
      const sample = await takeAgain.json();
          console.log('yang di edit itu ' + namaEdit.value)
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
  isEdit.value = false ;
};
const idDelete = ref() ; 
const isDelete = ref()
const alert = (id:number) => {
  idDelete.value = id ;
alertify.confirm( 'Confirm Message', function(){ deleteJenis() }
                , function(){ alertify.error('Cancel')});


}

const deleteJenis = async () => {
      const hapusStok = await Api.deleteResource('/stok/' + idDelete.value , 'DELETE');
      const hapus = await Api.deleteResource('/jenis/'+ idDelete.value , 'DELETE');
      dataJenis.splice(0,dataJenis.length)
      const takeAgain = await fetch('http://localhost:8181/jenis/listjenis');
      const sample = await takeAgain.json();
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
      dataStok.splice(0,dataStok.length)
};



// const date = ref() ; 
// const sellPrice = ref() ; 
// const buyPrice = ref() ; 
// const totalStok = ref() ; 

const inputStok = async (sam:any)=> {
  try {

      const data = await Api.postResource('/stok',{id_jenis_kaca:id_jenis_kaca.value , tanggal:sam.tanggalEdit , stok:sam.stokEdit , harga_beli:sam.hargaBeliEdit , harga_jual:sam.hargaJualEdit},'POST')
      dataStok.splice(0,dataStok.length);
      const response = await fetch('http://localhost:8181/stok/history/' + id.value);
      const ambil = await response.json();
          dataStok.splice(0,dataStok.length)
          if(ambil.length > 0 ){
              ambil.forEach((d: any) => {
                dataStok.push({
                  id:d.id ,
                  id_jenis_kaca:d.id_jenis_kaca,
                  tanggal:d.tanggal, 
                  stok:d.stok,
                  harga_beli:d.harga_beli,
                  harga_jual:d.harga_jual,
                })
              });
            }
      hargaBeliEdit.value = '' ; 
      hargaJualEdit.value = '' ; 
      tanggalEdit.value = '' ; 
      jumlahEdit.value = '' ;

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



const idStokEdit = ref() ; 
const munculModalEditStok = async (i:number) => {
    const data = dataStok[i];
    // idStokEdit.value = data.
    idStokEdit.value = data.id ; 
    const convert = data.tanggal.split("")  
    const dateValid =convert[0] + convert[1] + convert[2] + convert[3] +  '-' + convert[5] + convert[6] + '-' + convert[8] + convert [9] 
    hargaBeliEdit.value = data.harga_beli ; 
    hargaJualEdit.value = data.harga_jual ; 
    tanggalEdit.value = dateValid ; 
    jumlahEdit.value = data.stok ; 
    console.log(dateValid)
    // const hapus = await Api.putResource('/'+id , {} , 'PUT')
};

const stokTanggal = ref() ; 
const stokJual = ref() ; 
const stokBeli = ref() ; 
const stokJumlah = ref() ; 
const idEditStok = ref() ; 

const editStok = async (data:any) => {
  idEditStok.value = data.id ; 
  stokTanggal.value = data.tanggalEdit ; 
  stokJual.value = data.hargaJualEdit ; 
  stokBeli.value = data.hargaBeliEdit ; 
  stokJumlah.value = data.stokEdit ; 
  console.log('ini yang lo cari')
  // console.log({
  //   stokTanggal:stokTanggal.value , 
  //   stokJual:stokJual.value , 
  //   stokBeli:stokBeli.value , 
  //   stokJumlah:stokJumlah.value , 
  // })
  const path = '/stok/' + idEditStok.value ; 
  console.log(path)
const response  = await Api.putResource(path , {id_jenis_kaca:id_jenis_kaca.value , tanggal:stokTanggal.value, stok:stokJumlah.value  , harga_beli : stokBeli.value, harga_jual:stokJual.value} , 'PUT');
dataStok.splice(0,dataStok.length);
const sample = await fetch('http://localhost:8181/stok/history/' + id.value);
      const ambil = await sample.json();
          dataStok.splice(0,dataStok.length)
          if(ambil.length > 0 ){
              ambil.forEach((d: any) => {
                dataStok.push({
                  id:d.id ,
                  id_jenis_kaca:d.id_jenis_kaca,
                  tanggal:d.tanggal, 
                  stok:d.stok,
                  harga_beli:d.harga_beli,
                  harga_jual:d.harga_jual,
                })
              });
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

const modalJenisSplice = () => {
  newPanjang.value = '' ; 
  newLebar.value = '' ; 
  newNama.value = '' ; 
  newTebal.value = '' ; 
  isEdit.value = false ; 
  namaEdit.value = '' ; 
  panjangEdit.value = '' ; 
  lebarEdit.value = '' ; 
  tebalEdit.value = '' ; 
}


const dataJenis = reactive<jenisType[]>([])



    const indexnya = ref()
    const terpilih = ref()
const halamanStokAktif = async (i:number) => {
        indexStok.value = i ;
        terpilih.value = true ; 
        const path = 'http://localhost:8181/stok/history/'+idnya.value+'?page=' + indexStok.value ;
        const response = await fetch(path);
            const data = await response.json();
            dataStok.splice(0,dataStok.length);
            if(data.length > 0 ){
                data.forEach((d:any) => {
                    dataStok.push({
                    id:d.id ,
                    id_jenis_kaca:d.id_jenis_kaca,
                    tanggal:d.tanggal ,
                    stok:d.stok, 
                    harga_beli:d.harga_beli, 
                    harga_jual:d.harga_jual,
                })
            });
            }
        }
    
    const halamanStokTurun = async () => {
         dataStok.splice(0,dataStok.length);
        const path = 'http://localhost:8181/stok/history/'+idnya.value+'?page=' + (indexStok.value - 1) ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
                      dataStok.push({
                        id:d.id ,
                      id_jenis_kaca:d.id_jenis_kaca,
                      tanggal:d.tanggal ,
                      stok:d.stok, 
                      harga_beli:d.harga_beli, 
                      harga_jual:d.harga_jual,
                    })
                    });
                  }
    }
    const halamanStokNaik = async () => {
         dataStok.splice(0,dataStok.length);
        const path = 'http://localhost:8181/stok/history/'+idnya.value+'?page=' + (indexStok.value + 1) ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
                      dataStok.push({
                        id:d.id ,
                      id_jenis_kaca:d.id_jenis_kaca,
                      tanggal:d.tanggal ,
                      stok:d.stok, 
                      harga_beli:d.harga_beli, 
                      harga_jual:d.harga_jual,
                    })
                    });
                  }
    }
    const halamanAktif = async (i:number) => {
        const terpilih = true ; 
        indexnya.value = i;
        const path = 'http://localhost:8181/jenis/listjenis?page=' + indexnya.value ;
        dataJenis.splice(0,dataJenis.length);
        const response = await fetch(path);
            const data = await response.json();
            if(data.length > 0 ){
                data.forEach((d:any) => {
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
    
    const firstPage = async () => {
      indexnya.value = 1 ;
         dataJenis.splice(0,dataJenis.length);
        const path = 'http://localhost:8181/jenis/listjenis?page=' + 1 ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
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
        const halamanTurun = async () => {
      indexnya.value -- ;
         dataJenis.splice(0,dataJenis.length);
        const path = 'http://localhost:8181/jenis/listjenis?page=' + indexnya.value ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
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
      
        const halamanNaik = async () => {
        indexnya.value ++ ;
        dataJenis.splice(0,dataJenis.length);
        const path = 'http://localhost:8181/jenis/listjenis?page=' + indexnya.value  ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
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
        const lastPage = async () => {
        indexnya.value ++ ;
        dataJenis.splice(0,dataJenis.length);
        const path = 'http://localhost:8181/jenis/listjenis?page=' + coba.value.length  ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
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





onMounted(async() =>{
const ambilArr = await fetch('http://localhost:8181/jenis/totalJenis');
const result = await ambilArr.json();
const arrLength = await result.length;
const pagingLength = Math.ceil(arrLength / 5);
coba.value.length = pagingLength;

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
          <button class="btn btn-primary col-4 bi bi-plus-circle" type="button" @click="modalJenisSplice()" data-bs-toggle="modal" data-bs-target="#TambahJenisKaca">Jenis kaca</button>    
        </div>
        <ModalJenis @inputJenis="inputJenis" :isEdit='isEdit' @updateJenis="updateJenis" :nama="namaEdit" :panjang="panjangEdit" :tebal="tebalEdit"  :lebar="lebarEdit"  ></ModalJenis>

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
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(jenis, i) in dataJenis" :key="jenis.id" >
              <td @click="munculTableStok(jenis.id)">{{ i + 1}}</td>
              <td @click="munculTableStok(jenis.id)">{{ jenis.nama}}</td>
              <td @click="munculTableStok(jenis.id)">{{ jenis.panjang}} x {{ jenis.lebar}} x {{ jenis.tebal}}</td>
              <td @click="munculTableStok(jenis.id)">{{ jenis.stok }}</td>
              <!-- SAYA BUAT SEPERTI INI SEBAB KALAU TR NYA YANG DI BERI FUNGSI MUNCUL TABLE TOMBOL EDIT TIDAK BISA DI AKSES  -->
              <td><button type="button" class="btn btn-info" @click="editJenis(i)" data-bs-toggle="modal" data-bs-target="#TambahJenisKaca" >Edit</button></td>
              <td><button type="button" class="btn btn-danger" @click="alert(jenis.id)">Delete</button></td>

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
                  <ModalStok @inputStok ="inputStok" @editStok="editStok" :id="idStokEdit"  :hargaBeliEdit="hargaBeliEdit" :hargaJualEdit="hargaJualEdit" :tanggalEdit="tanggalEdit" :stokEdit="jumlahEdit"></ModalStok>
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
                        <tr v-for="(stk , i) in dataStok" :key="stk.id">
                            <td>{{stk.tanggal}}</td>
                            <td>{{'Rp.' + stk.harga_beli}}</td>
                            <td>{{'Rp.' + stk.harga_jual}}</td>
                            <td>{{stk.stok}}</td>  
                            <td><button type="button" class="btn btn-warning" @click="munculModalEditStok(i)" data-bs-toggle="modal" data-bs-target="#tambahstok"  >Edit</button></td>
                        </tr>                      
                    </tbody>
                </table>

                <!-- PAGINATION STOK -->
                <div class="row">
                    <div class="col-4">
                        <nav aria-label="d-grid gap-2 d-md-block">
                            <ul class="pagination">
                                <li class="page-item" v-if="indexStok != 1"  >
                                <a class="page-link" href="#" aria-label="Previous" >
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                                </li>

                                <li class="page-item"  v-if="indexStok != 1">
                                <a class="page-link"  aria-label="Next">
                                    <span aria-hidden="true">Back</span>
                                </a>
                                </li>

                                <li :class="dipilih == true ? 'border border-primarys' : 'gakAda'" v-for="(pagingStok, a) in stokPage " :key="a"  @click="halamanStokAktif(a + 1)"  class="page-item"><a class="page-link" href="#">{{ a + 1 }}</a></li>
                              
                                <li class="page-item"  v-if="indexStok !== stokPage.length">
                                <a class="page-link"  aria-label="Next">
                                    <span aria-hidden="true">Next</span>
                                </a>
                                </li>
                                <li class="page-item" v-if="indexstok !== stokPage.length"  >
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
              </div>   
                
            </div>
        </div>

        <!-- MODAL EDIT  -->


        <div class="row">
            <div class="col-4">
                <nav aria-label="d-grid gap-2 d-md-block">
                    <ul class="pagination">
                        <li class="page-item" v-if="indexnya != 1"  >
                        <a class="page-link" href="#" aria-label="Previous" @click="firstPage()">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>

                        <li class="page-item"  v-if="indexnya != 1" @click="halamanTurun()">
                        <a class="page-link"  aria-label="Next">
                            <span aria-hidden="true">Back</span>
                        </a>
                        </li>

                        <li :class="terpilih == true ? 'border border-primarys' : 'gakAda'" v-for="(page , i) in coba " :key="i"   @click="halamanAktif(i + 1)"  class="page-item"><a class="page-link" href="#">{{ i+ 1 }}</a></li>
                       
                        <li class="page-item"  v-if="indexnya !== coba.length" @click="halamanNaik()">
                        <a class="page-link"  aria-label="Next">
                            <span aria-hidden="true">Next</span>
                        </a>
                        </li>
                        <li class="page-item" v-if="indexnya !== coba.length" @click="lastPage()" >
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>    

        <!-- MODAL DELETE JENIS KACA  -->
          <!-- <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="modalDelete" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="alert alert-danger modal-header text-center">
                <h5 class="alert-heading"><legend> Apa Anda yakin menghapus data kaca?</legend></h5>
              </div>
              <div class="modal-body">
                <div class="text-center">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button"  class="btn btn-primary"  data-bs-dismiss="modal" @click="deleteJenis()" >Yes</button>

                </div>
              </div>
              <div class="modal-footer">
                
              </div>
            </div>
          </div>
        </div> -->

    </div>

    
</template>
