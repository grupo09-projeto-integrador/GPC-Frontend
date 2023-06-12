<template>
    <div class="main-content d-flex flex-column align-items-start">
        <LinkDinamicoComponent routeList="/categorias" routeRegister="/categorias/cadastrar" default-active="register" />

        <form class="form-app d-flex flex-column align-items-start mt-4 h-100">
            <div class="row d-flex align-items-center align-self-start">
                <div class="col d-flex flex-column align-self-start">
                    <label for="categoria-id">Nome da Categoria</label>
                    <input type="text" class="form-control" id="categoria-nome" placeholder="Nome da Categoria" />
                </div>
            </div>

            <div class="d-flex flex-column">
                <label for="patrimonio-id">Número para acusar alerta amarelo</label>
                <input type="number" class="form-control" id="alerta-amarelo" placeholder="Alerta Amarelo" />
            </div>

            <div class="d-flex flex-column">
                <label for="patrimonio-id">Número para acusar alerta vermelho</label>
                <input type="number" class="form-control" id="alerta-vermelho" placeholder="Alerta vermelho" />
            </div>

                    
            <div class="col-12 p-0">
                <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>
        </form>
    </div>
    
  </template> 


  <script lang="ts">
  import { defineComponent } from 'vue';

  
  import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'; // @ is an alias to /src
import { CategoriaClient } from '@/client/categoria.client';
import { Categoria } from '@/model/categoria';
import { Condicao } from '@/model/condicao';
import { Status } from '@/model/status';


export default defineComponent({
  name: 'CategoriaCadastrar',
  components: {
    LinkDinamicoComponent,
  },


  
  data() {
        return {
            conditions: Object.values(Condicao),
            statuses: Object.values(Status),
            categoria: new Categoria(),
            CategoriaClient: new CategoriaClient()
        };
    },
    methods: {
        async submitForm() {
            const payload = {
                categoria: {
                    id: 1,
                    isSuspenso: false,
                    dataEdicao: new Date(),
                    dataCriacao: new Date()
                } 
            };

            const categoria = new Categoria();
            categoria.isSuspenso = true;
            categoria.nomeCategoria = this.categoria.nomeCategoria;
            categoria.minimoAmarelo = this.categoria.minimoAmarelo;
            categoria.maximoAmarelo = this.categoria.maximoAmarelo;

            this.CategoriaClient.save(categoria)
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