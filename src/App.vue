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
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap');
  :root{
    --cor-principal: #0067C8;
    --cor-secundario: #F7A81B;
    --bg-principal: white;
    --text-secundario: #808192;
    --font-principal: 'Inter', sans-serif;
    --font-weight-leve: 400;
    --font-weight-principal: 500;
    --font-weight-destaque: 600;
    --font-weight-forte: 800;
  }
  *{
    font-family: var(--font-principal)
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
  }
  .main-content{
    margin-left: 15.6rem;
  }
</style>
  