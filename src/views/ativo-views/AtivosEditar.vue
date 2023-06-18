<template>
  <div class="main-content d-flex flex-column align-items-start">
    <form class="form-app d-flex flex-column align-items-start mt-4 h-100" @submit.prevent="submitForm">
      <div class="d-flex align-items-center align-self-start gap-5">
        <div class="d-flex flex-column align-self-start">
          <label for="categoria">Nome Categoria</label>
          <input class="form-control" list="datalistOptions" id="categoria" style="width: 300px"
            v-model="ativoNomeCategoria" />
        </div>
        <datalist id="datalistOptions">
          <option v-for="option in datalistOptions" :value="option"></option>
        </datalist>

        <div class="d-flex flex-column">
          <label for="patrimonio-id">Id Patrimônio</label>
          <input type="text" class="form-control" id="patrimonio-id" placeholder="ID do Patrimônio"
            v-model="ativoIdPatrimonio" style="width: 300px" />
        </div>
      </div>
      <div class="d-flex align-items-center align-self-start gap-5">
        <div class="d-flex flex-column align-self-start">
          <label for="condicao">Condição</label>
          <select class="form-select" aria-label="Default select example" id="condicao" v-model="ativoCondicao">
            <option selected>Selecione uma condição</option>
            <option v-for="condition in conditions" :key="condition" :value="condition">
              {{ condition }}
            </option>
          </select>
        </div>
        <div class="d-flex flex-column align-self-start">
          <label for="status">Status</label>
          <select class="form-select" aria-label="Default select example" id="status" v-model="ativoStatus">
            <option selected>Selecione um status</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="d-flex flex-column">
        <label for="dt_entrada">Data de Entrada</label>
        <input type="datetime-local" class="form-control" id="dt_entrada" style="width: 300px"
          v-model="ativoDataEntrada" />
      </div>
      <!-- Error Message -->
      <div class="mt-3 d-flex align-items-center gap-3">
        <button type="submit" class="btn btn-primary">Atualizar Ativo</button>
        <button type="button" @click="cancelEdit" class="btn btn-primary">Cancelar</button>
        <p :class="['error-message', errorMessage.status === 'success' ? 'text-success' : 'text-danger']">
          {{ errorMessage.message }}
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Condicao } from "@/model/condicao";
import { Status } from "@/model/status";
import { AtivoClient } from "@/client/ativo.client";
import { Ativo } from "@/model/ativo";
import { Categoria } from "@/model/categoria";
import { CategoriaClient } from "@/client/categoria.client";
import moment from "moment";

export default defineComponent({
  name: "AtivosCadastrar",
  data() {
    return {
      conditions: Object.values(Condicao),
      statuses: Object.values(Status),
      editedAtivo: new Ativo(),
      datalistOptions: [] as string[],
      errorMessage: {
        status: "",
        message: "",
      },
      ativoNomeCategoria: "",
      ativoIdPatrimonio: "",
      ativoCondicao: Object.values(Condicao)[0],
      ativoStatus: Object.values(Status)[0],
      ativoDataEntrada: new Date(),
    };
  },
  computed: {
    ativoClient() {
      return new AtivoClient();
    },
  },
  methods: {

    handleError(message: any) {
      this.errorMessage = {
        status: "error",
        message: message
      };
    },

    handleSuccess(message: any) {
      this.errorMessage = {
        status: "success",
        message: message
      };
    },

    async submitForm() {
      const { ativoCondicao, ativoDataEntrada, ativoIdPatrimonio, ativoNomeCategoria, ativoStatus } = this;

      if (!ativoCondicao) {
        this.handleError("Condição do ativo não definida.");
        return;
      }

      if (!ativoDataEntrada) {
        this.handleError("Data de Entrada do ativo não definida.");
        return;
      }

      if (!ativoIdPatrimonio) {
        this.handleError("id Patrimonio do ativo não definida.");
        return;
      }

      if (!ativoNomeCategoria) {
        this.handleError("Nome da Categoria associada ao ativo não definida.");
        return;
      }

      if (!ativoStatus) {
        this.handleError("Status do ativo não definida.");
        return;
      }

      this.editedAtivo.categoria.nomeCategoria = ativoNomeCategoria;
      this.editedAtivo.condicao = ativoCondicao;
      this.editedAtivo.dataEntrada = ativoDataEntrada;
      this.editedAtivo.idPatrimonio = ativoIdPatrimonio;
      this.editedAtivo.status = ativoStatus;

      try {
        this.editedAtivo.id = Number(this.$route.params.ativoId);
        await this.fetchCategoriaId();
        await this.ativoClient.update(this.editedAtivo);

        this.handleSuccess("Ativo atualizado com succeso");
      } catch (error: any) {
        this.handleError(
          error.response && error.response.data ?
            Object.values(error.response.data).join("") :
            "An error occurred during updating."
        );
      }
    },


    async fetchItems() {
      const editAtivoId = Number(this.$route.params.ativoId);

      if (!isNaN(editAtivoId)) {
        try {
          const response = await this.ativoClient.findById(editAtivoId);
          this.ativoCondicao = response.condicao;
          this.ativoDataEntrada = response.dataEntrada;
          this.ativoIdPatrimonio = response.idPatrimonio;
          this.ativoNomeCategoria = response.categoria.nomeCategoria;
          this.ativoStatus = response.status;
          this.editedAtivo = response;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Invalid editAtivoId parameter");
      }
    },

    async fetchCategoriaId() {
      try {

        const categoriaClient = new CategoriaClient();
        const categoriaData = await categoriaClient.findByNome(this.editedAtivo.categoria.nomeCategoria);
        if (categoriaData && categoriaData.id) {
          this.editedAtivo.categoria = categoriaData;
        } else {
          this.handleError("A categoria não foi encontrada no banco de dados.")
        }
      } catch (error) {
        this.handleError("Ocorreu um erro ao buscar a categoria.")
      }
    },

    cancelEdit() {
      this.$router.push("/ativos");
    },
  },
  async mounted() {

    try {
      const categoriaClient = new CategoriaClient();
      const ativoData = await categoriaClient.findAll();
      this.datalistOptions = ativoData.map((categoria) => categoria.nomeCategoria)
      await this.fetchItems();
    }
    catch (error) {
      console.error("Erro, em buscar nomes de categoria.")
    }

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
