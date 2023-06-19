<template>
  <div class="main-content d-flex flex-column align-items-start">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent
        routeList="/movimentacoes"
        routeRegister="/movimentacoes/cadastrar"
      />
    </div>
    <form
      class="form-app d-flex flex-column align-items-start gap-3 mt-4 h-auto"
    >
      <div class="row d-flex align-items-center align-self-start">
        <div class="col d-flex flex-column align-self-start">
          <label for="ativo-id">Ativo</label>
          <input
            type="number"
            class="form-control"
            id="ativo-id"
            placeholder="ID do Ativo"
            v-model="movimentacao.ativo"
          />
        </div>
        <button class="col-md-2 btn-search btn btn-primary align-self-end">
          <i class="bi bi-search"></i>
        </button>

        <div class="col d-flex flex-column align-self-start">
          <label for="beneficario_id">Beneficário</label>
          <input
            type="number"
            class="form-control"
            id="beneficario_id"
            placeholder="ID do Beneficiário"
            v-model="movimentacao.beneficiario"
          />
        </div>
        <button class="col-md-2 btn-search btn btn-primary align-self-end">
          <i class="bi bi-search"></i>
        </button>

        <div class="col d-flex flex-column align-self-start">
          <label for="categoria">Categoria</label>
          <input
            type="number"
            class="form-control"
            id="categoria"
            placeholder="Selecione uma categoria"
            v-model="movimentacao.ativo"
          />
        </div>
      </div>
      <div class="flex-row d-flex align-itens-cemter gap-4 align-self-start">
        <div class="d-flex flex-column">
          <label for="dt_emprestimo">Data de Empréstimo</label>
          <input
            type="date"
            class="form-control"
            id="dt_emprestimo"
            v-model="movimentacao.dataEmprestimo"
            style="width: 300px"
          />
        </div>
        <!-- <div class="d-flex align-items-center gap-3"> -->
        <div class="d-flex flex-column">
          <label for="dt_devolucao">Data de Devolução</label>
          <input
            type="date"
            class="form-control"
            id="dt_devolucao"
            v-model="movimentacao.dataDevolucao"
            style="width: 300px"
          />
        </div>
        <div class="form-check align-self-end mb-2">
          <input
            id="isDevolvido"
            class="form-check-input"
            type="checkbox"
            v-model="movimentacao.isDevolvido"
          />
          <label class="m-0" for="isDevolvido">Mostrar devolvidos</label>
        </div>
      </div>
      <div class="col-12 p-0">
        <button type="submit" class="btn btn-primary d-flex gap-1">
          <i class="bi bi-funnel"></i>Filtrar
        </button>
      </div>
    </form>

    <!-- ---------------------------------------------------->
    <div class="table-display w-100 mt-4">
      <table class="table table-sm table-bordered w-100">
        <thead>
          <tr class="text-center">
            <th class="bg-primary text-white" scope="col">ID</th>
            <th class="bg-primary text-white" scope="col">Beneficiário</th>
            <th class="bg-primary text-white" scope="col">Patrimônio</th>
            <th class="bg-primary text-white" scope="col">Categoria</th>
            <th class="bg-primary text-white" scope="col">Data Entrada</th>
            <th class="bg-primary text-white" scope="col">Data de Devolução</th>
            <th class="bg-primary text-white" scope="col">Devolvido</th>
            <th class="bg-primary text-white" scope="col">Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="movimentacao in movimentacoesFilter"
            :key="movimentacao.id"
          >
            <td>{{ movimentacao.id }}</td>
            <td>{{ movimentacao.beneficiario.perfil.nome }}</td>
            <td>{{ movimentacao.ativo.idPatrimonio }}</td>
            <td>{{ movimentacao.ativo.categoria.nomeCategoria }}</td>
            <td>{{ formatDate(movimentacao.dataEmprestimo) }}</td>
            <td>{{ formatDate(movimentacao.dataDevolucao) }}</td>
            <td>{{ movimentacao.isDevolvido }}</td>
            <td>
              <div class="d-flex justify-content-center actions">
                <button
                  class="btn btn-sm btn-primary me-2"
                  @click="editItem(movimentacao)"
                >
                  <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button
                  class="btn btn-sm btn-danger me-2"
                  @click="deleteItem(movimentacao)"
                  style="background-color: #dc3545; color: #fff"
                >
                  <i class="bi bi-trash"></i> Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Add pagination controls -->
      <!-- <div class="pagination-container align-self-end"> -->
      <!-- <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 0 }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click="previousPage"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :disabled="movimentacoesFilter.length < pageSize">
          <a class="page-link" href="#" aria-label="Next" @click="nextPage">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'
import { Movimentacao } from '@/model/movimentacao'
import { MovimentacoesClient } from '@/client/movimentacao.client'

export default defineComponent({
  name: 'MovimentacoesView',
  components: {
    LinkDinamicoComponent
  },
  data() {
    return {
      currentPage: 0,
      pageSize: 6,
      movimentacoes: [] as Movimentacao[],
      movimentacao: new Movimentacao(),
      movimentacaoClient: new MovimentacoesClient()
    }
  },
  computed: {
    movimentacoesFilter(): Movimentacao[] {
      const params = {
        dataEntrada: this.movimentacao.dataEmprestimo || null,
        dataDevolucao: this.movimentacao.dataDevolucao || null,
        beneficiarioId: this.movimentacao.beneficiario || null,
        categoriaId: this.movimentacao.ativo || null,
        ativoId: this.movimentacao.ativo || null,
        isDevolvido: this.movimentacao.isDevolvido || null
      }
      this.movimentacaoClient
        .filtrar(params)
        .then((response: any) => {
          this.movimentacoes = response
        })
        .catch((error: any) => {
          console.log(error)
        })
      return this.movimentacoes
    }
  },
  methods: {
    formatDate(dateString: string | number | Date) {
      const dateTime = new Date(dateString)
      const formattedDate = dateTime.toLocaleDateString()
      const formattedTime = dateTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
      return `${formattedDate} ${formattedTime}`
    },
    async deleteItem(movimentacao: Movimentacao) {
      const confirmation = confirm(
        'Você tem certeza de que deseja excluir essa movimentação?'
      )
      if (!confirmation) {
        return
      }

      try {
        await this.movimentacaoClient.deletar(movimentacao.id)
      } catch (error) {
        console.error(error)
      }
    },

    async editItem(movimentacao: Movimentacao) {
      try {
        const movimentacaoId = movimentacao.id
        await this.$router.push({
          name: 'ativos-editar',
          params: { movimentacaoId: movimentacaoId }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
<style scoped>
.btn-search {
  width: 52px;
}
</style>
