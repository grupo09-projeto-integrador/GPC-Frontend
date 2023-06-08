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
    <div class="navbar fixed-top d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 250px;">
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
        <i class="bi bi-clipboard2-data-fill"></i><router-link class="nav-link  text-white" to="/relatorios">Relatórios</router-link>
      </li>
    </ul>
    <hr>
    <li class="nav-item d-flex align-items-center justify-content-center">
      <i class="bi bi-box-arrow-right"></i>
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
  /* position: fixed; */
}

a{
  font-size: 16px;
}

i{
  font-size: 18px;
  margin-bottom: 6px;
}

li{
  margin-bottom: 12px;
}

</style>