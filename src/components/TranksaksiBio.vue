<template>
  <div class="row">
    <div class="col-12 row mt-3">
      <label class="col-sm-3 col-form-label fw-bold">Nama</label>
      <div class="col-sm-9 mt-1">
        <div class="input-group input-group-sm" >
          <button class="input-group-text">
            <span class="fas fa-search"></span>
          </button>
          <input   type="text" class="form-control" placeholder="Username">
        </div>                               
      </div>
      <label for="hp" class="col-sm-3 col-form-label fw-bold">HP</label>
      <div class="col-sm-9 mt-1">
        <div class="input-group input-group-sm">
          <input type="text" class="form-control" placeholder="Input">
        </div>
      </div>
      <label for="alamat" class="col-sm-3 col-form-label fw-bold">Alamat</label>
      <div class="col-sm-9 mt-1">
        <textarea class="form-control form-control-xg" id="addres"></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style>

</style>