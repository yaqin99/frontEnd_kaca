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
                    <!-- <span>{{errors.nama}}</span> -->
                  </div>
                  <div class="col-12 row mt-3">
                    <label class="col-sm-3 col-form-label fw-bold">Ukuran(cm)</label>
                    <div class="col-sm-3">
                      <input type="text" v-model="panjang" id="panjang" class="form-control text-center" placeholder="Panjang">
                      <!-- <span>{{ errors.panjang}}</span> -->
                    </div>
                    <div class="col-sm-3 ">
                      <input type="text" v-model="lebar" id="lebar" class="form-control text-center" placeholder="Lebar">
                      <!-- <span>{{errors.lebar}}</span> -->
                    </div>
                    <div class="col-sm-3 ">
                      <input type="text" v-model="tebal" id="tebal" class="form-control text-center" placeholder="Tebal">
                      <!-- <span>{{errors.tebal}}</span> -->
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button"  class="btn btn-primary"   @click="  $emit( isEdit === true ?  'updateJenis' : 'inputJenis', { nama, panjang ,lebar , tebal}) " data-bs-dismiss="modal" >Simpan</button>
              </div>
            </div>
          </div>
        </div>
</template>
<script setup lang="ts">

  import { useField, useForm } from 'vee-validate'
  import * as yup from 'yup'
  import { setLocale } from 'yup'
  
  
  
  const props = defineProps({
    nama: String,
    panjang: String,
    tebal:String,
    lebar:String,
    isEdit:Boolean,
  });

  const emit = defineEmits(['inputJenis','updateJenis']);
  // yup.setLocale({
  //   number: {
  //     min: 'Angka Minimal ${min}',
  //     max: 'Angka Maksimal ${max}'
  //   },
  //   mixed: {
  //     required:'Silahkan isi Form'
  //   }
  // })   
  
  // const schema = yup.object({
  //   nama:yup.string().required(),
  //   panjang: yup.number().required().min(1).max(200),
  //   lebar: yup.number().required().min(1).max(200),
  //   tebal:yup.number().required().min(1).max(200)

  // });
  
  // const {setValues,meta, errors} = useForm({
  //   validationSchema: schema
  // })

  // const { value: panjang , meta:metaPanjang} = useField('panjang');
  // const { value: lebar , meta:metaLebar} = useField('lebar');
  // const { value:nama , meta:metaNama} = useField('nama');
  // const { value:tebal , meta:metaTebal} = useField('tebal');
</script>