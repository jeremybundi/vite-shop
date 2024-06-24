

<template>

  <div id="app">

    
 
  <topheader></topheader>

  <div class="top-48 relative"> 
    <router-view></router-view>
  </div>


</div>
 
</template>
<script setup>
import topheader from './views/Topheader.vue'

const components = {
  'topheader': topheader
}
</script>

<style scoped>
</style>
