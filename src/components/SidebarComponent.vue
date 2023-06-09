<template>
    <div class="navbar d-flex flex-column  p-3 text-white h-100" style="width: 250px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <img alt="Logo Empresa" src="../assets/logo.png">
    </a>
    <hr>
    <hr>
    <ul class="nav d-flex align-items-start nav-pills flex-column mb-auto">
      <li class="nav-item d-flex align-items-center justify-content-center">
          <i class="bi bi-house-fill"></i> <router-link class="nav-link text-white" to="/inicio">Inicio</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-people-fill"></i><router-link class="nav-link text-white" to="/usuarios">Pessoas</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-bookmark-fill"></i><router-link class="nav-link text-white" to="/categorias">Categorias</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-archive-fill"></i><router-link class="nav-link  text-white" to="/ativos">Ativos</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-calendar-check-fill"></i><router-link class="nav-link  text-white" to="/movimentacoes">Movimentações</router-link>
      </li>
      <li class="nav-item d-flex align-items-center justify-content-center">
        <i class="bi bi-clipboard2-data-fill"></i><router-link class="nav-link  text-white" to="/relatorios">Relatórios</router-link>
      </li>
    </ul>
    <hr>
    <li class="nav-item d-flex align-items-center justify-content-center">
      <i class="logout bi bi-box-arrow-right"></i>
      <a href="/logout" class="nav-link text-white">Logout</a>
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: "SidebarComponent"
})
</script>

<style scoped>
.navbar{
  height: 100%;
  background-color: var(--cor-principal);
}

a{
  font-size: 16px;
}

i{
  font-size: 18px;
}

li{
  margin-bottom: 12px;
}

</style>