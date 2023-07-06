<template>
  <div class="main-content d-flex flex-column align-items-start">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent routeList="/pessoas" routeRegister="/pessoa/cadastro" />
    </div>
    <!-- <form
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
    </form> -->

    <!-- ---------------------------------------------------->
    <table class="table-sm table-bordered table w-100 mt-4">
      <thead>
        <tr class="text-center">
          <th class="bg-primary col-md-1 text-white">ID</th>
          <th class="bg-primary col-md-2 text-white">Nome</th>
          <th class="bg-primary col-md-2 text-white">CPF</th>
          <th class="bg-primary col-md-2 text-white">Telefone</th>
          <th class="bg-primary col-md-1 text-white">Status</th>
          <th class="bg-primary col-md-2 text-white">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pessoa in pessoasList" :key="pessoa.id">
          <th class="align-middle text-center col-md-1">{{ pessoa.id }}</th>
          <th class="align-middle text-center col-md-2">{{ pessoa.nome }}</th>
          <th class="align-middle text-center col-md-2">{{ pessoa.cpf }}</th>
          <th class="align-middle text-center col-md-2">{{ pessoa.telefone }}</th>
          <th class="align-middle text-center col-md-1">
            <span v-if="!pessoa.isSuspenso" class="badge text-bg-success"> Ativo </span>
            <span v-if="pessoa.isSuspenso" class="badge text-bg-danger">
              Inativo
            </span>
          </th>
          <th class="align-middle text-center col-md-2">
            <div class="d-flex justify-content-center actions">
                <router-link class="btn btn-sm btn-primary me-1" :to="{name: 'pessoa.cadastro.editar', query: { id: pessoa.id, form: 'editar' } }">
                  <i class="bi bi-pencil-square"></i> Editar </router-link>
                <router-link class="btn btn-sm btn-danger bg-danger text-white" :to="{name: 'pessoa.cadastro.toggle', query: { id: pessoa.id, form: 'toggle' } }">
                  <i class="bi bi-trash"></i> Excluir </router-link>
              </div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'
import { Pessoa } from "@/model/pessoa";
import { PessoaClient } from '@/client/pessoa.client';
export default defineComponent({
  name: 'PessoasView',
  data() {
    return {
      pessoasList: new Array<Pessoa>()
    }
  },
  mounted() {
    this.findAll()
  },
  components: {
    LinkDinamicoComponent
  },
  methods: {
    findAll() {
      const pessoaClient = new PessoaClient()
      pessoaClient
        .findAll()
        .then(sucess => {
          this.pessoasList = sucess
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})

</script>

<style scoped>
.btn-search {
  width: 52px;
}
</style>
