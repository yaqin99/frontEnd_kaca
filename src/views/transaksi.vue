<template> 
  <div class="container">
    <div class="row">
      <div class="col-sm-7">
        <TranksaksiForm @sendTransaction="sendTransaction"></TranksaksiForm>              
      </div>
      <div class="col-sm-4 offset-sm-1">
        <form>
          <div class="row">  
            <TranksaksiBayar @sendCustomers="sendCustomers"></TranksaksiBayar>
          </div>
        </form>           
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
  import TranksaksiForm from '../components/TranksaksiForm.vue';
  import TranksaksiBio from '../components/TranksaksiBio.vue';
  import TranksaksiBayar from '../components/TranksaksiBayar.vue';
  import Api from '../services/api'

  type transaksiBody = {
    id_jenis_kaca:number,
    nama : string,
    panjang: number,
    lebar: number,
    jumlah: number,
    harga:number,  
  }
  const transaksi = reactive<transaksiBody[]>([]);
  let transLoop = reactive<transaksiBody[]>([]);

  const panjang = ref() ; 
  const lebar = ref() ; 
  const jumlah = ref() ; 
  const harga = ref() ; 
  const id_jenis_kaca = ref() ; 
  const datanya = ref() ; 

  const sendTransaction = (data:any) => {
    
  const lastArr = data.Transaksi;
  
      lastArr.forEach((a:any) => {
        transaksi.push({
          id_jenis_kaca:a.id_jenis_kaca , 
           nama:a.nama , 
           panjang:a.panjang , 
           lebar:a.lebar , 
           jumlah:a.jumlah , 
           harga:a.harga , 
         })
        
      });

  console.log(transaksi)
  }
     
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;



  function sendCustomers (data:any) {
    
    
    const response = Api.postResource('/transaksi/tambah',{
      id_pembeli:data.id , 
      nama:data.nama , 
      hp:data.hp , 
      alamat:data.alamat , 
      tanggal:dateTime , 
      total:harga.value , 
      bayar: data.bayar , 
      kembali:data.kembali ,
      detil:[
        
        {
          id_jenis_kaca:id_jenis_kaca.value , 
          panjang:panjang.value , 
          lebar:lebar.value , 
          biaya:harga.value , 
        }
      ]
    },'POST');
    
    // console.log({
    //   nama:data.nama , 
    //   hp:data.hp , 
    //   alamat:data.alamat , 
    //   bayar:data.bayar , 
    //   kembali:data.kembali , 
    // })
  }
  
</script>