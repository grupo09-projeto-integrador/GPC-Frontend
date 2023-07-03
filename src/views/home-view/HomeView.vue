<template>
    
  <div class="main-content">
      <div class="container text-center">
  <div class="row align-items-start">
    <div class="col">
      <div class="card text-bg-success mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Success card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  </div>
    </div>
    <div class="col">
     <div class="card text-bg-warning mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Warning card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </div>
    <div class="col">
      <div class="card text-bg-danger mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Danger card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
    </div>
  </div>
</div>
   
          <hr>
          <!------------------------------------------------------------------------------------------------>
          <div class="container d-flex justify-content-between">
          <table class="table caption-top col-md-3 table-bordered ">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Ativos em atraso</th>
      </tr>
    </thead>
   
    <tbody>
      <tr v-for="item in ativosList" :key="item.id">
        <th scope="row"><span></span>{{ item.id }}</th>
        <td v-if="item.isAtrasado">{{ item.ativo.categoria.nomeCategoria }}</td>
        </tr>
    </tbody>
  </table>
  <table class="table caption-top col-md-6 table-bordered ">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Últimos empréstimos</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Ativo</td>
    
        <td><router-link type="button" to="/movimentacoes"><i class="bi bi-box-arrow-up-right"> </i></router-link></td>
      </tr>
    </tbody>
  </table>
  </div>
</div> 
     
  
  
  </template>

  <style scoped>
 @import url('../../../node_modules/bootstrap-icons/font/bootstrap-icons.css');
 
 
 
 /* As cores ficam muito fortes ativando isso. Sério.
 @import url('http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
*/

thead th {
  background-color: #007bff;
  color: #fff;
}

</style>
<script lang="ts">
import { defineComponent } from 'vue';
import { MovimentacoesClient } from '@/client/movimentacao.client';
import {Movimentacao} from '@/model/movimentacao'


export default defineComponent({
  name: 'AtivosLista',
  data(){
    return {
      ativosList: new Array <Movimentacao>(),
      movimentacao: new Movimentacao(),
      movimentacoesClient : new MovimentacoesClient(),
    }
  },
  mounted() {
    this.findAll();
  },
  methods: {
    findAll() {
      this.movimentacoesClient.findAll()
      .then (sucess =>{
        this.ativosList = sucess;
      })
      .catch(error =>{
        console.log(error);
      });
    },

  }
})


</script>





