<template>
  <div class="container main-content d-flex flex-column justify-content-start rounded">
    <div class="header p-3">
      <div class="title">Relatórios</div>
      <div class="subtitle">Selecione uma opção abaixo:</div>
    </div>
    <div class="nav d-flex flex-column gap-2 p-3">
      <router-link to="/relatorios/beneficiarios">Beneficiários</router-link>
      <router-link to="/relatorios/funcionarios">Funcionários</router-link>
      <router-link to="/relatorios/emprestimos">Empréstimo</router-link>
      <router-link to="/relatorios/listadeespera">Lista de Espera</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RelatoriosView'
});
</script>

<style scoped>
.container {
  max-width: 1000px;
  height: 90vh;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.header {
  border-bottom: 1px solid #e6e6e6;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.subtitle {
  font-size: 16px;
  color: #777;
}


.nav a {
  text-decoration: none;
  background-color: #0067c8;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 16px;
  border-radius: 4px;
  text-align: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.nav a:hover {
  background-color: #4483c3;
  color: #fff;
}
</style>
