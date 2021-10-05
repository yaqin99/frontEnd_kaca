<script setup lang="ts">

</script>
<template>
    <div class="modal fade" id="modalEdit" tabindex="-1" aria-labelledby="TambahJenisKaca" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="alert alert-success modal-header text-center">
                <h5 class="alert-heading" id="TambahJenisKaca">Tambah Jenis Kaca</h5>
                <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form role="form">
                  <div class="form-group ">
                    <label for="tanggal" class="form-label">Tanggal</label>
                    <input type="text" class="form-control "   id="tanggal" >
                   
                  </div>
                  
                  <div class="form-group ">
                    <label for="harga_beli" class="form-label">Harga Beli</label>
                    <input type="text" class="form-control "  v-model="nama" id="harga_beli" >
                   
                  </div>
                  <div class="form-group ">
                    <label for="harga_jual" class="form-label">Harga Jual</label>
                    <input type="text" class="form-control " v-model="nama" id="harga_jual" >
                   
                  </div>
                  <div class="form-group ">
                    <label for="jumlah_beli" class="form-label">Jumlah Beli</label>
                    <input type="text" class="form-control "  v-model="nama" id="jumlah_beli" >
                   
                  </div>
                  
                  
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-primary"  @click="inputJenis()" data-bs-dismiss="modal" >Simpan</button>
              </div>
            </div>
          </div>
        </div>
</template>