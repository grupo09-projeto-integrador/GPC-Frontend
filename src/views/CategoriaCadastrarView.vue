<template>
  <div class="main-content d-flex flex-column align-items-start gap-5">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent routeList="/categorias" routeRegister="/categorias/cadastrar" />

    </div>
</div>
    
  </template> 


  <script lang="ts">
  import { defineComponent } from 'vue';

  
  import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'CategoriaCadastrar',
  components: {
    LinkDinamicoComponent,
  },
  });
  </script>
  