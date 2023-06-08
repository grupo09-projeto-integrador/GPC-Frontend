<template>
  <SidebarComponent/>
  <div class="main-content">
    <router-view/>
  </div>
</template>
  
<script lang="ts">
  import SidebarComponent from './components/SidebarComponent.vue';

  export default {
    name: 'App',
    components: {
      SidebarComponent
    }
  }
</script>
  
<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

  *{
    font-family: 'Inter', sans-serif;  
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    height: 100vh;
  }
  .main-content{
    margin-left: 15.6rem;
  }
</style>
  