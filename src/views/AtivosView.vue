<template>
  <div class="main-content d-flex flex-column align-items-start gap-5">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent routeList="/ativos" routeRegister="/ativos/cadastrar" />

      <div class="search-container mt-3">
        <input type="text" class="search-input" placeholder="Search..." v-model="searchQuery" />
        <i class="bi bi-search search-icon"></i>
      </div>
    </div>

    <div class="table-display mt-4 w-100">
      <table class="table table-sm table-bordered w-100">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Id Categoria</th>
            <th scope="col">Id Património</th>
            <th scope="col">Condição</th>
            <th scope="col">Status</th>
            <th scope="col">Data Entrada</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ativo in ativos" :key="ativo.id">
            <td> {{ ativo.id }} </td>
            <td>{{ ativo.categoria.id }}</td>
            <td>{{ ativo.idPatrimonio }}</td>
            <td>{{ ativo.condicao }}</td>
            <td>{{ ativo.status }}</td>
            <td>{{ formatDate(ativo.dataEntrada) }}</td>

            <td>
              <div class="d-flex justify-content-center actions">
                <button class="btn btn-sm btn-primary me-2">
                  <i class="bi bi-pencil-square"></i> Editar </button>
                <button class="btn btn-sm btn-danger" @click="deleteItem(ativo)">
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
import { computed, defineComponent } from "vue";
import LinkDinamicoComponent from "@/components/LinkDinamicoComponent.vue";
import { Ativo } from "@/model/ativo";
import { AtivoClient } from "@/client/ativo.client";
import axios from "axios";

export default defineComponent({
  name: "AtivosView",
  components: {
    LinkDinamicoComponent,
  },
  data() {
    return {
      ativos: [] as Ativo[],
      searchQuery: '',
    };
  },
  mounted() {
    this.fetchAtivos();
  },
  methods: {
    async fetchAtivos() {
      try {
        const ativoClient = new AtivoClient();
        this.ativos = await ativoClient.findAll();
      } catch (error) {
        console.error(error);
      }
    },

    formatDate(dateString: string | number | Date) {
      const dateTime = new Date(dateString);
      const formattedDate = dateTime.toLocaleDateString();
      const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${formattedDate} ${formattedTime}`;
    },

    async deleteItem(ativo: Ativo) {
      const confirmation = confirm("Você tem certeza de que deseja excluir este ativo?");
      if (!confirmation) {
        return;
      }

      try {
        const ativoClient = new AtivoClient();
        await ativoClient.delete(ativo.id);
        this.ativos = this.ativos.filter((item) => item.id !== ativo.id);
      } catch (error) {
        console.error(error);
      }
    }
  },
});
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
