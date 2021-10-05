<script setup lang="ts">
    
  import { useField, useForm } from 'vee-validate';
  import * as yup from 'yup';
  import { setLocale } from 'yup';

  const props = defineProps({
    harga:Number , 
    stok:Number , 
    tanggal:String , 
  });

  const emit = defineEmits(['inputStok']);
  
  yup.setLocale({
    number: {
      min: 'Angka Minimal ${min}',
      max: 'Angka Maksimal ${max}'
    },
    mixed: {
      required:'Silahkan isi Form'
    }
  })   
  
  const schema = yup.object({
    harga_beli:yup.number().required().min(1).max(100000000),
    harga_jual:yup.number().required().min(1).max(100000000),
    stok:yup.number().required().min(1).max(500),
    tanggal:yup.date().required(),

  });
  
  const {setValues,meta, errors} = useForm({
    validationSchema: schema
  })

  const { value: harga_beli , meta:metaHargaBeli} = useField('harga_beli');
  const { value:stok , meta:metahStok} = useField('stok');
  const { value:tanggal , meta:metaTanggal} = useField('tanggal');
  const { value:harga_jual , meta:metaHargaJual} = useField('harga_jual')
  
</script>
<template>
    <div class="modal fade" id="tambahstok" tabindex="-1" aria-labelledby="tambahstok" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="tambahstok">Tambah Stok</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="form-group  mt-3">
                        <input type="text mt-3" v-model="harga_beli" class="form-control" placeholder="Harga Beli">
                        <span>{{errors.harga_beli}}</span>
                      </div>
                      <div class="form-group  mt-3">
                        <input type="text mt-3" v-model="harga_jual" class="form-control" placeholder="Harga Jual">
                        <span>{{errors.harga_jual}}</span>
                      </div>
                      <div class="form-group  mt-3">
                        <input type="text" v-model="stok"  class="form-control" placeholder="Jumlah">
                      <span>{{errors.stok}}</span>
                      </div>
                      <div class="form-group  mt-3">
                        <input type="date"  v-model="tanggal" class="form-control" placeholder="Tanggal">
                        <span>{{errors.tanggal}}</span>
                      </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                                <button type="button" class="btn btn-primary"  :disabled="!meta.valid"  @click="$emit('inputStok', { tanggal, stok , harga_beli , harga_jual })"  data-bs-dismiss="modal">Simpan</button>
                            </div>
                            </div>
                        </div>
                      </div>
</template>

