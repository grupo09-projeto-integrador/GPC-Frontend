<template>
  <div v-if="this.form == undefined" class="main-content d-flex flex-column align-items-start">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent routeList="/pessoas" routeRegister="/pessoa/cadastro" defaultActive="register" />
    </div>
    <div class="row mt-5">
      <div class="col-md-12 text-center">
        <p v-if="this.form == undefined" class="fs-5">Dados Pessoais</p>
        <p v-if="this.form == 'editar'" class="fs-5">Editar Condutor</p>
        <p v-if="this.form == 'toggle' && condutor.ativo" class="fs-5">Desativar Condutor</p>
        <p v-if="this.form == 'toggle' && !condutor.ativo" class="fs-5">Ativar Condutor</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <form class="form-app d-flex flex-column align-items-start w-75 h-100 needs-validation">
      <div class="row w-100 d-flex justify-content-start m-0 mb-2">
        <div class="mb-3 mt-3 w-50 text-start">
          <label for="nome-completo" class="form-label">Nome Completo <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="nome-completo" placeholder="Ex.: João da Silva"
            v-model="pessoa.nome" required />
        </div>
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="data-nascimento">Data de Nascimento <span style="color: red"> *</span></label>
          <input type="date" class="form-control" id="nome-completo" placeholder="ID do Beneficiário"
            v-model="pessoa.dataNascimento" required />
        </div>
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="data-nascimento">Telefone <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="telefone" placeholder="(45) 99876-5432" v-model="pessoa.telefone"
            required />
        </div>
      </div>
      <div class="row w-100 d-flex justify-content-start m-0 mb-2">
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="cpf">CPF <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="cpf" v-model="pessoa.cpf" placeholder="_ _ _._ _ _._ _ _-_ _"
            required />
        </div>
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="rg">RG</label>
          <input type="text" class="form-control" id="rg" v-model="pessoa.rg" placeholder="_ _._ _ _._ _ _-_" />
        </div>
        <div class="mb-3 mt-3 w-50 text-start">
          <label for="email">E-mail</label>
          <input type="email" class="form-control" id="email" v-model="pessoa.email" placeholder="Ex.: email@email.com" />
        </div>
      </div>
      <hr class="ml-3 w-100">
      <div class="col-md-12 mt-3 text-start">
        <p class="fs-5">Endereço</p>
      </div>
      <div class="row w-100 d-flex justify-content-start m-0 mb-2">
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="cep">CEP <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="cep" v-model="endereco.cep" required/>
        </div>
        <div class="mb-3 mt-3 w-50 text-start">
          <label for="logradouro">Logradouro <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="logradouro" v-model="endereco.logradouro"
            required />
        </div>
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="bairro">Bairro <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="bairro" v-model="endereco.bairro" required/>
        </div>
      </div>
      <div class="row w-100 d-flex justify-content-start m-0 mb-2">
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="pais">País <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="pais" v-model="endereco.pais" required/>
        </div>
        <div class="mb-3 mt-3 w-10 text-start">
          <label for="uf">UF <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="uf" v-model="endereco.uf"
            required />
        </div>
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="bairro">Cidade <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="bairro" v-model="endereco.cidade" required/>
        </div>
        <div class="mb-3 mt-3 w-15 text-start">
          <label for="numero">Número <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="numero" v-model="endereco.numero"
            required />
        </div>
        <div class="mb-3 mt-3 w-auto text-start">
          <label for="pais">Complemento</label>
          <input type="text" class="form-control" id="pais" v-model="endereco.complemento"/>
        </div>
      </div>
      <div class="col-12 pb-5">
        <button type="submit" class="btn btn-primary d-flex gap-2">Cadastrar Pessoa
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'
import { Pessoa } from '@/model/pessoa'
import { Endereco } from '@/model/endereco'
import { PessoaClient } from '@/client/pessoa.client'


export default defineComponent({
  name: 'PessoaCadastro',
  data(): any {
    return {
      pessoa: new Pessoa(),
      endereco: new Endereco()
    }
  },
  components: {
    LinkDinamicoComponent
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
    if (this.id !== undefined) {
      this.findById(Number(this.id))
    }
  },
  methods: {
    onClickCadastrar() {
      const pessoaClient = new PessoaClient()
      pessoaClient
        .cadastrarPessoa(this.pessoa)
        .then(sucess => {
          this.condutor = new Pessoa()
        })
        .catch(error => {
          console.log(error)
          // if (typeof (error.response.data) == 'object') {
          //   this.mensagem.mensagem = Object.values(error.response.data)[0]
          // } else {
          //   this.mensagem.mensagem = error.response.data
          // }
          // this.mensagem.status = false
          // this.mensagem.ativo = true
        })
    },
    findById(id: number) {
      const pessoaClient = new PessoaClient()
      pessoaClient
        .findById(id)
        .then(sucess => {
          this.pessoa = sucess
        })
        .catch(error => {
          console.log(error)
        })
    },
    onClickEditar() {
      const pessoaClient = new PessoaClient()
      pessoaClient
        .editar(this.pessoa)
        .then(sucess => {
          console.log(sucess)
          // this.mensagem.mensagem = sucess
          // this.mensagem.status = true
          // this.mensagem.ativo = true
        })
        .catch(error => {
          console.log(error)

          // this.mensagem.mensagem = error.response.data
          // this.mensagem.status = false
          // this.mensagem.ativo = true
        })
    },
    onClickAtivar() {
      if (confirm("Tem certeza que deseja reativar essa pessoa?")) {

        this.pessoa.isSuspenso = false
        const pessoaClient = new PessoaClient()
        pessoaClient
          .editar(this.pessoa)
          .then(sucess => {
            console.log(sucess)

            // this.mensagem.mensagem = "Condutor reativado com sucesso!"
            // this.mensagem.status = true
            // this.mensagem.ativo = true
          })
          .catch(error => {
            console.log(error)
            // this.mensagem.mensagem = error.response.data
            // this.mensagem.status = false
            // this.mensagem.ativo = true
          })
      }
    },
    onClickExcluir() {
      if (confirm("Tem certeza que deseja desativar essa pessoa?")) {
        const pessoaClient = new PessoaClient()
        pessoaClient
          .deletar(this.pessoa)
          .then(sucess => {
            console.log(sucess)
            // this.condutor.ativo = false
            // this.mensagem.mensagem = sucess
            // this.mensagem.status = true
            // this.mensagem.ativo = true
          })
          .catch(error => {
            console.log(error)
            // this.mensagem.mensagem = error.response.data
            // this.mensagem.status = false
            // this.mensagem.ativo = true
          })
      }
    },
  }
})
</script>
<style scoped>
.btn-search {
  width: 52px;
}

.w-10{
  width: 10%;
}
.w-15{
  width: 15%;
}
</style>
