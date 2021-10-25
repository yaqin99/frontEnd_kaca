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

  const panjang = ref() ; 
  const lebar = ref() ; 
  const jumlah = ref() ; 
  const harga = ref() ; 
  const id_jenis_kaca = ref() ; 
  const datanya = ref() ;
  type typeForm = {
    id_jenis_kaca:number,
    nama : string,
    panjang: string,
    lebar: string,
    jumlah: string,
    harga:number,  
  }
  const table = reactive<typeForm[]>([]);
  const sendTransaction = (data:any) => {
   const sample =  JSON.parse(JSON.stringify(data.Transaksi));
   sample.forEach((d: { id_jenis_kaca: any; nama: any; panjang: any; lebar: any; jumlah: any; harga: any; })  => {
     table.push({
       id_jenis_kaca: d.id_jenis_kaca, nama: d.nama, panjang: d.panjang, lebar: d.lebar, jumlah: d.jumlah, harga: d.harga 
     })
   });
  }

  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;

  const sendCustomers = async (data:any) => {
    
    const response = await Api.postResource('/transaksi/tambah',{
      id_pembeli:data.id , 
      nama:data.nama , 
      hp:data.hp , 
      alamat:data.alamat , 
      tanggal:dateTime , 
      total:harga.value , 
      bayar: data.bayar , 
      kembali:data.kembali ,
      
      detil: table
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