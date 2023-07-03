<template>
    <div class="main-content d-flex flex-column align-items-start">
        <div class="page-header d-flex justify-content-between align-items-center">
            <LinkDinamicoComponent routeList="/relatorios/listadeespera"
                routeRegister="/relatorios/listadeespera/cadastrar" />
            <div class="search-container mt-3">
                <input type="text" class="search-input" placeholder="Buscar Por Nome do Beneficiario..."
                    v-model="searchQuery" />
                <i class="bi bi-search search-icon"></i>
            </div>
        </div>
        <form class="form-app d-flex flex-column align-items-start gap-3 mt-4">
            <div class="d-flex align-items-center align-self-start gap-4">

                <div class=" d-flex flex-column align-self-start">
                    <label for="dt_entrada">Categoria</label>
                    <select class="form-select" style="width: 300px" v-model="categoriaModel">
                    <option v-for="categoria in categoriaList" :value="categoria" >{{ categoria.nomeCategoria }}</option>
                    </select>
                </div>
            </div>
        </form>
        <table class="table table-sm table-bordered w-100 mt-4">
            <thead>
                <tr>
                    <th scope="col">Nome do Beneficiario</th>
                    <th scope="col">CPF do Beneficiario</th>
                    <th scope="col">Contato</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="list in categoriaFiltrada.listaEspera" :key="tamanhoLista">
            <td> {{ list.nome }} </td>
            <td>{{ list.cpf }}</td>
            <td>{{ list.telefone }}</td>
            <td>{{ categoriaFiltrada.nomeCategoria }}</td>
            <td>
              <div class="d-flex justify-content-center actions">
                <button class="btn btn-sm btn-primary me-2">
                  <i class="bi bi-pencil-square"></i> Editar </button>
                <button class="btn btn-sm btn-danger" @click="excluir(list.id)">
                  <i class="bi bi-trash"></i> Excluir </button>
              </div>
            </td>

          </tr>

            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LinkDinamicoComponent from "@/components/LinkDinamicoComponent.vue";
import { Categoria } from '@/model/categoria';
import { Pessoa } from '@/model/pessoa';
import { CategoriaClient } from '@/client/categoria.client';
export default defineComponent({
    name: "ListaDeEsperaListar",
    components: {
        LinkDinamicoComponent,
    },
    data() {
        return {
            searchQuery: "",
            categoriaList: [] as Categoria[],
            categoriaFiltrada: new Categoria,
            tamanhoLista: 0 as number,

            categoriaModel: new Categoria,
            pessoa: [] as Pessoa[],
            nivelUrgencia: [
                { id: 1, nome: 'Alta' },
                { id: 2, nome: 'Média' },
                { id: 3, nome: 'Baixa' },
            ],
        };
    },

    mounted(){

        this.findCategorias()

    },

    methods: {

        async findCategorias(){

        const categoriaClient = new CategoriaClient

        categoriaClient.findAll()
        .then(sucess => {

        this.categoriaList = sucess

        }
        )
        .catch(error => {
        console.log(error);
        }); 
        },

        async findLista(){

        const categoriaClient = new CategoriaClient

        categoriaClient.findById(this.categoriaModel.id).then(sucess => {

            this.categoriaFiltrada = sucess

        }).catch(error => {
        console.log(error);
        }); 

        this.tamanhoLista = this.categoriaFiltrada.listaEspera.length
        console.log(this.tamanhoLista)

        },



async excluir(id: number){
  const confirmation = confirm("Você tem certeza de que deseja remover essa pessoa da lista de espera?");
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



}

    }

});
</script>

<style>
.page-header {
    width: 100%;
}

.search-container {
    position: relative;
    margin-right: 30px;
}

.search-input {
    position: relative;
    width: 350px;
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
    color: #3c3c43;
}

.search-icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: #888;
}


th {
    text-align: center;
    height: 30px;
    font-family: "Inter";
    font-weight: 200;
    font-size: 18px;
    color: #ffffff !important;
    background-color: #0067c8 !important;
}

td {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
}</style>
