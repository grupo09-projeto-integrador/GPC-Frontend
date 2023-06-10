<template>
  <div class="main-content d-flex flex-column">
    <p class="title-page">Ativos</p>
    <hr class="custom-hr">
    <LinkDinamicoComponent routeList="/ativos" routeRegister="/ativos/cadastrar"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue';
export default defineComponent({
    name: "AtivosView",
    components: {
      LinkDinamicoComponent
    }
})
</script>

<style scoped>
.title-page {
  font-family: var(--font-principal);
  font-size: 1.463rem;
}

.custom-hr {
  border: none;
  height: 1.5px;
  background-color: #C3C3B5;
  margin: 10px 0;
  width: 250px;
}

</style>
