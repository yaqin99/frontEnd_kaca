<script setup lang="ts">
import { onMounted } from "vue";
    // onMounted(async() =>{
        
    //       const response = await fetch('http://localhost:8181/stok/harga?id=1&panjang=10&lebar=10');
    //       const data = await response.json();
    //       console.log(data);
    // })
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col text-center my-4">
        <h1>Toko Anugerah</h1>
      </div>
    </div>
      <div class="row">
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
  </div>
  
</template>

<style>
@import 'alertifyjs/build/css/alertify.min.css';
@import 'alertifyjs/build/css/themes/default.min.css';

</style>
