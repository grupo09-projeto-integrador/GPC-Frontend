<template>
    <div class="d-flex flex-column">
        <img src="https://github.com/grupo09-projeto-integrador/GPC-Frontend/blob/e829840a8af8412b8189ea5449638f5d8ca392eb/src/assets/logo.png"
            alt="logo" class="align-self-center">
        <div class="titles d-flex flex-column">
            <p class="title m-0">Relatórios de Cadastro | Ativos</p>
            <p class="nowDate">Data de geração : {{ nowsDate }}</p>
            <p class="fromTo">De {{ from }} Até {{ to }}</p>
        </div>
        <div class="data d-flex flex-column gap-2">
            <span class="numeroCadastro">Ativos Cadastrados : {{ countAtivosCadastrados }}</span>
            <span class="ativosDisponiveis">Ativos Disponiveis : {{ countAtivosDisponiveis }}</span>
            <span class="ativosIndisponiveis">Ativos Indisponiveis : {{ countAtivosIndisponiveis }}</span>
            <span class="ativosAtivos">Ativos Ativos : {{ countAtivosAtivos }}</span>
            <span class="ativosInativos">Ativos Inativos : {{ countAtivosInativos }}</span>
        </div>
        <table class="table table-sm table-bordered w-100 mt-4">
            <thead>
                <tr>
                    <th scope="col">Data de Cadastro</th>
                    <th scope="col">Nome Categoria</th>
                    <th scope="col">Id Património</th>
                    <th scope="col">Condição</th>
                    <th scope="col">Status</th>
                    <th scope="col">Data de Entrada</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ativo in ativos" :key="ativo.id">
                    <td> {{ formatDate(ativo.dataCriacao) }} </td>
                    <td>{{ ativo.categoria.nomeCategoria }}</td>
                    <td>{{ ativo.idPatrimonio }}</td>
                    <td>{{ ativo.condicao }}</td>
                    <td>{{ ativo.status }}</td>
                    <td>{{ formatDate(ativo.dataEntrada) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">

import { AtivoClient } from '@/client/ativo.client';
import { Ativo } from '@/model/ativo';
import { PageRequest } from '@/model/page/page-request';
import { PageResponse } from '@/model/page/page-response';
import { createApp, defineComponent } from 'vue';
import { Vue } from 'vue-facing-decorator';



export default defineComponent({
    name: 'RelatoriosCadastroAtivosView',
    data() {
        return {
            ativos: [] as Ativo[],
            nowsDate: '',
            from: '',
            to: '',
        }
    },
    computed: {
        countAtivosAtivos(): number {
            return this.ativos.filter(ativo => !ativo.isSuspenso).length;
        },
        countAtivosInativos(): number {
            return this.ativos.filter(ativo => ativo.isSuspenso).length;
        },
        countAtivosCadastrados(): number {
            return this.ativos.length;
        },
        countAtivosDisponiveis(): number {
            return this.ativos.filter(ativo => ativo.status === 'DISPONIVEL').length;
        },
        countAtivosIndisponiveis(): number {
            return this.ativos.filter(ativo => ativo.status === 'USANDO').length;
        }
    },
    created() {
        // // Access query parameters from the URL
        // const query = this.$route.query;
        // this.from = query.from?.toString() || '';
        // this.to = query.to?.toString() || '';
        // this.nowsDate = new Date().toLocaleString();
        this.fetchAtivos();
    },
    methods: {
        formatDate(dateString: string | number | Date) {
            const dateTime = new Date(dateString);
            const formattedDate = dateTime.toLocaleDateString();
            const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `${formattedDate} ${formattedTime}`;
        },
        async fetchAtivos() {
            try {
                const pageRequest = new PageRequest();
                const ativoClient = new AtivoClient();
                const response = await ativoClient.findByDatePdf(this.from, this.to);
                this.ativos = response;
                console.log(this.ativos)
            } catch (error) {
                console.error(error);
            }
        },
    }
});
</script>

<style scoped>
.title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
}

.nowDate,
.fromTo {
    font-size: 16px;
    color: #777;
}

td,
th,
tr {
    text-align: center;
}

th {
    text-align: center;
    height: 30px;
    font-family: "Inter";
    font-weight: 200;
    font-size: 18px;
    color: #ffffff !important;
    background-color: #0067c8 !important;
}
</style>