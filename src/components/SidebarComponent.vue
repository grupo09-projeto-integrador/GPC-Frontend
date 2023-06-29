<template>
  <div class="navbar bg-primary d-flex flex-column justify-content-start p-4 text-white h-100">
    <a href="/" class="d-flex align-items-center">
      <img alt="Logo Empresa" src="../assets/logo.png" />
    </a>
    <ul class="nav nav-pills d-flex flex-column justify-content-center align-items-start pt-5">
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-house-fill"></i>
        <router-link class="nav-link text-white" to="/inicio">Inicio</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-people-fill"></i><router-link class="nav-link text-white" to="/usuarios">Pessoas</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-bookmark-fill"></i><router-link class="nav-link text-white"
          to="/categorias">Categorias</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-archive-fill"></i><router-link class="nav-link text-white" to="/ativos">Ativos</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-calendar-check-fill"></i><router-link class="nav-link text-white"
          to="/movimentacoes">Movimentações</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-clipboard2-data-fill"></i><router-link class="nav-link text-white"
          to="/relatorios">Relatórios</router-link>
      </li>
    </ul>
    <div class="mt-auto d-flex align-items-center justify-content-center gap-3">
      <i class="logout bi bi-box-arrow-right"></i>
      <a href="/logout" class="nav-link text-white">Logout</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarComponent'
})
</script>

<style scoped>
.navbar {
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh; 
}


a {
  font-size: 16px;
}

i {
  font-size: 18px;
}

li {
  margin-bottom: 12px;
}
</style>
