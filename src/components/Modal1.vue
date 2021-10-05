<script setup lang="ts">

  const props = defineProps({
    nama: String,
    panjang: String,
    tebal:String,
  });

  const emit = defineEmits(['simpan']);
</script>
<template>
    <div class="modal fade" id="modal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal 1</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <form role="form">
                  <div class="form-group ">
                    <label class="form-label">Nama Kaca</label>
                    <input type="text" class="form-control " v-model="nama" id="editNama" >
                  </div>
         </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('simpan', { nama, panjang })">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>
