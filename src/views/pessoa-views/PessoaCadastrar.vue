<template>
  <div class="main-content d-flex flex-column align-items-start">
    <div v-if="this.form == undefined" class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent routeList="/pessoas" routeRegister="/pessoa/cadastro" defaultActive="register" />
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <p v-if="this.form == undefined" class="fs-5 mt-5">Dados Pessoais</p>
        <p v-if="this.form == 'editar'" class="fs-5">Editar Pessoa</p>
        <p v-if="this.form == 'toggle' && condutor.ativo" class="fs-5">Desativar Pessoa</p>
        <p v-if="this.form == 'toggle' && !condutor.ativo" class="fs-5">Ativar Pessoa</p>
      </div>
      <div class="col-md-2"></div>
    </div>

    <form class="form-app d-flex flex-column align-items-start w-75 h-100 needs-validation"
      @submit.prevent="submitForm()">
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
          <input type="text" class="form-control" id="telefone" v-maska data-maska="(##) #####-####"
            placeholder="(45) 99876-5432" v-model="pessoa.telefone" required />
        </div>
      </div>
      <div class="row w-100 d-flex justify-content-start m-0 mb-2">
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="cpf">CPF <span style="color: red"> *</span></label>
          <input type="text" class="form-control" v-maska data-maska="###.###.###-##" id="cpf" v-model="pessoa.cpf"
            placeholder="_ _ _._ _ _._ _ _-_ _" required />
        </div>
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="rg">RG <span style="color: red"> *</span></label>
          <input type="text" v-maska data-maska="##.###.###-#" class="form-control" id="rg" v-model="pessoa.rg"
            placeholder="_ _._ _ _._ _ _-_" required />
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
          <input type="text" v-on:change="buscaCep()" class="form-control" id="cep" v-model="endereco.cep" maxlength="10"
            required />
        </div>
        <div class="mb-3 mt-3 w-50 text-start">
          <label for="logradouro">Logradouro <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="logradouro" v-model="endereco.logradouro" required />
        </div>
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="bairro">Bairro <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="bairro" v-model="endereco.bairro" required />
        </div>
      </div>
      <div class="row w-100 d-flex justify-content-start m-0 mb-2">
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="pais">País <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="pais" v-model="endereco.pais" required />
        </div>
        <div class="mb-3 mt-3 w-10 text-start">
          <label for="uf">UF <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="uf" v-model="endereco.uf" required />
        </div>
        <div class="mb-3 mt-3 w-25 text-start">
          <label for="bairro">Cidade <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="bairro" v-model="endereco.cidade" required />
        </div>
        <div class="mb-3 mt-3 w-15 text-start">
          <label for="numero">Número <span style="color: red"> *</span></label>
          <input type="text" class="form-control" id="numero" v-model="endereco.numero" required />
        </div>
        <div class="mb-3 mt-3 w-auto text-start">
          <label for="pais">Complemento</label>
          <input type="text" class="form-control" id="pais" v-model="endereco.complemento" />
        </div>
      </div>
      <div class="col-12 pb-5 d-flex gap-2">
        <router-link v-if="this.form != undefined" type="button" class="btn btn-secondary" to="/pessoas">Voltar
        </router-link>
        <button v-if="this.form == undefined" type="submit" class="btn btn-primary d-flex gap-2">Cadastrar
          Pessoa</button>
        <button v-if="this.form == 'editar'" type="submit" class="btn btn-primary d-flex gap-2">Editar Pessoa
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
<script lang="ts" setup>
import { vMaska } from "maska"
</script>
<script lang="ts">
import { defineComponent } from 'vue'
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'
import { Pessoa } from '@/model/pessoa'
import { Endereco } from '@/model/endereco'
import { PessoaClient } from '@/client/pessoa.client'
import { ViaCepClient } from '@/client/viacep.client'
import { EnderecoClient } from '@/client/endereco.client'


export default defineComponent({
  name: 'PessoaCadastro',
  data(): any {
    return {
      pessoa: new Pessoa(),
      endereco: new Endereco(),
      enderecoId: null,
      errorMessage: {
        status: "",
        message: "",
      },
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
    submitForm() {
      if (this.form === undefined) {
        this.onClickCadastrar()
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
    buscaCep() {
      const viaCepClient = new ViaCepClient()
      if (this.endereco.cep.length == 8) {
        viaCepClient.getByCep(this.endereco.cep)
          .then(response => {
            this.endereco.pais = "BRASIL",
              this.endereco.logradouro = response.logradouro
            this.endereco.bairro = response.bairro
            this.endereco.cidade = response.localidade
            this.endereco.uf = response.uf
          })
          .catch(error => {
            this.errorMessage.status = "error";
            this.errorMessage.message = "CEP Inválido";
          })
      }
    },
    onClickCadastrar() {
      const enderecoClient = new EnderecoClient()
      const pessoaClient = new PessoaClient()
      enderecoClient.cadastrarEndereco(this.endereco).then(sucess => {
        this.pessoa.endereco = sucess
        pessoaClient
          .cadastrarPessoa(this.pessoa)
          .then(sucess => {
            this.pessoa = new Pessoa()
            this.errorMessage.status = "success";
            this.errorMessage.message = sucess
          })
          .catch(error => {
            if (typeof error.response.data == 'object') {
              this.errorMessage.message = Object.values(error.response.data)[0]
            } else {
              this.errorMessage.message = error.response.data;
            }
            this.errorMessage.status = "error";
          })
      }).catch(err => {
        console.log(err)
        this.errorMessage.status = "error";
        this.errorMessage.message = err.data;
      })
    },
    findById(id: number) {
      const pessoaClient = new PessoaClient()
      pessoaClient
        .findById(id)
        .then(sucess => {
          this.pessoa = sucess
          this.endereco = sucess.endereco
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
          this.errorMessage.status = "success";
          this.errorMessage.message = sucess
        })
        .catch(error => {
          if (typeof error.response.data == 'object') {
            this.errorMessage.message = Object.values(error.response.data)[0]
          } else {
            this.errorMessage.message = error.response.data;
          }
          this.errorMessage.status = "error";
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
          })
          .catch(error => {
            console.log(error)
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
          })
          .catch(error => {
            console.log(error)
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

.w-10 {
  width: 10%;
}

.error-message {
  margin: 0 !important;
  padding-top: 5px;
}

.w-15 {
  width: 15%;
}
</style>
