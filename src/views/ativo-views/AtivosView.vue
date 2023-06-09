<template>
  <div class="main-content d-flex flex-column align-items-start">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent routeList="/ativos" routeRegister="/ativos/cadastrar" />

      <div class="search-container mt-3">
        <input type="text" class="search-input" placeholder="Buscar por Id Património ..." v-model="searchQuery" />
        <i class="bi bi-search search-icon"></i>
      </div>
    </div>

    <form class="form-app d-flex flex-column align-items-start gap-3 mt-4">
      <div class="row d-flex align-items-center align-self-start">

        <div class="col d-flex flex-column align-self-start">
          <label for="condicao_id">Condição</label>
          <select class="form-select" v-model="selectedCondicao" style="width: 230px">
            <option value="" selected>Todas as condiçoes</option>
            <option v-for="condicao in availableCondicao" :value="condicao">{{ condicao }}</option>
          </select>
        </div>

        <div class="col d-flex flex-column align-self-start">
          <label for="status_id">Status</label>
          <select class="form-select" v-model="selectedStatus" style="width: 230px">
            <option value="" selected>Todas as status</option>
            <option v-for="status in availableStatus" :value="status">{{ status }}</option>
          </select>
        </div>

        <div class="col d-flex align-self-start align-items-center gap-2">

          <div class="d-flex flex-column">
            <label for="dt_entrada">Data de Entrada</label>
            <input type="date" class="form-control" id="dt_entrada" style="width: 230px" v-model="selectedDate" />
          </div>
        </div>
        <div class="col d-flex align-self-center align-items-center gap-2 ml-2 mt-4">
          <div class="d-flex flex-column">
            <input class="form-check-input" type="checkbox" id="flexCheckIndeterminate" v-model="checked" />
            <label class="form-check-label p-0" for="flexCheckIndeterminate">
              Ativos Emprestados
            </label>
          </div>
        </div>
      </div>
    </form>

    <div class="table-display w-100 mt-4 d-flex flex-column">
      <table class="table table-sm table-bordered w-100">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome Categoria</th>
            <th scope="col">Id Património</th>
            <th scope="col">Condição</th>
            <th scope="col">Status</th>
            <th scope="col">Data de Entrada</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ativo in ativosFilter" :key="ativo.id">
            <td> {{ ativo.id }} </td>
            <td>{{ ativo.categoria.nomeCategoria }}</td>
            <td>{{ ativo.idPatrimonio }}</td>
            <td>{{ ativo.condicao }}</td>
            <td>{{ ativo.status }}</td>
            <td>{{ formatDate(ativo.dataEntrada) }}</td>

            <td class="d-flex align-items-center mt-2 actions" style="border: none;">
              <button class="btn btn-sm btn-primary" @click="editItem(ativo)" style="width: 90px;">
                <i class="bi bi-pencil-square"></i> Editar </button>
              <button class="btn btn-sm btn-danger" @click="deleteItem(ativo)" 
                style="background-color: #dc3545;color: #fff;width: 90px;">
                <i class="bi bi-trash"></i> Excluir </button>
              <button class="btn btn-sm btn-warning d-flex align-items-center gap-2" @click="emprestarAtivo(ativo)"
                style="color: #fff;">
                <i :class="ativo.status === 'USANDO' ? 'bi bi-lock-fill' : 'bi bi-unlock-fill'"></i>
                {{ ativo.status === 'USANDO' ? 'Emprestado' : 'Emprestar' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Add pagination controls -->
      <div class="pagination-container align-self-end">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 0 }">
            <a class="page-link" href="#" aria-label="Previous" @click="previousPage">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" :disabled="ativosFilter.length < pageSize">
            <a class="page-link" href="#" aria-label="Next" @click="nextPage">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import LinkDinamicoComponent from "@/components/LinkDinamicoComponent.vue";
import { Ativo } from "@/model/ativo";
import { AtivoClient } from "@/client/ativo.client";
import axios from "axios";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Status } from "@/model/status";
import { Condicao } from "@/model/condicao";

export default defineComponent({
  name: "AtivosView",
  components: {
    LinkDinamicoComponent,
  },
  data() {
    return {
      ativos: [] as Ativo[],
      searchQuery: "",
      selectedStatus: null as Status | null,
      selectedCondicao: null as Condicao | null,
      selectedDate: null as string | null,
      currentPage: 0,
      pageSize: 6,
      checked: false,
    };
  },
  computed: {
    ativosFilter(): Ativo[] {
      if (!this.searchQuery && !this.selectedStatus && !this.selectedCondicao && !this.selectedDate && !this.checked) {
        return this.ativos;
      } else {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        const filteredAtivos = this.ativos.filter((ativo: Ativo) => {
          const matchesQuery = ativo.idPatrimonio.toString().toLocaleLowerCase().includes(lowerCaseQuery);
          const matchesStatus = !this.selectedStatus || ativo.status === this.selectedStatus;
          const matchesCondicao = !this.selectedCondicao || ativo.condicao === this.selectedCondicao;
          const matchesDate = !this.selectedDate || ativo.dataEntrada.toString().includes(this.selectedDate);
          const matchesEmprestado = !this.checked || ativo.status === Status.USANDO;

          return matchesQuery && matchesStatus && matchesCondicao && matchesDate && matchesEmprestado;
        });

        const startIndex = this.currentPage * this.pageSize;
        return filteredAtivos.slice(startIndex, startIndex + this.pageSize);
      }
    },

    availableStatus(): string[] {
      const status = Object.values(Status);
      return status.map((st) => st.toUpperCase());
    },
    availableCondicao(): string[] {
      const condicao = Object.values(Condicao);
      return condicao.map((cond) => cond.toUpperCase());
    },
  },

  mounted() {
    this.fetchAtivos();
  
  },
  methods: {
    async fetchAtivos() {
      try {
        const pageRequest = new PageRequest();
        pageRequest.currentPage = this.currentPage;
        pageRequest.pageSize = this.pageSize;

        const ativoClient = new AtivoClient();
        const pageResponse: PageResponse<Ativo> = await ativoClient.findByFiltrosPaginado(pageRequest);
        this.ativos = pageResponse.content;
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
    },

    async editItem(ativo: Ativo) {
      try {
        const ativoClient = new AtivoClient();
        const editAtivoId = ativo.id;
        await this.$router.push({ name: "ativos-editar", params: { ativoId: editAtivoId } });
      } catch (error) {
        console.error(error);
      }

    },

    async emprestarAtivo(ativo: Ativo) {
      if (ativo.status == Status.USANDO) {
        alert("Ativo já emprestado")
        return;
      } else {
        try {
          const emprestarAtivoId = ativo.id;
          await this.$router.push({ name: "movimentacoes.cadastrar", params: { ativoId: emprestarAtivoId } });
        } catch (error) {
          console.error(error);
        }
      }
    },


    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchAtivos();
      }
    },
    nextPage() {
      if (this.ativosFilter.length === this.pageSize) {
        this.currentPage++;
        this.fetchAtivos();
      }
    },
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

thead {
  background-color: var(--cor-principal);
}

th {
  text-align: center;
  height: 30px;
  background-color: #0d6efd !important;
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
