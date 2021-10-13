<template> 
  <div class="container">
    <div class="row">
      <div class="col-sm-7">
        <TranksaksiForm></TranksaksiForm>              
      </div>
      <div class="col-sm-4 offset-sm-1">
        <form>
          <TranksaksiBio></TranksaksiBio>
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

  // import { onMounted, reactive, ref } from 'vue';
  // import { useField, useForm } from 'vee-validate'
  // import * as yup from 'yup'
  // import { setLocale } from 'yup'
  // import Api from '../services/api';
    
  // yup.setLocale({
  //   number: {
  //     min: 'Angka Minimal ${min}',
  //     max: 'Angka Maksimal ${max}'
  //   }
  // })   
  
  // const schema = yup.object({
  //   Panjang: yup.number().required().min(1).max(200),
  //   Lebar: yup.number().required().min(1).max(200)
  // });
  
  // const {setValues,meta, errors} = useForm({
  //   validationSchema: schema
  // })

  // const { value: Panjang , meta:metaPanjang} = useField('Panjang')
  // const { value: Lebar , meta:metaLebar} = useField('Lebar');
   
  // const Pilihan = ref();
  // const tjumlah = ref('');
  
  

  
  // console.log("ini adalah",dataJenis[1]);

  // const masukan = async () => {
  //   const response = await fetch('http://localhost:8181/stok/harga?id=' + Pilihan.value + '&panjang=' + Panjang.value + '&lebar=' + Lebar.value);
  //   const data = await response.json();
  //   const ambil = await fetch('http://localhost:8181/jenis/listjenis');
  //   const dapat = await ambil.json();
  //   console.log(parseInt(data.harga)*2);
  //   let nama = '';
  //   for (let i = 0; i < dataJenis.length; i++) {
  //     if(Pilihan.value == dapat[i].id){
  //       nama = dapat[i].nama;
  //     }
  //   }
  //   Tranksaksi.push({
  //     nama: String(nama), panjang: String(Panjang.value), lebar: String(Lebar.value), jumlah: String(tjumlah.value), harga: data.harga*parseInt(tjumlah.value)
  //   })
  //   Pilihan.value = '';
  //   Panjang.value = '1';
  //   Lebar.value = '1';
  //   tjumlah.value= '1';
  // }
  
  // const nama = ref();
  // const HP = ref();
  // const Alamat = ref();
  // const bayar = ref();
  // console.log(bayar);

  // const simpan = () => {
  // var Total = 0;
  //  for (let index = 0; index < Tranksaksi.length; index++) {
  //     Total = Total + Tranksaksi[index].harga;
  //   }
  //   return Total;
  // }
  
  // const kembali = () =>{
  //   const kembalian = (simpan() - bayar.value)*-1;
  //   return kembalian;
  // }
  
  // const idnyaNiBooss = ref()
  // const getNama = async (i:number) => {
  //   try {
  //     idnyaNiBooss.value = i;
  //     const response = await (fetch('http://localhost:8181/jenis/listjenis'))
  //     const data = await response.json()
  //     let nama = '';
  //     for (let i = 0; i < dataJenis.length; i++) {
  //       if(Pilihan.value == data[i].id){
  //         nama = data[i].nama;
  //       }
  //     }
  //   } 
  //   catch (error) {
  //     console.log(error);
  //   }
  //   return nama;
  // }
  // onMounted(async () =>{
  //   const response = await fetch('http://localhost:8181/stok/harga?id=' + Pilihan.value + '&panjang=' + Panjang.value + '&lebar=' + Lebar.value);
  //   const data = await response.json();
  //   console.log(data);
  // })
  
  // type pembeliType = {
  //   nama:string , 
  //   hp:number, 
  //   alamat:string,
  //   id:number,
  // }
  // const lastArr = ref()
  // const pembeli = reactive<pembeliType[]>([]);

  // const inputPembeli = async () => {
  //   try {
  //     const data = await Api.postResource('/pembeli',{nama:nama.value, hp:HP.value, alamat: Alamat.value},'POST')
  //     nama.value= '';
  //     HP.value = '';
  //     Alamat.value = '';
  //     let today = new Date();
  //     let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //     let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  //     let dateTime = date+' '+time;
  //     const mengambil = await fetch('http://localhost:8181/pembeli/pembeli');
  //     const sample = await mengambil.json();
  //     sample.forEach((x:any) => {
  //       pembeli.push({
  //         id:x.id,
  //         nama:x.nama,
  //         hp:x.hp,
  //         alamat:x.alamat,
  //       })
  //   });
  //  lastArr.value = pembeli.pop();
  //     const tranksaksi = await Api.postResource('/transaksi',{id_pembeli:lastArr.value.id, tanggal:dateTime,total: simpan(), bayar: bayar.value, kembali: kembali()},'POST')
  //     Tranksaksi.splice(0,Tranksaksi.length)

  //     tambahDetail()
  //   } 
  //   catch (error) {
  //     console.log(error)
  //   }
  // }
  // type dataTransaksiType = {
  //       nama : string , 
  //       hp : number , 
  //       alamat : string ,
  //       total:number,
  //       tanggal:string,
  //       id:number,
  //   }
  // const dataTransaksi = reactive<dataTransaksiType[]>([])


  // const detilLastArr = ref()
  // const tambahDetail = async () => {
  //   const response = await fetch('http://localhost:8181/transaksi');
  //               const data = await response.json();
  //               console.log(data);
  //               if(data.length > 0 ){
  //                   data.forEach((d:any) => {
  //                     dataTransaksi.push({
  //                         nama:d.nama, 
  //                         hp:d.hp , 
  //                         alamat:d.alamat,
  //                         total:d.total, 
  //                         tanggal:d.tanggal, 
  //                         id:d.id,
  //                     })
  //                   });
  //                 }
  // const akhir = dataTransaksi.pop()
            // detilLastArr.value = akhir ; 

  // };
</script>