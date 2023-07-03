<template>
    <div class="main-content d-flex flex-column align-items-start">
        <LinkDinamicoComponent routeList="/categorias" routeRegister="/categorias/cadastrar" default-active="register" />

        <form class="form-app d-flex flex-column align-items-start mt-4 h-100"  @submit.prevent="submitForm">
            <div class="row d-flex align-items-center align-self-start">
                <div class="col d-flex flex-column align-self-start">
                    <label for="categoria-id">Nome da Categoria</label>
                    <input type="text" class="form-control" id="categoria-nome" placeholder="Nome da Categoria" v-model="categoriaModel.nomeCategoria"/>
                </div>
            </div>

            <div class="d-flex flex-column">
                <label for="patrimonio-id">Número para acusar alerta amarelo</label>
                <input type="number" class="form-control" id="alerta-amarelo" placeholder="Alerta Amarelo" v-model="categoriaModel.maximoAmarelo"/>
            </div>

            <div class="d-flex flex-column">
                <label for="patrimonio-id">Número para acusar alerta vermelho</label>
                <input type="number" class="form-control" id="alerta-vermelho" placeholder="Alerta vermelho" v-model="categoriaModel.minimoAmarelo"/>
            </div>

                    
            <div class="mt-3 d-flex align-items-center gap-3">
                <button type="submit" class="btn btn-primary" @submit="submitForm">Cadastrar</button>
                <p :class="[
          'error-message',
          errorMessage.status === 'success'
            ? 'text-success'
            : 'text-danger',
        ]">
          {{ errorMessage.message }}
        </p>

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
  name: 'CategoriaCadastrar',
  components: {
    LinkDinamicoComponent,
  },


  
  data() {
        return {
            categoriaModel: new Categoria(),
            categoriaClient: new CategoriaClient(),
            nomeCategoria: String,
            maximoAmarelo: Number,
            minimoAmarelo: Number,
            errorMessage: {
        status: "",
        message: "",
      },

        };
    },
    methods: {
        async submitForm() {

            this.categoriaClient.save(this.categoriaModel)
                .then((response) => {
                    console.log(response);
                    this.errorMessage.status = "success";
        this.errorMessage.message = "Categoria cadastrada com sucesso!";

                })
                .catch((error) => {
                    console.log(error);
                    this.errorMessage.status = "error";
                    this.errorMessage.message = error.data;

                });
        }


    }

});
  </script>
  

  <style scoped>

.error-message{

    margin-top: 15px;

}
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