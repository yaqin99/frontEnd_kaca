<template>
  <div class="row">
    <div class="col-12 row mt-3">
      <label class="col-sm-3 col-form-label fw-bold">Nama</label>
      <div class="col-sm-9 mt-1">
         <AutoComplete :list="options" item-label="nama" v-model="value" class="form-control form-control-sm" @search="getList" placeholder="Username"></AutoComplete>                          
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
  <div class="col-12  d-sm-flex justify-content-sm-end mt-2">
    <router-link to="/" class="btn btn-info text-white">
      <i class="fas fa-history"></i>                                 
    </router-link>                           
  </div>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  import AutoComplete from '../components/AutoComplete.vue';
  let options = ref([]);

  const value = ref<{ nama:string}>({
    nama:''
  });

  const getList = async (e: any) => {
    const r = await fetch(`http://localhost:8181/pembeli?nama=${e}`);
    const d = await r.json();
    options.value = d.map((v: any) => {
      return {nama:v.nama}
    });
    console.log(d)
    console.log(options.value)
  }
</script>

<style>

</style>