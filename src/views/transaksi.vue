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
              <option v-for="jenis in dataJenis" :key="jenis.id" :value="jenis.id_jenis_kaca">{{ jenis.nama }}</option>
              <h1></h1>
              </select>
            </div>
          </div>
          <div class="col-12 row mt-3">
            <label for="ukuran" class="col-sm-3 col-form-label fw-bold">Ukuran</label>
              <div class="col-sm-3">
                <input type="text" class="form-control text-center" :class="{'is-invalid': metaPanjang.dirty && !metaPanjang.valid}" placeholder="Panjang" v-model="Panjang">
                <span style="font-size: 14px;">{{errors.Panjang}}</span>
              </div>
              <div class="col-sm-3 offset-sm-1">
                <input type="text" class="form-control text-center" :class="{'is-invalid': metaLebar.dirty && !metaLebar.valid}" placeholder="Lebar" v-model="Lebar" >
                <span style="font-size: 14px;">{{errors.Lebar}}</span>
              </div>
          </div>
          <div class="col-12 row mt-3">
            <label for="Jumlah" class="col-sm-3 col-form-label fw-bold">JUMLAH</label>
            <div class="col-sm-2">
              <input type="text" class="form-control text-center" placeholder="Jumlah" v-model="tjumlah" >
            </div>
            <div class="col-sm-4 offset-sm-1 ">
              <div class="input-group sm-2">
                <span class="input-group-text" id="harga"><i class="bi bi-cash-coin"></i></span>
                <input type="text"  class="form-control" placeholder="Rp. 0" aria-label="Username" aria-describedby="basic-addon1">
              </div>
            </div>
            <div  class="col-sm-2 d-flex flex-column">
              <button type="button" class="bi bi-check-circle btn btn-primary" :disabled= "!meta.valid" @click="masukan()">
              </button>
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
            <tr v-for="(kaca, i) in Tranksaksi" :key="i" >
              <td>{{i+1}}</td>
              <td>{{kaca.nama}}</td>
              <td>{{kaca.panjang}} x {{kaca.lebar}}</td>
              <td>{{kaca.jumlah}}</td>
              <td>{{kaca.harga}}</td>
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
                  <input   type="text" class="form-control" v-model="namaPembeli" placeholder="Username">
                </div>                               
              </div>
              <label for="hp" class="col-sm-3 col-form-label fw-bold">HP</label>
                <div class="col-sm-9 mt-1">
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control" v-model="noHp" placeholder="Input">
                  </div>
                </div>
                  <label for="alamat" class="col-sm-3 col-form-label fw-bold">Alamat</label>
                  <div class="col-sm-9 mt-1">
                    <textarea class="form-control form-control-xg" v-model="alamat" id="addres"></textarea>
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
                <input type="text" class="form-control" v-model="bayar" placeholder="Input">
              </div>
              <label for="nama" class="col-sm-3 col-form-label fw-bold mt-4">KEMBALI</label>
              <div class="col-sm-9 mt-4">
                <input type="text" class="form-control"  :value="kembalian.value" placeholder="Input">
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
  import { useField, useForm } from 'vee-validate'
  import * as yup from 'yup'
  import { setLocale } from 'yup'
  import Api from '../services/api';
    
  yup.setLocale({
    number: {
      min: 'Angka Minimal ${min}',
      max: 'Angka Maksimal ${max}'
    }
  })   
  
  const schema = yup.object({
    Panjang: yup.number().required().min(1).max(200),
    Lebar: yup.number().required().min(1).max(200)
  });
  const {setValues,meta, errors} = useForm({
    validationSchema: schema
  })

  const { value: Panjang , meta:metaPanjang} = useField('Panjang')
  const { value: Lebar , meta:metaLebar} = useField('Lebar');
   
  const Pilihan = ref();
  const tjumlah = ref('');
  const namaPembeli = ref('');
  const noHp = ref();
  const alamat = ref();
  const harganya = ref()
  const bayar = ref()
  const kembalian = ref();
  kembalian.value = bayar.value - harganya.value
  console.log(kembalian.value)
  
  type jenisType = {
    id_jenis_kaca : number,
    nama : string , 
    panjang : number , 
    lebar : number , 
    tebal : number , 
  }

  type transaksiBody = {
    nama : string,
    panjang: string,
    lebar: string,
    jumlah: string,
    harga:number,  
  }

  const Tranksaksi = reactive<transaksiBody[]>([]);
  const dataJenis = reactive<jenisType[]>([]);
  
  const masukan = async () => {
    const response = await fetch('http://localhost:8181/stok/harga?id=' + Pilihan.value + '&panjang=' + Panjang.value + '&lebar=' + Lebar.value);
    const data = await response.json();
    
    Tranksaksi.push({
      nama: dataJenis[Pilihan.value].nama , panjang: String(Panjang.value), lebar: String(Lebar.value), jumlah: String(tjumlah.value), harga: data.harga*parseInt(tjumlah.value)
    })
    Pilihan.value = '';
    Panjang.value = '';
    Lebar.value = '';
    tjumlah.value= '';
    harganya.value = data.harga;
    console.log(harganya.value)
  }
  
  onMounted(async() =>{
    try {   
      const response = await fetch('http://localhost:8181/jenis');
      const data = await response.json();
      if(data.length > 0 ){
        data.forEach((d: any) => {
          dataJenis.push({ 
            id_jenis_kaca:d.id, 
            nama : d.nama, 
            panjang : d.panjang, 
            lebar : d.lebar, 
            tebal : d.tebal
          })
        });
       
      }
    }
    catch(err){
      console.log(err)
    }
  })
  console.log(Pilihan.value);

</script>