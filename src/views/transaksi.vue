<template> 
  <div class="container">
    <div class="row">
      <div class="col-sm-7">
        <TranksaksiForm @sendTransaction="sendTransaction"></TranksaksiForm>              
      </div>
      <div class="col-sm-4 offset-sm-1">
        <form>
          <TranksaksiBio @sendCustomers="sendCustomers"></TranksaksiBio>
          <div class="row">
            <div class="col-12  d-sm-flex justify-content-sm-end mt-2">
              <router-link to="/" class="btn btn-info text-white">
              <i class="fas fa-history"></i>                                 
              </router-link>                           
            </div>
            <TranksaksiBayar></TranksaksiBayar>
          </div>
        </form>           
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import TranksaksiForm from '../components/TranksaksiForm.vue';
  import TranksaksiBio from '../components/TranksaksiBio.vue';
  import TranksaksiBayar from '../components/TranksaksiBayar.vue';

  const sendTransaction = (data:any) => {
    console.log({
      nama:data.nama , 
      panjang:data.panjang , 
      lebar:data.lebar , 
      jumlah:data.jumlah , 
      harga:data.harga,
    })
  }

  const sendCustomers = (data:any) => {
    console.log({
      nama:data.nama , 
      hp:data.hp , 
      alamat:data.alamat , 
    })
  }
</script>