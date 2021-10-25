<template>

  <div class="row">
    <div class="col-12 row mt-3">
      <label class="col-sm-3 col-form-label fw-bold">Nama</label>
      <div class="col-sm-9 mt-1">
         <AutoComplete   :list="options" item-label="nama" v-model="value" class="form-control form-control-sm" @search="getList" placeholder="Nama Pembeli" @change="sendPembeli()"></AutoComplete>   
      </div>
      <label for="hp" class="col-sm-3 col-form-label fw-bold" >HP</label>
      <div class="col-sm-9 mt-1">
        <div class="input-group input-group-sm">
          <input type="text" class="form-control" placeholder="Input" v-model="value.hp" >
        </div>
      </div>
      <label for="alamat" class="col-sm-3 col-form-label fw-bold">Alamat</label>
      <div class="col-sm-9 mt-1">
        <textarea class="form-control form-control-xg" id="addres" v-model="value.alamat" @change="sendPembeli()"></textarea>
      </div>
    </div>
  </div>
  <div class="col-12  d-sm-flex justify-content-sm-end mt-2">
              <router-link to="/" class="btn btn-info text-white">
              <i class="fas fa-history"></i>                                 
              </router-link>                           
            </div>
  <div class=" col-12 row mt-2 py-4 px-2 bg-secondary" style=" border-radius: 15px;">
    <label for="bayar" class="col-sm-3 col-form-label fw-bold ">BAYAR</label>
    <div class="col-sm-9 ">
      <input type="text" class="form-control" placeholder="Input" v-model="bayar">
    </div>
    <label for="nama" class="col-sm-3 col-form-label fw-bold mt-4">KEMBALI</label>
    <div class="col-sm-9 mt-4">
      <input type="text" class="form-control" placeholder="Input" v-model="kembali">
    </div>
  </div>
  <div class="col-12">
    <div class="row">
      <div class=" col-5  d-flec d-flex-column rounded btn btn-primary btn-md mt-2" @click="sendPembeli()">
        <span>SIMPAN</span>                                
      </div> 
      <div class=" col-5 offset-1 d-flec d-flex-column rounded btn btn-danger btn-md mt-2">
        <span class="bi bi-printer"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

  import {ref} from 'vue';
  import AutoComplete from '../components/AutoComplete.vue';
  // const props = defineProps({
  //   bayar: Number,
  //   kembali: Number
  // })


  let options = ref([]);
  const bayar = ref() ; 
  const kembali = ref() ; 
  const emit = defineEmits(['sendCustomers'])
  const namaPembeli = ref() ; 
  const hpPembeli = ref(); 
  const alamatPembeli = ref()
  const value = ref<{ nama:string, hp: string, alamat: string , id:string}>({
    nama:'',
    hp: '',
    alamat: '' , 
    id:'' , 
  });
  
  const sendPembeli = () => {
    emit('sendCustomers' , {nama:value.value.nama , 
    hp:value.value.hp , 
    alamat:value.value.alamat , 
    bayar:bayar.value,
    kembali:kembali.value,
    id:value.value.id , 
    })
  }
  
  

  

  const getList = async (e: any) => {
    const r = await fetch(`http://localhost:8181/pembeli/nama?nama=${e}`);
    const d = await r.json();
    options.value = d.map((v: any) => {
      return {nama:v.nama, hp: v.hp, alamat:v.alamat , id:v.id}
       
    });

  }
</script>
<style>

</style>