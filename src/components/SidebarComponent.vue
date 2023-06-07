<template>
  <!-- <sidebar class="navMenu">
    <figure><img class="logo-sidebar" src="assets/logo.png" alt="Sistema GPC Rotary"></figure>
    <nav>
      <ul>
        <li><i class="bi bi-house-fill"></i> <router-link to="/inicio">Inicio</router-link></li>
        <li><i class="bi bi-people-fill"></i><router-link to="/usuarios">Usuários</router-link></li>
        <li><i class="bi bi-gear-fill"></i><router-link to="/categorias">Categorias</router-link></li>
        <li><i class="bi bi-archive-fill"></i><router-link to="/ativos">Ativos</router-link></li>
        <li><i class="bi bi-archive-fill"></i><router-link to="/relatorios">Relatórios</router-link></li>
        <li><i class="bi bi-bell-fill"></i><button class="btnOpenModal" onclick="alert('ok')">Notificações</button></li>
      </ul>
    </nav>
  </sidebar> -->
    <!-- <router-link to="/inicio">Inicio</router-link>
    <router-link to="/usuarios">Usuários</router-link>
    <router-link to="/categorias">Categorias</router-link>
    <router-link to="/ativos">Ativos</router-link>
    <router-link to="/relatorios">Relatórios</router-link>
    <p>Notificações</p>
    <router-link to="/logout">Sair</router-link> -->
    <div class="navbar d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <img alt="Logo Empresa" src="../assets/logo.png">
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <i class="bi bi-house-fill"></i> <router-link class="text-white" to="/inicio">Inicio</router-link>
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <i class="bi bi-people-fill"></i><router-link class="text-white" to="/usuarios">Pessoas</router-link>
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <i class="bi bi-gear-fill"></i><router-link class="text-white" to="/categorias">Categorias</router-link>
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <i class="bi bi-archive-fill"></i><router-link class="text-white" to="/ativos">Ativos</router-link>
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <i class="bi bi-archive-fill"></i><router-link class="text-white" to="/relatorios">Relatórios</router-link>
        </a>
      </li>
    </ul>
    <hr>
    <a href="/logout" class="d-flex align-items-center text-white text-decoration-none">
    <i class="bi bi-box-arrow-right"></i>Logout
    </a>
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
  position: fixed;

}

</style>