<template>
    <div class="modal fade" id="TambahJenisKaca" tabindex="-1" aria-labelledby="TambahJenisKaca" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="alert alert-success modal-header text-center">
                <h5 class="alert-heading" id="TambahJenisKaca">Tambah Jenis Kaca</h5>
                <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form role="form">
                  <div class="form-group ">
                    <input type="text" class="form-control " v-model="nama" id="nama" placeholder="Nama Kaca">
                    <span>{{errors.nama}}</span>
                  </div>
                  <div class="col-12 row mt-3">
                    <label class="col-sm-3 col-form-label fw-bold">Ukuran(cm)</label>
                    <div class="col-sm-3">
                      <input type="text" v-model="panjang" id="panjang" class="form-control text-center" placeholder="Panjang">
                    <span>{{ errors.panjang}}</span>
                    </div>
                    <div class="col-sm-3 ">
                      <input type="text" v-model="lebar" id="lebar" class="form-control text-center" placeholder="Lebar">
                    <span>{{ errors.lebar}}</span>
                    </div>
                    <div class="col-sm-3 ">
                      <input type="text" v-model="tebal" id="tebal" class="form-control text-center" placeholder="Tebal">
                    <span>{{ errors.tebal}}</span>
                    </div>
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
<script>
export default {
    
}
</script>