<script setup lang="ts">
    import { onMounted, reactive ,ref } from 'vue';
    import Api from '../services/api';

    type dataTransaksiType = {
        nama : string , 
        hp : number , 
        alamat : string ,
    }


    const isCetak = ref();
    const tampilDetail = () => {
        isCetak.value = true ; 
    };

    let dataTransaksi = reactive<dataTransaksiType[]>([])

    onMounted(async() =>{
    
    try {
        const data = await Api.getTransaksi('/tampil/transaksi',dataTransaksi)
    }
    catch(err){
      console.log(err)
    }
    
  })
</script>


<template> 
    <div class="container">        
        <div class="row ">
            <div class="col-9">
                <h1 class="text-center">Toko Anugerah</h1>
            </div>
            <div class="col-3 text-end">
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
                                <button type="button" class=" btn btn-warning " @click="tampilDetail()">Cetak</button>
                           </td>
                        </tr>
                        <tr>
                            <td>asd</td>
                            <td>asda</td>
                            <td>asdasd</td>
                            <td>asdasd</td>
                            <td><button type="button" class=" btn btn-warning " @click="tampilDetail()">Cetak</button></td>
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
                            <div class="row" >
                                <div class="col align-self-start" style="font-size: 11px;">
                                #1 Invoice
                                </div>
                                <div class="col align-self-end text-end" style="font-size: 11px;">
                                12/10/2021
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="alert alert-danger fw-bold" role="alert" style="font-size: 11px;">
                                        <span>Rahman (085231339223)
                                            <p>Jl. Dirgahayu Gg. IV</p>
                                        </span> 
                                    </div>
                                </div>
                            </div>
                            <div class="row align-items-center" >
                                <div class="col align-self-start" style="font-size: 11px;">
                                Kaca 1 (56 x 23)
                                </div>
                                <div class="col align-self-end text-end" style="font-size: 11px;">
                                12/10/2021
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