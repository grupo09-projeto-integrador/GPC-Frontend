<template>
  <div class="main-content d-flex flex-column align-items-start">
    <div v-if="this.form == undefined" class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent routeList="/movimentacoes" routeRegister="/movimentacoes/cadastrar"
        defaultActive="register" />
    </div>
    <form class="form-app d-flex flex-column align-items-start gap-3 mt-4 h-100" @submit.prevent="submitForm()">
      <div class="row d-flex align-items-center align-self-start">
        <div class="col d-flex flex-column align-self-start">
          <label for="ativo-id">Ativo</label>
          <select class="form-select" aria-label="Default select example" id="condicao" v-model="movimentacao.ativo">
            <option selected>Selecione um Ativo</option>
            <option v-for="ativo in ativos" :key="ativo.id" :value="ativo">
              {{ ativo.categoria.nomeCategoria }} - {{ ativo.idPatrimonio }}
            </option>
          </select>
        </div>

        <div class="col d-flex flex-column align-self-start">
          <label for="beneficario_id">Beneficário</label>

          <select class="form-select" aria-label="Default select example" id="beneficario_id"
            v-model="movimentacao.beneficiario">
            <option selected>Selecione um Beneficiario</option>
            <option v-for="beneficiario in beneficiarios" :key="beneficiario.id" :value="beneficiario">
              {{ beneficiario.nome }} - {{ beneficiario.cpf }}
            </option>
          </select>
        </div>
        <div class="col d-flex flex-column align-self-start">
          <label for="beneficario_id">Responsável</label>
          <select class="form-select" aria-label="Default select example" id="beneficario_id"
            v-model="movimentacao.responsavel">
            <option selected>Selecione um Responsável</option>
            <option v-for="beneficiario in beneficiarios" :key="beneficiario.id" :value="beneficiario">
              {{ beneficiario.nome }} - {{ beneficiario.cpf }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex-row d-flex align-itens-cemter gap-4 align-self-start">
        <div class="d-flex flex-column">
          <label for="dt_emprestimo">Data de Empréstimo</label>
          <input type="date" class="form-control" id="dt_emprestimo" v-model="movimentacao.dataEmprestimo"
            style="width: 300px" />
        </div>
        <div class="d-flex flex-column">
          <label for="dt_devolucao">Data de Devolução</label>
          <input type="date" class="form-control" id="dt_devolucao" v-model="movimentacao.dataDevolucao"
            style="width: 300px" />
        </div>
        <div class="form-check align-self-end mb-2">
          <input id="isDevolvido" class="form-check-input" type="checkbox" v-model="movimentacao.isDevolvido" />
          <label class="m-0" for="isDevolvido">Já devolvido</label>
        </div>
      </div>
      <div class="descricao" style="width: 600px">
        <label for="descricao">Adicione uma descrição (opcional)</label>
        <textarea class="form-control" placeholder="Faça uma observação aqui" id="descricao"
          v-model="movimentacao.descricao" style="height: 100px"></textarea>
      </div>
      <div class="col-12 d-flex gap-3 p-0">
        <router-link v-if="this.form != undefined" type="button" class="btn btn-secondary" to="/movimentacoes">Voltar
        </router-link>
        <button v-if="this.form == undefined" type="submit" class="btn btn-primary d-flex gap-2">Abrir Movimentação</button>
        <button v-if="this.form == 'editar'" type="submit" class="btn btn-primary d-flex gap-2">Editar Movimentação
        </button>
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
import { defineComponent } from 'vue'
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'
import { Movimentacao } from '@/model/movimentacao'
import { MovimentacoesClient } from '@/client/movimentacao.client'
import { AtivoClient } from '@/client/ativo.client'
import { BeneficiarioClient } from '@/client/beneficiario.client'
import { Ativo } from '@/model/ativo'
import { Pessoa } from '@/model/pessoa'
import { PessoaClient } from '@/client/pessoa.client'

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
      beneficiarios: [] as Pessoa[],
      ativos: [] as Ativo[],
      errorMessage: {
        status: "",
        message: "",
      },
    }
  },
  computed: {
    id(): any {
      return this.$route.query.id
    },
    form(): any {
      return this.$route.query.form
    }
  },
  mounted() {
    if (this.id != undefined) {
      this.findById(Number(this.id))
    }
    this.fetchBeneficiarios()
    this.fetchAtivos()
  },
  methods: {
    submitForm() {
      if (this.form === undefined) {
        this.cadastrar()
      } else if (this.form === 'editar') {
        this.onClickEditar()
      } else if (this.form === 'toggle') {
        if (this.pessoa.isSuspenso) {
          this.onClickAtivar()
        } else {
          this.onClickExcluir()
        }
      }
    },
    findById(id: number) {
      const movClient = new MovimentacoesClient()
      movClient
        .findById(id)
        .then(sucess => {
          console.log(sucess)
          this.movimentacao = sucess
        })
        .catch(error => {
          console.log(`erro id ${error}`)
        })
    },
    fetchBeneficiarios() {
      const pessoaClient = new PessoaClient()
      pessoaClient.findByAtivo().then(sucess => {
        console.log(sucess)
        this.beneficiarios = sucess
      }).catch(error => {
        this.errorMessage.status = "error";
        this.errorMessage.message = error;
      })
    },
    fetchAtivos() {
      const ativoClient = new AtivoClient()
      ativoClient.findAllComum().then(sucess => {
        console.log(sucess)
        this.ativos = sucess
      }).catch(error => {
        this.errorMessage.status = "error";
        this.errorMessage.message = error;
      })
    },
    async cadastrar() {
      this.movimentacaoClient
        .novaMovimentacao(this.movimentacao)
        .then((response: any) => {
          this.movimentacao = new Movimentacao()
          this.errorMessage.status = "success";
          this.errorMessage.message = response;
        })
        .catch((error: any) => {
          this.errorMessage.status = "error";
          this.errorMessage.message = error.data;
        })
    },
    onClickEditar() {
      console.log('oi')
      const movClient = new MovimentacoesClient()
      movClient
      .editar(this.movimentacao)
      .then(sucess => {
          console.log(sucess)
          this.errorMessage.status = "success";
          this.errorMessage.message = sucess
        })
        .catch(error => {
          console.log(error)
          if (typeof error == 'object') {
            this.errorMessage.message = Object.values(error)[0]
          } else {
            this.errorMessage.message = error;
          }
          this.errorMessage.status = "error";
        })
    },
  }
})
</script>
<style scoped>
.btn-search {
  width: 52px;
}

.error-message {
  margin: 0 !important;
  padding-top: 5px;
}
</style>
