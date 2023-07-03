<template>
    <div class="main-content d-flex flex-column align-items-start">
        <LinkDinamicoComponent routeList="/categorias" routeRegister="/categorias/cadastrar" default-active="register" />

        <form class="form-app d-flex flex-column align-items-start mt-4 h-100"  @submit.prevent="submitForm">
            <div class="row d-flex align-items-center align-self-start">
                <div class="col d-flex flex-column align-self-start">
                    <label for="categoria-id">Nome da Categoria</label>
                    <input type="text" class="form-control" id="categoria-nome" v-model="categoriaModel.nomeCategoria"/>
                </div>
            </div>

            <div class="d-flex flex-column">
                <label for="patrimonio-id">Número para acusar alerta amarelo</label>
                <input type="number" class="form-control" id="alerta-amarelo" v-model="categoriaModel.maximoAmarelo"/>
            </div>

            <div class="d-flex flex-column">
                <label for="patrimonio-id">Número para acusar alerta vermelho</label>
                <input type="number" class="form-control" id="alerta-vermelho" v-model="categoriaModel.minimoAmarelo"/>
            </div>

                    
            <div class="col-12 p-0">
                <button type="submit" class="btn btn-primary" @submit="submitForm">Editar</button>
                </div>
        </form>
    </div>
    
  </template> 


  <script lang="ts">
  import { defineComponent } from 'vue';

  
  import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'; // @ is an alias to /src
import { CategoriaClient } from '@/client/categoria.client';
import { Categoria } from '@/model/categoria';

export default defineComponent({
  name: 'CategoriaEditar',
  components: {
    LinkDinamicoComponent,
  },


  
  data() {
        return {
            categoriaModel: new Categoria,
            categoriaClient: new CategoriaClient

        };
    },

    mounted() {

    this.findById(Number(this.id));

    },

    computed: {
    id() {
      return this.$route.query.id
    },
  },


    methods: {

        findById(id: number) {
      const categoriaClient = new CategoriaClient()

      categoriaClient.findById(id).then(sucess => {
          this.categoriaModel = sucess
        })
        .catch(error => {
            console.log(error)
        })
    },

        async submitForm() {


            this.categoriaClient.update(this.categoriaModel)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }


    }

});
  </script>
  

  <style scoped>
form {
    width: 100%;
    height: 100%;
    gap: 15px;
}

.form-select {
    text-indent: 10px;
    display: block;
    width: 300px;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>