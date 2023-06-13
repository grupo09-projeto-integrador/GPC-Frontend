<template>
  <div class="main-content d-flex flex-column align-items-start">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent
        routeList="/movimentacoes"
        routeRegister="/movimentacoes/cadastrar"
      />
    </div>
    <form
      class="form-app d-flex flex-column align-items-start gap-3 mt-4 h-100"
      @submit.prevent="cadastrar"
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
            v-model="movimentacao.categoria"
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

      <!-- </div> -->
      <div class="col-12 p-0">
        <button
          type="submit"
          class="btn btn-primary d-flex gap-1"
          @submit="submitForm"
        >
          <i class="bi bi-funnel"></i>Filtrar
        </button>
      </div>
    </form>
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
          <tr v-for="ativo in ativosFilter" :key="ativo.id">
            <td>{{ ativo.id }}</td>
            <td>{{ ativo.categoria.id }}</td>
            <td>{{ ativo.idPatrimonio }}</td>
            <td>{{ ativo.condicao }}</td>
            <td>{{ ativo.status }}</td>
            <td>{{ formatDate(ativo.dataEntrada) }}</td>

            <td>
              <div class="d-flex justify-content-center actions">
                <button
                  class="btn btn-sm btn-primary me-2"
                  @click="editItem(ativo)"
                >
                  <i class="bi bi-pencil-square"></i> Editar
                </button>
                <button
                  class="btn btn-sm btn-danger"
                  @click="deleteItem(ativo)"
                >
                  <i class="bi bi-trash"></i> Excluir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'
import { Movimentacao } from '@/model/movimentacao'
import { MovimentacoesClient } from '@/client/movimentacao.client'
import { AtivoClient } from '@/client/ativo.client'
import { BeneficiarioClient } from '@/client/beneficiario.client'
import { Ativo } from '@/model/ativo'
import { Beneficiario } from '@/model/beneficiario'

export default defineComponent({
  name: 'MovimentacoesView',
  components: {
    LinkDinamicoComponent
  },
  data(): any {
    return {
      movimentacao: new Movimentacao(),
      movimentacaoClient: new MovimentacoesClient(),
      ativo: Ativo,
      beneficiario: Beneficiario
    }
  },
  methods: {
    async cadastrar() {
      const ativoClient = new AtivoClient()
      const beneficiarioClient = new BeneficiarioClient()
      const movimentacao = new Movimentacao()

      try {
        this.ativo = await ativoClient.findById(this.movimentacao.ativo)
        movimentacao.ativo = this.ativo
      } catch (error) {
        console.error(error)
      }

      try {
        this.beneficiario = await beneficiarioClient.findById(
          this.movimentacao.beneficiario
        )
        movimentacao.beneficiario = this.beneficiario
      } catch (error) {
        console.error(error)
      }

      movimentacao.isDevolvido = this.movimentacao.isDevolvido
      movimentacao.dataEmprestimo = this.movimentacao.dataEmprestimo
      movimentacao.dataDevolucao = this.movimentacao.dataDevolucao
      movimentacao.descricao = this.movimentacao.descricao
      console.log(movimentacao.isDevolvido)
      this.movimentacaoClient
        .save(movimentacao)
        .then((response: any) => {
          console.log(response)
        })
        .catch((error: any) => {
          console.log(error)
        })

      this.$router.push('/movimentacoes')
    }
  }
})
</script>
<style scoped>
.btn-search {
  width: 52px;
}
</style>
