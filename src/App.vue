<template>
  <SidebarComponent />
  <router-view />
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
  
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap');


$theme-colors: (
  "primary": #0067C8,
  "warning": #F7A81B,
  "secondary": #808192
);
$body-bg: white;


@import "node_modules/bootstrap/scss/bootstrap";


:root {
  --font-principal: 'Inter', sans-serif;
  --font-weight-leve: 400;
  --font-weight-principal: 500;
  --font-weight-destaque: 600;
  --font-weight-forte: 800;
}

* {
  font-family: var(--font-principal)
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  display: flex;
  width: 100%;
  height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 30px;
  margin-top: 20px;
  margin-right: 1rem;
}</style>
  