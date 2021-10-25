<template>
  <form>
    <div class="col-12 row mt-3">
      <label for="jenis_kaca" class="col-sm-3 col-form-label fw-bold">JENIS KACA</label>
      <div class="col-9">
        <select class="col-sm-8 form-select" v-model="Pilihan">
          <option disabled value="">Pilih Jenis Kaca</option>
          <option v-for="jenis in dataJenis" :key="jenis.id_jenis_kaca" :value="jenis.id_jenis_kaca">{{ jenis.nama }}</option>
        </select>
      </div>
    </div>
    <div class="col-12 row mt-3">
      <label for="ukuran" class="col-sm-3 col-form-label fw-bold">Ukuran</label>
      <div class="col-sm-3">
        <input type="text" class="form-control text-center" placeholder="Panjang" v-model="panjang">
        <span style="font-size: 14px;"></span>
      </div>
      <div class="col-sm-3 offset-sm-1">
        <input type="text" class="form-control text-center" placeholder="Lebar" v-model="lebar">
        <span style="font-size: 14px;"></span>
      </div>
    </div>
    <div class="col-12 row mt-3">
      <label for="Jumlah" class="col-sm-3 col-form-label fw-bold">JUMLAH</label>
      <div class="col-sm-2">
        <input type="text" class="form-control text-center" placeholder="Jumlah" v-model="jumlah" @change="coba()" >
        <h1></h1>
      </div>
      <div class="col-sm-4 offset-sm-1 ">
        <div class="input-group sm-2">
          <span class="input-group-text" id="harga"><i class="bi bi-cash-coin"></i></span>
          <input type="text"  class="form-control" placeholder="Rp. 0" v-model="getHarga" aria-label="Username" aria-describedby="basic-addon1">
        </div>
      </div>
      <div  class="col-sm-2 d-flex flex-column">
        <button type="button" class="bi bi-check-circle btn btn-primary" @click="masukkan()"></button>
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
    <tr v-for="(kaca, i) in Transaksi" :key="i" >
        <td>{{i+1}}</td>
        <td>{{kaca.nama}}</td>
        <td>{{kaca.panjang}} x {{kaca.lebar}}</td>
        <td>{{kaca.jumlah}}</td>
        <td>Rp.{{new Intl.NumberFormat().format(kaca.harga)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { reactive, onMounted, ref, computed } from 'vue';
  // const props = defineProps({
  //   Pilihan: Number,
  //   panjang: Number,
  //   lebar: Number,
  //   jumlah: Number ,
  // });

  type jenisType = {
    id_jenis_kaca : number,
    nama : string , 
    panjang : number , 
    lebar : number , 
    tebal : number , 
  }
  const emit = defineEmits(['sendTransaction']);
  const dataJenis = reactive<jenisType[]>([]);
  onMounted(async() =>{
    try {   
      const response = await fetch('http://localhost:8181/jenis/listjenis');
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
  type transaksiBody = {
    id_jenis_kaca:number,
    nama : string,
    panjang: number,
    lebar: number,
    jumlah: number,
    harga:number,  
  }
  const Transaksi = reactive<transaksiBody[]>([]);
  const Pilihan = ref('');
  const panjang = ref();
  const lebar = ref();
  const jumlah = ref();
  const harga = ref();
  const taklem = harga.value * jumlah.value;
  const id_jenis_kaca = ref() ;
  const getHarga = computed(()=>{
    return taklem;
  });
  const coba = async () =>{
    const response = await fetch('http://localhost:8181/stok/harga?id=' + Pilihan.value + '&panjang=' + panjang.value + '&lebar=' + lebar.value);
    const data = await response.json();
    harga.value = data.harga;
  }
  
  const masukkan = async () => {
    const response = await fetch('http://localhost:8181/stok/harga?id=' + Pilihan.value + '&panjang=' + panjang.value + '&lebar=' + lebar.value);
    const data = await response.json();
    const ambil = await fetch('http://localhost:8181/jenis/listjenis');
    const dapat = await ambil.json();
    let nama = '';
    for (let i = 0; i < dataJenis.length; i++) {
      if(Pilihan.value == dapat[i].id){
        nama = dapat[i].nama;
        id_jenis_kaca.value = dapat[i].id ; 
      }
    }
    
    Transaksi.push({
      id_jenis_kaca:id_jenis_kaca.value, nama: nama, panjang: panjang.value, lebar: lebar.value, jumlah: jumlah.value, harga: data.harga*parseInt(jumlah.value)
    })
    
    
    emit('sendTransaction' , {Transaksi})
    Pilihan.value = '';
    panjang.value = '1';
    lebar.value = '1';
    jumlah.value= '1';
  }
  
</script>

<style>

</style>