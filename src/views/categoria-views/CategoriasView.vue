<template>  
  <div class="main-content d-flex flex-column align-items-start">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent routeList="/categorias" routeRegister="/categorias/cadastrar" />

      <div class="search-container mt-3">
        <input type="text" class="search-input" placeholder="Search..." />
        <i class="bi bi-search search-icon"></i>
      </div>
    </div>

      <div class="table-display mt-4 w-100">
        <table class="table table-sm table-bordered w-100">
         <thead>
           <tr>
             <th scope="col">Id</th>
              <th scope="col">Nome</th>
              <th scope="col">Qtde Ativos</th>
              <th scope="col">Alerta Amarelo</th>
             <th scope="col">Alerta Vermelho</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>

          <tbody>
          <tr v-for="categoria in categoriaList" :key="categoria.id">
            <td> {{ categoria.id }} </td>
            <td>{{ categoria.nomeCategoria }}</td>
            <td>{{  findAtivosCategoria(categoria.id) }}</td>
            <td>{{ categoria.maximoAmarelo }}</td>
            <td>{{ categoria.minimoAmarelo }}</td>

            <td>
              <div class="d-flex justify-content-center actions">
                <router-link class="btn btn-sm btn-primary me-1" :to="{name: 'categorias editar', query: { id: categoria.id } }">
                  <i class="bi bi-pencil-square"></i> Editar </router-link>
                <button class="btn btn-sm btn-danger bg-danger text-white" @click="excluir(categoria.id)">
                  <i class="bi bi-trash"></i> Excluir </button>
              </div>
            </td>
          </tr>
        </tbody>

        </table>
      </div>
   </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'; // @ is an alias to /src
import { Categoria } from '@/model/categoria';
import { CategoriaClient } from '@/client/categoria.client';
import { AtivoClient } from '@/client/ativo.client';
import { Ativo } from '@/model/ativo';

export default defineComponent({
  name: 'Categoria',
  components: {
    LinkDinamicoComponent,
  },

data(){
    return {
      categoriaList: new Array<Categoria>(),
      searchQuery: '',
      ativosList: new Array<Ativo>(),
      qtde: 0 as number

    };
  },

  mounted() {
    this.fetchCatAtivos();
  },

  methods: {

    async fetchCatAtivos() {
      
        const categoriaClient = new CategoriaClient();

      categoriaClient.findByAtivos().then(sucess => {
       
        this.categoriaList = sucess
      
    }).catch(error => {
      console.log(error);
    });
    },

    async findAtivosCategoria(id: number){

      const AClient = new AtivoClient()

      AClient.findByIdCategoria(id).then( sucess => {

        this.ativosList = sucess

      }).catch(error => {
      console.log(error);
    });


      this.qtde = this.ativosList.length
      return this.qtde
    },
    
    async excluir(id: number) {
      const confirmation = confirm("Você tem certeza de que deseja excluir essa categoria?");
      if (!confirmation) {
        return;
      }

      try {
        const categoriaClient = new CategoriaClient();
        await categoriaClient.delete(id);
        window.location.reload();

      } catch (error) {
        console.error(error);
      }
    },


}});
</script> 

<style scoped>
.custom-hr {
  height: 1.5px;
  width: 250px;
  margin: 10px 0;
  border: none;
  background-color: #c3c3b5;
}

.page-header {
  width: 100%;
}

.search-container {
  position: relative;
  margin-right: 30px;
}

.search-input {
  position: relative;
  width: 300px;
  height: 36px;
  padding: 0.5rem 1rem 0.5rem 2rem;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 50px;
  background: #f5f5f5;
}

.search-input:focus {
  outline: none;
  border-color: #aaa;
}

.search-input::placeholder {
  font-family: "Raleway", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.408px;
  color: #3c3c43;
}

.search-icon {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: #888;
}

thead {
  background-color: var(--cor-principal);
}

th {
  text-align: center;
  height: 30px;
  background-color: #0067c8;
  font-family: "Inter";
  font-weight: 200;
  font-size: 18px;
  color: #ffffff;
}

td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

.actions {
  gap: 5px;
}
</style>
