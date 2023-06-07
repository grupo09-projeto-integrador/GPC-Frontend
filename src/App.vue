<template>
  <SidebarComponent/>
  <router-view/>
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
    #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    height: 100vh;
  }
  </style>
  