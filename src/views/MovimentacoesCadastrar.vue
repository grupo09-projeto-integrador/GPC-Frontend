<template>
  <div class="main-content d-flex flex-column align-items-start">
    <div class="page-header d-flex justify-content-between align-items-center">
      <LinkDinamicoComponent
        routeList="/movimentacoes"
        routeRegister="/movimentacoes/cadastrar"
        defaultActive="register"
      />
    </div>
    <form
      class="form-app d-flex flex-column align-items-start mt-4 h-100"
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
        <button type="submit" class="col-md-2 btn btn-primary align-self-end">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div class="row d-flex align-items-center align-self-start">
        <div class="col d-flex flex-column align-self-start">
          <label for="beneficiario-id">Beneficiário</label>
          <input
            type="number"
            class="form-control"
            id="beneficiario-id"
            placeholder="ID do Beneficiário"
            v-model="movimentacao.beneficiario"
          />
        </div>
        <button type="submit" class="col-md-2 btn btn-primary align-self-end">
          <i class="bi bi-search"></i>
        </button>
      </div>
      
      <div class="d-flex flex-column">
        <label for="dt_entrada">Data de Empréstimo</label>
        <input
          type="date"
          class="form-control"
          id="dt_empréstimo"
          v-model="movimentacao.dataEmprestimo"
          style="width: 300px"
        />
      </div>
      <div class="d-flex flex-row">
        <label for="dt_devolucao">Data de Devolução</label>
        <input
          type="date"
          class="form-control"
          id="dt_devolucao"
          v-model="movimentacao.dataDevolucao"
          style="width: 300px"
        />
        <input type="checkbox">
        <label for="isDevolvido">Já devolvido</label>
      </div>
      <div class="descricao" style="width: 600px">
        <textarea
          class="form-control"
          placeholder="Faça uma observação aqui"
          id="descricao"
          v-model="movimentacao.descricao"
          style="height: 100px"
        ></textarea>
        <label for="floatingTextarea2">Adicione uma descrição (opcional)</label>
      </div>
      <div class="col-12 p-0">
        <button type="submit" class="btn btn-primary" @submit="submitForm">
          Abrir movimentação
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LinkDinamicoComponent from '@/components/LinkDinamicoComponent.vue'
import { Movimentacao } from '@/model/movimentacao';

export default defineComponent({
  name: 'MovimentacoesView',
  components: {
    LinkDinamicoComponent
  },
  data(): any{
    return{
      movimentacao: new Movimentacao()
    }
  },
  methods: {
    async cadastrar() {
      const movimentacao = new Movimentacao();
      movimentacao.beneficiario = this.movimentacao.beneficiario;
      movimentacao.ativo = this.movimentacao.ativo;
      movimentacao.dataEmprestimo = this.movimentacao.dataEmprestimo;
      movimentacao.dataDevolucao = this.movimentacao.dataDevolucao;
      movimentacao.descricao = this.movimentacao.descricao;
      movimentacao.isDevolvido = false;
    }
  }
})
</script>
