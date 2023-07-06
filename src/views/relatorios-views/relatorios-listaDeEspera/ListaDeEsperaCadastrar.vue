<template>
  <div class="main-content">
    <LinkDinamicoComponent routeList="/relatorios/listadeespera" routeRegister="/relatorios/listadeespera/cadastrar"
      default-active="register" />
    <form class="form-app d-flex flex-column align-items-start mt-4 gap-4" @submit.prevent="submitForm">
      <div class="d-flex align-items-center align-self-start gap-4">
        <div class="d-flex flex-column align-self-start gap-2">
          <label for="beneficiario">CPF do Beneficiario</label>
          <input class="form-control" list="datalistOptions" id="beneficiario" data-maska="###.###.###-##"
            style="width: 300px" v-model="beneficiario.cpf" />
          <datalist id="datalistOptions">
            <option v-for="option in datalistOptions" :value="option"></option>
          </datalist>
        </div>
        <div class="d-flex flex-column align-self-start gap-2">
          <label for="Nomebeneficiario">Nome do Beneficiario</label>
          <input class="form-control" list="datalistOptions" id="Nomebeneficiario" readonly v-model="ascNome"
            style="width: 300px" />
        </div>
        <router-link to="" class="btn btn-primary align-self-end">Ou Cadastrar Novo Beneficiario</router-link>
      </div>

      <div class="d-flex align-items-center align-self-start gap-5">
        <div class="d-flex flex-column align-self-start gap-2">
          <label for="categoria">Categoria do Ativo</label>
          <select class="form-select" id="categoria" style="width: 300px" v-model="selectedCategoria">
            <option v-for="categoria in categoriaList" :value="categoria">{{ categoria.nomeCategoria }}</option>
          </select>
        </div>
      </div>
      <div class="mt-3 d-flex align-items-center gap-3">
        <button type="submit" class="btn btn-primary">Adicionar Beneficiario</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { BeneficiarioClient } from '@/client/beneficiario.client';
import { CategoriaClient } from '@/client/categoria.client';
import { PessoaClient } from '@/client/pessoa.client';
import LinkDinamicoComponent from "@/components/LinkDinamicoComponent.vue";
import { Beneficiario } from '@/model/beneficiario';
import { Categoria } from '@/model/categoria';
import { Pessoa } from '@/model/pessoa';
import { defineComponent, ref } from 'vue';
import { vMaska } from "maska"
export default defineComponent({
  name: 'ListaDeEsperaCadastrar',
  components: {
    LinkDinamicoComponent,
  },
  data() {
    return {
      beneficiario: new Pessoa(),
      datalistOptions: [] as string[],
      ascNome: '',
      categoriaList: [] as Categoria[],
      selectedCategoria: new Categoria(),
    };
  },
  watch: {
    'beneficiario.cpf': {
      immediate: true,
      handler: 'getNome',
    },
  },
  async mounted() {
    try {
      const BClient = new PessoaClient();
      const pessoaData = await BClient.findAll();
      this.datalistOptions = pessoaData.map((pessoa) => pessoa.cpf);
      this.loadCategoria();

    } catch (error) {
      console.error("Failed to fetch pessoa data:", this.datalistOptions);
    }
  },
  methods: {
    submitForm() {
      console.log(this.selectedCategoria);
      console.log(this.beneficiario);

      const beneficiarioClient = new PessoaClient();
      beneficiarioClient.findByCPF(this.beneficiario.cpf)
        .then((pessoa) => {
          console.log(pessoa);
          this.selectedCategoria.listaEspera.push(pessoa);
          const categoriaClient = new CategoriaClient();
          categoriaClient.update(this.selectedCategoria)
          console.log(categoriaClient)
        })
        .catch((error) => {
          console.error("Failed to fetch pessoa:", error);
        });
    },

    async loadCategoria() {
      const client = new CategoriaClient();
      this.categoriaList = await client.findAll();
    },
    async getNome() {
      const BClient = new PessoaClient();
      const associatedcpf = this.datalistOptions.find(
        (cpf) => cpf === this.beneficiario.cpf
      );
      if (associatedcpf) {
        try {
          const nomesData = await BClient.findByCPF(associatedcpf);
          console.log(associatedcpf);
          if (nomesData && nomesData.nome && nomesData.cpf) {
            this.ascNome = nomesData.nome;
            this.beneficiario.cpf = nomesData.cpf;
          } else {
            console.error("nome not found");
          }
        } catch (error) {
          console.error("Failed to fetch nome data:", this.ascNome);
        }
      }
    }

  },
});
</script>


<style></style>