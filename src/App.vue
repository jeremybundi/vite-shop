

<template>

  <div id="app">

  <topheader></topheader>


  <router-view></router-view>
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
