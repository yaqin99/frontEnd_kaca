<script setup lang="ts">
  
  import { useField, useForm } from 'vee-validate'
  import * as yup from 'yup'
  import { setLocale } from 'yup'

  yup.setLocale({
    number: {
      min: 'Angka Minimal ${min}',
      max: 'Angka Maksimal ${max}'
    }
  })   
  
  const schema = yup.object({
    nama:yup.string().required(),
    panjang: yup.number().required().min(1).max(200),
    lebar: yup.number().required().min(1).max(200),
    tebal:yup.number().required().min(1).max(200)

  });
  
  const {setValues,meta, errors} = useForm({
    validationSchema: schema
  })

  const { value: panjang , meta:metaPanjang} = useField('panjang')
  const { value: lebar , meta:metaLebar} = useField('lebar');
  const { value: nama , meta:metaNama } = useField('nama');
  const { value: tebal , meta:metaTebal} = useField('tebal');




  const props = defineProps({
    nama: String,
    panjang: Number,
    tebal:Number,
    lebar:Number,
  });

    nama.value = nama ; 
    panjang.value = panjang ; 
    lebar.value = lebar ; 
    tebal.value = tebal ; 
    console.log(nama.value)
  const emitEditJenis = defineEmits(['simpanEdit']);

  
</script>
<template>
    <div class="modal fade" id="editJenis" tabindex="-1" aria-labelledby="editJenis" aria-hidden="true">
      
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="alert alert-warning modal-header text-center">
                <h5 class="alert-heading" id="TambahJenisKaca">Edit Jenis Kaca</h5>
                <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              {{ nama }} {{panjang}} {{ lebar}} {{tebal}}
              <div class="modal-body">
                <form role="form">
                  <div class="form-group ">
                    <label class="form-label">Nama Kaca</label>
                    <input type="text" class="form-control " v-model="nama" id="editNama" >
                    <span>{{nama}}</span>
                  </div>
                  <div class="col-12 row mt-3">
                    <label class="col-sm-3 col-form-label fw-bold">Ukuran(cm)</label>
                    <div class="col-sm-3">
                      <input type="text" v-model="panjang"  id="editPanjang" class="form-control text-center" placeholder="Panjang">
                    </div>
                    <div class="col-sm-3 ">
                      <input type="text" v-model="lebar" id="editLebar" class="form-control text-center" placeholder="Lebar">
                    </div>
                    <div class="col-sm-3 ">
                      <input type="text" v-model="tebal" id="editTebal" class="form-control text-center" placeholder="Tebal">
                    </div>
                    
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="button" class="btn btn-primary"  @click="$emit('simpanEdit', { nama, panjang ,lebar,tebal})" data-bs-dismiss="modal" >Simpan</button>
              </div>
            </div>
          </div>
        </div>
</template>

