<template>
  <div class="main-content d-flex flex-column align-items-start">
    <LinkDinamicoComponent
      routeList="/ativos"
      routeRegister="/ativos/cadastrar"
      default-active="register"
    />
    <form
      class="form-app d-flex flex-column align-items-start mt-4 h-100"
      @submit.prevent="submitForm"
    >
      <div class="d-flex align-items-center align-self-start gap-5">
        <div class="d-flex flex-column align-self-start">
          <label for="categoria">Nome Categoria</label>
          <input
            class="form-control"
            list="datalistOptions"
            id="categoria"
            style="width: 300px"
            v-model="ativo.categoria.nomeCategoria"
          />
        </div>
        <datalist id="datalistOptions">
          <option v-for="option in datalistOptions" :value="option"></option>
        </datalist>

        <div class="d-flex flex-column">
          <label for="patrimonio-id">Id Patrimônio</label>
          <input
            type="text"
            class="form-control"
            id="patrimonio-id"
            placeholder="ID do Patrimônio"
            v-model="ativo.idPatrimonio"
            style="width: 300px"
          />
        </div>
      </div>
      <div class="d-flex align-items-center align-self-start gap-5">
        <div class="d-flex flex-column align-self-start">
          <label for="condicao">Condição</label>
          <select
            class="form-select"
            aria-label="Default select example"
            id="condicao"
            v-model="ativo.condicao"
          >
            <option selected>Selecione uma condição</option>
            <option
              v-for="condition in conditions"
              :key="condition"
              :value="condition"
            >
              {{ condition }}
            </option>
          </select>
        </div>
        <div class="d-flex flex-column align-self-start">
          <label for="status">Status</label>
          <select
            class="form-select"
            aria-label="Default select example"
            id="status"
            v-model="ativo.status"
          >
            <option selected>Selecione um status</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="d-flex flex-column">
        <label for="dt_entrada">Data de Entrada</label>
        <input
          type="datetime-local"
          class="form-control"
          id="dt_entrada"
          v-model="ativo.dataEntrada"
          style="width: 300px"
        />
      </div>
      <!-- Error Message -->
      <div class="mt-3 d-flex align-items-center gap-3">
          <button type="submit" class="btn btn-primary">Cadastrar Ativo</button>
          <p
            :class="[
              'error-message',
              errorMessage.status === 'success'
                ? 'text-success'
                : 'text-danger',
            ]"
          >
            {{ errorMessage.message }}
          </p>
        </div>
    
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LinkDinamicoComponent from "@/components/LinkDinamicoComponent.vue";
import { Condicao } from "@/model/condicao";
import { Status } from "@/model/status";
import { AtivoClient } from "@/client/ativo.client";
import { Ativo } from "@/model/ativo";
import { Categoria } from "@/model/categoria";
import { CategoriaClient } from "@/client/categoria.client";

export default defineComponent({
  name: "AtivosCadastrar",
  components: {
    LinkDinamicoComponent,
  },
  data() {
    return {
      conditions: Object.values(Condicao),
      statuses: Object.values(Status),
      ativo: new Ativo(),
      datalistOptions: [] as string[],
        errorMessage: {
            status: "",
            message: "",
        },
    };
  },
  computed: {
    ativoClient(){
        return new AtivoClient();
    }
  },
  async mounted(){
    try {
      const categoriaClient = new CategoriaClient();
      const ativoData = await categoriaClient.findAll();
      this.datalistOptions = ativoData.map((categoria) => categoria.nomeCategoria);
      console.log(this.datalistOptions);
    } catch (error) {
      console.error("Failed to fetch categoria data:", this.datalistOptions);
    }
  },
  methods: {
    async submitForm() {

        if (!this.ativo.categoria.nomeCategoria) {
    this.errorMessage.status = "error";
    this.errorMessage.message = "O campo Categoria é obrigatório.";
    return;
  }

        try {
        await this.fetchCategoriaId();
        const response = await this.ativoClient.save(this.ativo);
        const data = response;
         // Set success message
         this.errorMessage.status = "success";
        this.errorMessage.message = "Ativo Registrado Com Sucesso!";
      }  catch (error: any) {
        this.errorMessage.status = "error";
        if (error.response && error.response.data) {
          const errorMessages = Object.values(error.response.data);
          this.errorMessage.message = errorMessages.join("");
        } else {
          this.errorMessage.message = "Erro ao registrar ativo";
        }
      }

    },
    async fetchCategoriaId() {
  try {
    console.log(this.ativo.categoria.nomeCategoria);
    const categoriaClient = new CategoriaClient();
    const categoriaData = await categoriaClient.findByNome(this.ativo.categoria.nomeCategoria);

    if (categoriaData && categoriaData.id) {
      this.ativo.categoria = categoriaData;
    } else {
      this.errorMessage.status = "error";
      this.errorMessage.message = "A categoria não foi encontrada no banco de dados.";
    }
  } catch (error) {
    console.error("Failed to fetch Categoria ID:", error);
    this.errorMessage.status = "error";
    this.errorMessage.message = "Ocorreu um erro ao buscar a categoria.";
  }
},



  },
});
</script>

<style scoped>
form {
  width: 100%;
  height: 100%;
  gap: 15px;
}

.form-select {
  text-indent: 10px;
  display: block;
  width: 300px;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
