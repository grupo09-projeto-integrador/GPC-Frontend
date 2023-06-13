<template>
    <div class="main-content d-flex flex-column align-items-start">
        <LinkDinamicoComponent routeList="/ativos" routeRegister="/ativos/cadastrar" default-active="register" />
        <form class="form-app d-flex flex-column align-items-start mt-4 h-100" @submit.prevent="submitForm">
            <div class="row d-flex align-items-center align-self-start">
                <div class="col d-flex flex-column align-self-start">
                    <label for="categoria-id">Categoria</label>
                    <input type="number" class="form-control" id="categoria-id" placeholder="ID da Categoria"
                        v-model="ativo.categoria" />
                </div>
                <button type="submit" class="col-md-2 btn btn-primary align-self-end">
                    <i class="bi bi-search"></i>
                </button>
            </div>
            <div class="d-flex flex-column">
                <label for="patrimonio-id">Patrimônio</label>
                <input type="text" class="form-control" id="patrimonio-id" placeholder="ID do Patrimônio"
                    v-model="ativo.idPatrimonio" />
            </div>
            <div class="row g-3">
                <div class="col-md-6 d-flex flex-column align-items-start">
                    <label for="condicao">Condição</label>
                    <select class="form-select" aria-label="Default select example" id="condicao" v-model="ativo.condicao">
                        <option selected>Selecione uma condição</option>
                        <option v-for="condition in conditions" :key="condition" :value="condition">{{ condition }}</option>
                    </select>
                </div>
                <div class="col-md-6 d-flex flex-column align-items-start">
                    <label for="status">Status</label>
                    <select class="form-select" aria-label="Default select example" id="status" v-model="ativo.status">
                        <option selected>Selecione um status</option>
                        <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
                    </select>
                </div>
            </div>
            <div class="d-flex flex-column">
                <label for="dt_entrada">Data de Entrada</label>
                <input type="date" class="form-control" id="dt_entrada" v-model="ativo.dataEntrada" style="width: 300px;" />
            </div>
            <div class="col-12 p-0">
                <button type="submit" class="btn btn-primary" @submit="submitForm">Cadastrar</button>
            </div>
        </form>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import LinkDinamicoComponent from "@/components/LinkDinamicoComponent.vue";
import { Condicao } from '@/model/condicao';
import { Status } from '@/model/status';
import { AtivoClient } from '@/client/ativo.client';
import { Ativo } from '@/model/ativo';
import { Categoria } from '@/model/categoria';

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
            ativoClient: new AtivoClient()
        };
    },
    methods: {
        async submitForm() {
            const payload = {
                categoria: {
                    id: 1,
                    isSuspenso: false,
                    dataEdicao: new Date(),
                    dataCriacao: new Date()
                } 
            };

            const ativo = new Ativo();
            ativo.isSuspenso = true;
            ativo.dataCriacao = new Date();
            // ativo.categoria = payload.categoria;
            ativo.idPatrimonio = this.ativo.idPatrimonio;
            ativo.condicao = this.ativo.condicao;
            ativo.status = this.ativo.status;

            this.ativoClient.save(ativo)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }


    }

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
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>