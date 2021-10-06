<script setup lang="ts">
    import { onMounted, reactive ,ref } from 'vue';

   
    type dataTransaksiType = {
        nama : string , 
        hp : number , 
        alamat : string ,
        total:number,
        tanggal:string,
        id:number,
    }
    type subTransaksiType = { 
        alamat : string ,
        total:number,
        tanggal:string,
        panjang:number, 
        biaya:number, 
        nama_kaca:string,
        id_jenis_kaca:number,
        bayar:number , 
        kembali:number , 
        id:number,
        lebar:number,
        nama:number, 
        hp:number,
    }

    const isCetak = ref();
    const clickAgain = ref();
    const subTransaksi = reactive<subTransaksiType[]>([])

    const tampilDetail =  async (i:number) => {
        if(clickAgain.value = true ){
            subTransaksi.splice(0,subTransaksi.length);

        }
        const idnya = i ; 
       console.log(idnya)
        const response = await fetch('http://localhost:8181/transaksi/subtransaksi/' + idnya)
        const data = await response.json();
        data.forEach((sub:any) => {
            subTransaksi.push({
                id:sub.id,
                alamat : sub.alamat ,
                total:sub.total,
                tanggal:sub.tanggal,
                panjang:sub.panjang, 
                lebar:sub.lebar,
                biaya:sub.biaya, 
                nama_kaca:sub.nama_kaca,
                id_jenis_kaca:sub.id_jenis_kaca,
                bayar:sub.bayar, 
                kembali:sub.kembali,
                nama:sub.nama,
                hp:sub.hp
            })
        });
        isCetak.value = true ; 
        clickAgain.value = true;
        console.log(subTransaksi)
    };

    const clearAll = () => {
        subTransaksi.splice(0,subTransaksi.length);
        isCetak.value = false ; 
    };

    const dataTransaksi = reactive<dataTransaksiType[]>([])
    const jumlahData = ref();

    const coba = ref([1])

    const indexnya = ref(1)
    const halamanAktif = async (i:number) => {
        const terpilih = true ; 
        indexnya.value = i;
        const path = 'http://localhost:8181/transaksi?page=' + indexnya.value ;
        dataTransaksi.splice(0,dataTransaksi.length);
        const response = await fetch(path);
            const data = await response.json();
            if(data.length > 0 ){
                data.forEach((d:any) => {
                    dataTransaksi.push({
                        nama:d.nama, 
                        hp:d.hp , 
                        alamat:d.alamat,
                        total:d.total, 
                        tanggal:d.tanggal, 
                        id:d.id,
                })
            });
            }
        }
    
    
    const firstPage = async () => {
        indexnya.value = 1 ;
         dataTransaksi.splice(0,dataTransaksi.length);
        const path = 'http://localhost:8181/transaksi?page=' + 1  ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
                      dataTransaksi.push({
                          nama:d.nama, 
                          hp:d.hp , 
                          alamat:d.alamat,
                          total:d.total, 
                          tanggal:d.tanggal, 
                          id:d.id,
                      })
                    });
                  }
        
    }
    const halamanTurun = async () => {
        indexnya.value -- ;
         dataTransaksi.splice(0,dataTransaksi.length);
        const path = 'http://localhost:8181/transaksi?page=' + indexnya.value  ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
                      dataTransaksi.push({
                          nama:d.nama, 
                          hp:d.hp , 
                          alamat:d.alamat,
                          total:d.total, 
                          tanggal:d.tanggal, 
                          id:d.id,
                      })
                    });
                  }
        
    }
    const halamanNaik = async () => {
         dataTransaksi.splice(0,dataTransaksi.length);
         indexnya.value ++ ;
        const path = 'http://localhost:8181/transaksi?page=' + indexnya.value ;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
                      dataTransaksi.push({
                          nama:d.nama, 
                          hp:d.hp , 
                          alamat:d.alamat,
                          total:d.total, 
                          tanggal:d.tanggal, 
                          id:d.id,
                      })
                    });
                  }
                
    }
    const lastPage = async () => {
         dataTransaksi.splice(0,dataTransaksi.length);
         indexnya.value  = coba.value.length ;
        const path = 'http://localhost:8181/transaksi?page=' + coba.value.length;
       
        const response = await fetch(path);
                const data = await response.json();
                if(data.length > 0 ){
                    data.forEach((d:any) => {
                      dataTransaksi.push({
                          nama:d.nama, 
                          hp:d.hp , 
                          alamat:d.alamat,
                          total:d.total, 
                          tanggal:d.tanggal, 
                          id:d.id,
                      })
                    });
                  }
                
    }
    onMounted(async() =>{
    
    try {
        const ambilArr = await fetch('http://localhost:8181/transaksi/data');
        const result = await ambilArr.json();
        
        const arrLength = await result.length;
        const pagingLength = Math.ceil(arrLength / 5);
        
        coba.value.length = pagingLength;
        const response = await fetch('http://localhost:8181/transaksi');
        const data = await response.json();
        if(data.length > 0 ){
            data.forEach((d:any) => {
                dataTransaksi.push({
                    nama:d.nama, 
                    hp:d.hp , 
                    alamat:d.alamat,
                    total:d.total, 
                    tanggal:d.tanggal, 
                    id:d.id,
                })
            });
            }
    }
    catch(err){
      console.log(err)
    }
    
  })
</script>


<template> 
    <div class="container">        
        <div class="row my-4">
            <div class="col-9">
                <h1 class="text-center">Toko Anugerah</h1>
            </div>
            <div class="col-3 text-end mt-3">
                <router-link to="/stok" class="btn btn-danger">
                <span class="bi bi-gear"></span>  
                </router-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-9 mt-2">
                <table class="table table-borderless text-center">
                   <thead class="table table-dark">
                        <tr>
                            <th>#</th>
                            <th>Tanggal</th>
                            <th>Pembeli</th>
                            <th>Pendapatan</th>
                            <th>Aksi</th>
                           
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(data, i) in dataTransaksi" :key="data.id">
                            <td>{{ i + 1}}</td>
                            <td>{{data.tanggal}}</td>
                            <td>{{ data.nama}}</td>
                            <td>{{'Rp.'+data.total}}</td>
                           
                            <td>
                                <button type="button" class=" btn btn-warning " @click="tampilDetail(data.id)">Cetak</button>
                           </td>
                        </tr>
                   </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item" v-if="indexnya != 1" @click="firstPage()">
                        <a class="page-link" href="#" aria-label="Previous" >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>

                        <li class="page-item"  v-if="indexnya != 1" @click="halamanTurun()">
                        <a class="page-link"  aria-label="Next">
                            <span aria-hidden="true">Back</span>
                        </a>
                        </li>

                        <li :class="terpilih == true ? 'border border-primarys' : 'gakAda'" v-for="(page , index) in coba " :key="index" :value="index+1"  @click="halamanAktif(index + 1)"  class="page-item"><a class="page-link" href="#">{{ index + 1 }}</a></li>
                       
                        <li class="page-item"  v-if="indexnya !== coba.length" @click="halamanNaik()">
                        <a class="page-link"  aria-label="Next" >
                            <span aria-hidden="true">Next</span>
                        </a>
                        </li>

                        <li class="page-item" v-if="indexnya !== coba.length" @click="lastPage()">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="col-sm-3"  >
            <div  id="collapseExample">
                <div class="card"  v-if="isCetak">
                    <div class="card-header fw-bold text-center">
                        <div class="row">
                        <div class="col-8 text-end">
                            Tranksaksi
                        </div>
                        <div class="col-4 text-end">
                            <button type="button" class="btn-close" @click="clearAll()"></button>
                        </div>
                        </div>
                    </div>
                    <div class="card-body"  v-for="(sub,i) in subTransaksi" :key="sub.id" >
                            <div class="row"  >
                                <div class="col align-self-start" style="font-size: 11px;">
                             {{ i + 1}}.Tagihan
                                </div>
                                <div class="col align-self-end text-end" style="font-size: 11px;">
                                {{ sub.tanggal}}
                                </div>
                            </div>
                            <div class="row" >
                                <div class="col">
                                    <div class="alert alert-danger fw-bold" role="alert" style="font-size: 11px;">
                                        <span>{{sub.nama}} ({{sub.hp}})
                                            <p>{{sub.alamat}}</p>
                                        </span> 
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center"  >
                                <div class="col align-self-start" style="font-size: 11px;">
                                Kaca {{index + 1}} ({{sub.panjang}} x {{sub.lebar}})
                                </div>
                                <div class="col align-self-end text-end" style="font-size: 11px;">
                                {{ sub.tanggal}}
                                </div>
                            </div>
                    </div>
                    <div class="card-footer text-center">
                        <button type="button" class="btn btn-danger btn-sm" >
                            <i class="bi bi-printer"></i> Cetak
                        </button>
                    </div>
                </div> 
                                            
            </div>
            <div class="d-grid gap-2 mt-2">
                    <router-link to="/transaksi" class="btn btn-primary" type="button">
                        <i class="bi bi-plus-circle"></i>
                        Tambah Tranksaksi
                    </router-link>
             </div>

            </div>     
        </div>
    </div>
    
</template>
<style scoped>
.terpilih {
    border: 2px solid black;
}
</style>