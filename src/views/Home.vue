<script setup lang="ts">
    import { onMounted, reactive ,ref } from 'vue';
    import Api from '../services/api';

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
    }

    const isCetak = ref();

    const subTransaksi = reactive<subTransaksiType[]>([])
    const tampilDetail =  async (i:number) => {
        const idnya = i ; 
       console.log(idnya)
        const response = await fetch('http://localhost:8181/tampil/subtransaksi/' + idnya)
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
            })
        });
        isCetak.value = true ; 
        console.log(subTransaksi)
        
    };

    const dataTransaksi = reactive<dataTransaksiType[]>([])


    onMounted(async() =>{
    
    try {
       const response = await fetch('http://localhost:8181/tampil/transaksi');
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
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">5</a></li>
                        <li class="page-item">
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
                            <button type="button" class="btn-close" @click="isCetak=false"></button>
                        </div>
                        </div>
                    </div>
                    <div class="card-body" >
                            <div class="row"  v-for="(sub,i) in subTransaksi" :key="sub.id" >
                                <div class="col align-self-start" style="font-size: 11px;">
                             {{ i + 1}}.Tagihan
                                </div>
                                <div class="col align-self-end text-end" style="font-size: 11px;">
                                {{ sub.tanggal}}
                                </div>
                            </div>
                            <div class="row"  v-for="(x) in dataTransaksi" :key="x.id">
                                <div class="col">
                                    <div class="alert alert-danger fw-bold" role="alert" style="font-size: 11px;">
                                        <span>{{x.nama}} ({{x.hp}})
                                            <p>{{x.alamat}}</p>
                                        </span> 
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center"  v-for="(y,index) in subTransaksi" :key="y.id">
                                <div class="col align-self-start" style="font-size: 11px;">
                                Kaca {{index + 1}} ({{ y.panjang}} x {{ y.lebar}})
                                </div>
                                <div class="col align-self-end text-end" style="font-size: 11px;">
                                {{ y.tanggal}}
                                </div>
                            </div>
                    </div>
                    <div class="card-footer text-center">
                        <a href="#" class="btn btn-danger btn-sm">
                            <i class="bi bi-printer"></i> Cetak
                        </a>
                    </div>
                </div> 
                                            
            </div>
            <div class="d-grid gap-2 mt-2">
                    <router-link to="/transaksii" class="btn btn-primary" type="button">
                        <i class="bi bi-plus-circle"></i>
                        Tambah Tranksaksi
                    </router-link>
             </div>

            </div>     
        </div>
    </div>
    
</template>