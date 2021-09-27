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
                <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form role="form">
                  <div class="form-group ">
                    <input type="text" class="form-control " v-model="nama" id="nama" placeholder="Nama Kaca">
                    <span>{{errors.nama}}</span>
                  </div>
                  <div class="col-12 row mt-3">
                    <label class="col-sm-3 col-form-label fw-bold">Ukuran(cm)</label>
                    <div class="col-sm-3">
                      <input type="text" v-model="panjang" id="panjang" class="form-control text-center" placeholder="Panjang">
                    <span>{{ errors.panjang}}</span>
                    </div>
                    <div class="col-sm-3 ">
                      <input type="text" v-model="lebar" id="lebar" class="form-control text-center" placeholder="Lebar">
                    <span>{{ errors.lebar}}</span>
                    </div>
                    <div class="col-sm-3 ">
                      <input type="text" v-model="tebal" id="tebal" class="form-control text-center" placeholder="Tebal">
                    <span>{{ errors.tebal}}</span>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-primary"  @click="inputJenis()" data-bs-dismiss="modal" >Simpan</button>
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
            <tr v-for="(jenis, i) in dataJenis" :key="jenis.id" @click="munculTableStok(jenis.id)">
              <td>{{ i + 1}}</td>
              <td>{{ jenis.nama}}</td>
              <td>{{ jenis.panjang}} x {{ jenis.lebar}} x {{ jenis.tebal}}</td>
              <td>{{ jenis.stok }}</td>
              
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
                <div class="modal fade" id="tambahstok" tabindex="-1" aria-labelledby="tambahstok" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="tambahstok">Tambah Stok</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group  mt-3">
                        <input type="text mt-3" v-model="stokKaca.harga" class="form-control" placeholder="Harga Beli">
                      </div>
                      <span>{{ errors.harga}}</span>
                      <div class="form-group  mt-3">
                        <input type="text" v-model="stokKaca.stok"  class="form-control" placeholder="Jumlah">
                      </div>
                      <span>{{errors.jumlah}}</span>
                      <div class="form-group  mt-3">
                        <input type="date" v-model="stokKaca.tanggal"  class="form-control" placeholder="Jumlah">
                      </div>
                      <span>{{ errors.tanggal}}</span>             
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                <button type="button" class="btn btn-primary"  @click="inputStok()" data-bs-dismiss="modal">Simpan</button>
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
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stk) in dataStok" :key="stk.id">
                            <td>{{stk.tanggal}}</td>
                            <td>{{'Rp.' + stk.harga}}</td>
                            <td>{{stk.stok}}</td>  
                            <td><button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdit" @click="edit()">Edit</button></td>
                        </tr>                      
                    </tbody>
                </table>
                
            </div>
        </div>

        <!-- MODAL EDIT  -->

        <div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="TambahJenisKaca" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="alert alert-success modal-header text-center">
                <h5 class="alert-heading" id="TambahJenisKaca">Tambah Jenis Kaca</h5>
                <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form role="form">
                  <div class="form-group ">
                    <label for="tanggal" class="form-label">Tanggal</label>
                    <input type="text" class="form-control "   id="tanggal" >
                   
                  </div>
                  
                  <div class="form-group ">
                    <label for="harga_beli" class="form-label">Harga Beli</label>
                    <input type="text" class="form-control "  v-model="nama" id="harga_beli" >
                   
                  </div>
                  <div class="form-group ">
                    <label for="harga_jual" class="form-label">Harga Jual</label>
                    <input type="text" class="form-control " v-model="nama" id="harga_jual" >
                   
                  </div>
                  <div class="form-group ">
                    <label for="jumlah_beli" class="form-label">Jumlah Beli</label>
                    <input type="text" class="form-control "  v-model="nama" id="jumlah_beli" >
                   
                  </div>
                  
                  
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-primary"  @click="inputJenis()" data-bs-dismiss="modal" >Simpan</button>
              </div>
            </div>
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
     import { useField, useForm } from 'vee-validate';
     import * as yup from 'yup'

    
     type stokType = {
         id_jenis_kaca:number,
         tanggal:string , 
         stok:number,
         harga:number,
     }
    const stokKaca =  {
        
        id_jenis_kaca: 0 , 
        tanggal:'',
        stok:'',
        harga:'',
    }
   

    
    
      const schema = yup.object({
          nama:yup.string().required().max(20).min(5),
          panjang:yup.number().required().max(200).min(1),
          lebar:yup.number().required().max(200).min(1),
          tebal:yup.number().required().max(200).min(0.5),
          // harga:yup.number().required(),
          // jumlah:yup.number().required().min(1),
          // tanggal:yup.string().required()
       });

      

    const {setValues,meta, errors} = useForm({
      validationSchema: schema ,
      
    })

    
    

    

    const {value:nama , meta:metaNama} = useField('nama');
    const {value:panjang , meta:metaPanjang} = useField('panjang');
    const {value:lebar , meta:metaLebar} = useField('lebar');
    const {value:tebal , meta:metaTebal} = useField('tebal');
    // const {value:harga , meta:metaHarga} = useField('harga');
    // const {value:jumlah , meta:metaJumlah} = useField('jumlah');
    // const {value:tanggal , meta:metaTanggal} = useField('tanggal');
    
    
    


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
         stokKaca.id_jenis_kaca = i;
         
         const response = await fetch('http://localhost:8181/stok/history/' + id.value);
         const data = await response.json();
                dataStok.splice(0,dataStok.length)
                if(data.length > 0 ){
                    data.forEach((d: any) => {
                      dataStok.push({
                       id_jenis_kaca:d.id_jenis_kaca,
                       tanggal:d.tanggal, 
                       stok:d.stok,
                       harga:d.harga,
                       
                      })
                    });
                  }
         
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
    

    
    const inputJenis = async () => {
        try {
            const data = await Api.postResource('/jenis',{nama:nama.value , panjang:panjang.value , lebar:lebar.value , tebal:tebal.value},'POST')
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
                
                nama.value = '' ; 
                panjang.value = '' ; 
                lebar.value = '' ; 
                tebal.value = '' ; 
                
        }
        catch(err){
            console.log(err)
        }
    }; 


      
    const inputStok = async ()=> {
        try {
            const data = await Api.postResource('/stok',stokKaca,'POST')
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
                       harga:d.harga,
                       
                      })
                    });
                  }

                stokKaca.tanggal = '' ; 
                stokKaca.stok = '' ; 
                stokKaca.harga = '' ; 
    
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
