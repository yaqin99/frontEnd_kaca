<template>
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
      <div class=" col-5  d-flec d-flex-column rounded btn btn-primary btn-md mt-2" @click="$emit('simpan', {bayar, kembali})">
        <span>SIMPAN</span>                                
      </div> 
      <div class=" col-5 offset-1 d-flec d-flex-column rounded btn btn-danger btn-md mt-2">
        <span class="bi bi-printer"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    bayar: Number,
    kembali: Number
  })

const emit = defineEmits(['simpan'])
</script>
<style>

</style>