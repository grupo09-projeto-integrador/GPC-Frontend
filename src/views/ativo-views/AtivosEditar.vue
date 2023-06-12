<template>
    <div class="main-content d-flex flex-column align-items-start">
      <form class="form-app d-flex flex-column align-items-start mt-4 h-100">
        <div class="row d-flex align-items-center align-self-start">
          <div class="col d-flex flex-column align-self-start">
            <label for="categoria-id">Categoria</label>
            <input type="number" class="form-control" id="categoria-id" v-model="ativo.categoria" />
          </div>
          <button type="submit" class="col-md-2 btn btn-primary align-self-end">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { AtivoClient } from '@/client/ativo.client';
  import { Ativo } from '@/model/ativo';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'AtivosEditar',
    data() {
      return {
        ativoId: '',
        ativo: {} as Ativo
      }
    },
    async created() {
      try {
        await this.getAtivoId();
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      async getAtivoId() {
        const ativoClient = new AtivoClient();
        try {
          const ativo = await ativoClient.findById(Number(this.$route.params.ativoId));
          this.ativoId = ativo.id.toString();
          this.ativo = ativo;
          // Assigning a value to ativo.categoria
          this.ativo.categoria.id = ativo.categoria.id; // Replace 123 with the desired value
          console.log(ativo.categoria.id);
        } catch (error) {
          console.error(error);
        }
      },
      async updateAtivo() {
        const ativoClient = new AtivoClient();
        try {
          await ativoClient.update(this.ativo);
          console.log('Ativo updated:', this.ativo);
        } catch (error) {
          console.error(error);
        }
      }
    }
  });
  </script>
  