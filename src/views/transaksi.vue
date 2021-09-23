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
                            <select  class=" col-sm-8 form-select" v-model="transaksiBody.id_jenis_kaca">
                               <option selected>Pilih Kaca</option>
                               <option :value="jenis.id_jenis_kaca" v-for="jenis in dataJenis" :key="jenis.id"  >{{ jenis.nama}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-12 row mt-3">
                        <label for="ukuran" class="col-sm-3 col-form-label fw-bold">Ukuran</label>
                        <div class="col-sm-3">
                           <input type="text" class="form-control text-center" placeholder="Panjang" v-model="transaksiBody.panjang">
                       
                        </div>
                        <div class="col-sm-3 offset-sm-1">
                            <input type="text" @click="ambilPanjang()"  class="form-control text-center" placeholder="Lebar" v-model="transaksiBody.lebar">
                        
                         </div>
                    </div>

                    <div class="col-12 row mt-3">
                        <label for="Jumlah" class="col-sm-3 col-form-label fw-bold">JUMLAH</label>
                        <div class="col-sm-2">
                           <input type="text" @click="ambilLebar()"  class="form-control text-center" placeholder="Jumlah" v-model="transaksiBody.jumlah">
                           
                        </div>

                        <div class="col-sm-4 offset-sm-1 ">
                            <div class="input-group sm-2">
                                <span class="input-group-text" id="harga"><i class="bi bi-cash-coin"></i></span>
                                <input type="text"  class="form-control" placeholder="Rp. 0"   aria-label="Username" aria-describedby="basic-addon1">
                            </div>

                        </div>

                        <div  class="col-sm-2 d-flex flex-column">
                            <button type="button" class="bi bi-check-circle btn btn-primary" @click="total()"></button>
                        </div>
                    </div>
                </form> 

                <table class="table table-bordered text-center mt-5">
                    <thead class="table-secondary">
                        <tr>
                            <th class="col-sm-1">No</th>
                            <th class="col-sm-3">Kaca</th>
                            <th class="col-sm-3">Ukuran</th>
                            <th class="col-sm-2">Jumlah</th>
                            <th class="col-sm-10 ">Harga</th>
                        </tr>
                    </thead>
                    <tbody  v-if="munculLah">
                        <tr v-for="(transaksi,index) in tableBody" :key="transaksi.id"> 
                            <td>{{ index + 1}}</td>
                            <td>{{transaksi.nama}}</td>
                            <td>{{transaksi.panjang}} x {{transaksi.lebar}}</td>
                            <td>{{ transaksi.jumlah}}</td>
                            <td>{{ transaksi.harga}}</td>
                        </tr>
                    </tbody>
                    <tbody >
                        <tr > 
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
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
<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue';
    import { useField, useForm } from 'vee-validate';
    import * as yup from 'yup'
    
    type jenisType = {
         id_jenis_kaca : number,
         nama : string , 
         panjang : number , 
         lebar : number , 
         tebal : number , 
     }

   
    

    const transaksiBody =  {
        id_jenis_kaca: '',
        panjang:'', 
        lebar :'',
        jumlah:'',
        harga:0,
      }

    
    
    const tableBody =  {
        id_jenis_kaca: '',
        panjang:'', 
        lebar :'',
        jumlah:'',
        harga:0,
      }
    
    
    const  panjangInt = ref();
    const ambilPanjang = ()=> {
        panjangInt.value =  parseInt(transaksiBody.panjang)
      
    };
    const lebarInt = ref();
    const ambilLebar = () => {
        ambilHarga()
        lebarInt.value = parseInt(transaksiBody.lebar)
       
    };
    const jumlahInt = ref();
    const ambilJumlah = () => {
        jumlahInt.value = parseInt(transaksiBody.jumlah);
       
    };

   
   

    const ambilHarga =  async () => {
    const pathHarga = await 'http://localhost:8181/stok/harga?id=' + transaksiBody.id_jenis_kaca + '&panjang='+ panjangInt.value + '&lebar=' + lebarInt.value
    const ambil = await fetch(pathHarga);
    const hasil = ambil.json()
    console.log(hasil)
    }

    const total = async () => {
      
      ambilJumlah()
      const hasil = await  panjangInt.value * lebarInt.value * jumlahInt.value * 1000
      transaksiBody.harga = hasil;
      tableBody.id_jenis_kaca = transaksiBody.id_jenis_kaca ; 
      tableBody.panjang = transaksiBody.panjang; 
      tableBody.lebar = transaksiBody.lebar;
      tableBody.jumlah = transaksiBody.jumlah;
      tableBody.harga = transaksiBody.harga;
      
    };
    
    const dataJenis = reactive<jenisType[]>([])
    onMounted(async() =>{
    try {
        
        const response = await fetch('http://localhost:8181/jenis');
                const data = await response.json();
                
                if(data.length > 0 ){
                    data.forEach((d: any) => {
                      dataJenis.push({
                        id_jenis_kaca:d.id,
                        nama : d.nama , 
                        panjang : d.panjang, 
                        lebar : d.lebar,
                        tebal : d.tebal,
                      },
                    )

                    });
                  }
    }
    catch(err){
      console.log(err)
    }
  })
</script>