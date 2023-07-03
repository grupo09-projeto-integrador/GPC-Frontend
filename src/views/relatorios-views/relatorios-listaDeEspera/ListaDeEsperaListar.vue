<template>
    <div class="main-content d-flex flex-column align-items-start">
        <div class="page-header d-flex justify-content-between align-items-center">
            <LinkDinamicoComponent routeList="/relatorios/listadeespera"
                routeRegister="/relatorios/listadeespera/cadastrar" />
        </div>
        <form class="form-app d-flex flex-column align-items-start gap-3 mt-4">
            <div class="d-flex align-items-center align-self-start gap-4">

                <div class=" d-flex flex-column align-self-start">
                    <label for="dt_entrada">Categoria</label>
                    <select class="form-select" style="width: 300px" v-model="selectedCategory">
                        <option value="" selected>Todas as Categorias</option>
  <option v-for="categoria in categoriaList" :value="categoria.nomeCategoria">{{ categoria.nomeCategoria }}</option>
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
        <tr v-for="categoria in filter" :key="categoria.id">
          <template v-for="pessoa in categoria.listaEspera">
            <td>{{ pessoa.nome }}</td>
            <td>{{ pessoa.cpf }}</td>
            <td>{{ pessoa.telefone }}</td>
            <td>{{ categoria.nomeCategoria }}</td>
            <td>
              <div class="d-flex justify-content-center actions">
                <button class="btn btn-sm btn-primary me-2">
                  <i class="bi bi-pencil-square" @click="editar()"></i> Editar
                </button>
                <button class="btn btn-sm btn-danger" @click="excluir()">
                  <i class="bi bi-trash"></i> Excluir
                </button>
              </div>
            </td>
          </template>
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
      tamanhoLista: 0 as number,
      categoriaModel: new Categoria(),
      selectedCategory: '',
      pessoa: [] as Pessoa[],
    };
  },
  mounted() {
    // Fetch the categoriaList data
    this.fetchCategoriaList();
  },
  computed: {
  filter() {
    if (this.selectedCategory === '') {
      return this.categoriaList;
    } else {
      return this.categoriaList.filter((categoria) => {
        return categoria.nomeCategoria === this.selectedCategory;
      });
    }
  }
},

  methods: {
    fetchCategoriaList() {
        const cliente = new CategoriaClient();
      cliente.findAll().then((response) => {
        this.categoriaList = response;
      }).catch((error) => {
        console.error(error);
      });
    },
    editar() {
      // Edit logic
    },
    excluir() {
      // Delete logic
    },
  },
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
