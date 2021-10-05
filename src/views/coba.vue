<script setup lang="ts">
  import { reactive } from '@vue/reactivity';
import Modal1 from '../components/Modal1.vue';
  import Modal2 from '../components/modalJenis.vue';

  type JenisKaca = {
    nama: string;
    panjang: string;
    lebar: string;
    tebal: string;
  }
  const jenisKaca: JenisKaca = reactive<JenisKaca>({
    nama: 'ali', panjang: '0', lebar: '0', tebal: '0'
  })

  function simpan(data: any) {
    console.log(data.nama);
  }

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col m-3">
        <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#modal1">
          MODAL 1
        </button>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal2">
          MODAL 2
        </button>
      </div>
    </div>
  </div>

  <Modal1 :nama="jenisKaca.nama" :panjang="jenisKaca.panjang" :tebal="jenisKaca.tebal" @simpan="simpan"></Modal1>
  <Modal2 :lebar="jenisKaca.lebar"  @click="save"></Modal2>
</template>