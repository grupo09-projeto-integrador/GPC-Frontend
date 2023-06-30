<template>
    <div class="main-content d-flex flex-column">
        <div class="printable ml-2 mr-2">
            <div class="header d-flex align-items-center justify-content-between">
                <div class="titles">
                    <p class="title m-0">Relatórios de Cadastro | Emprestimos</p>
                    <p class="nowDate">Data de geração : {{ nowsDate }}</p>
                    <p class="fromTo">De {{ from }} Até {{ to }}</p>
                </div>
            </div>
            <div class="data">
                <div class="summary-section">
                    <div class="summary-item">
                        <span>Total de Empréstimos:</span>
                        <span>{{ moves.length }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Média de Duração do Empréstimo:</span>
                        <span>{{ calculateAverageDuration }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Data de Empréstimo mais Recente:</span>
                        <span>{{ getMostRecentLoanDate }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Data de Devolução mais Próxima:</span>
                        <span>{{ getClosestReturnDate }}</span>
                    </div>
                </div>
            </div>
            <table class="table table-sm table-bordered w-100 mt-4">
                <thead>
                    <tr>
                        <th scope="col">Id Património</th>
                        <th scope="col">Nome Categoria</th>
                        <th scope="col">Nome Beneficário</th>
                        <th scope="col">CPF Beneficário</th>
                        <th scope="col">Nome Responsavel</th>
                        <th scope="col">CPF Responsavel</th>
                        <th scope="col">Data de Empréstimo</th>
                        <th scope="col">Data de Devolução</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="move in moves" :key="move.id">
                        <td> {{ move.ativo.idPatrimonio }} </td>
                        <td>{{ move.ativo.categoria.nomeCategoria }}</td>
                        <td>{{ move.beneficiario.perfil.nome }}</td>
                        <td>{{ move.beneficiario.perfil.cpf }}</td>
                        <td>{{ move.beneficiario.responsavel.nome }}</td>
                        <td>{{ move.beneficiario.responsavel.cpf }}</td>
                        <td>{{ formatDate(move.dataEmprestimo) }}</td>
                        <td>{{ formatDate(move.dataDevolucao) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="download align-self-center m-0">
            <button class="btn btn-danger d-flex align-items-center gap-2 mb-4" id="downloadButton" @click="downloadPDF"
                style="background-color: #DC3545;color: #fff;">
                <i class="bi bi-download"></i>
                <span>Download</span>
            </button>
        </div>
    </div>
</template> 

<script lang="ts">
import { defineComponent } from 'vue';
import jsPDF from 'jspdf';
import { Movimentacao } from '@/model/movimentacao';
import { MovimentacoesClient } from '@/client/movimentacao.client';
export default defineComponent({
    name: 'RelatoriosCadastroAtivosView',
    data() {
        return {
            moves: [] as Movimentacao[],
            nowsDate: '',
            from: '',
            to: '',
        }
    },
    computed: {

        calculateAverageDuration() {
            if (this.moves.length === 0) {
                return 0;
            }
            let totalDuration = 0;
            this.moves.forEach(move => {
                const startDate = new Date(move.dataEmprestimo);
                const endDate = new Date(move.dataDevolucao);
                const durationInDays = Math.ceil((Number(endDate) - Number(startDate)) / (1000 * 60 * 60 * 24));
                totalDuration += durationInDays;
            });
            return (totalDuration / this.moves.length).toFixed(2);
        },

        getMostRecentLoanDate() {
            if (this.moves.length === 0) {
                return "";
            }
            const dates = this.moves.map(move => new Date(move.dataEmprestimo).getTime());
            const maxDate = new Date(Math.max(...dates));
            return this.formatDate(maxDate);
        },

        getClosestReturnDate() {
            if (this.moves.length === 0) {
                return "";
            }
            const dates = this.moves.map(move => new Date(move.dataEmprestimo).getTime());
            const minDate = new Date(Math.min(...dates));
            return this.formatDate(minDate);
        },

        getCategoryCounts() {
            const categories = this.moves.map(move => move.ativo.categoria.nomeCategoria);
            const categoryCounts = categories.reduce((acc, curr) => {
                if (acc[curr]) {
                    acc[curr]++;
                } else {
                    acc[curr] = 1;
                }
                return acc;
            }, {} as { [key: string]: number });
            return Object.keys(categoryCounts).map(key => ({ name: key, count: categoryCounts[key] }));
        }


    },
    created() {
        // Access query parameters from the URL
        const query = this.$route.query;
        this.from = query.from?.toString() || '';
        this.to = query.to?.toString() || '';
        this.nowsDate = new Date().toLocaleString();
        this.fetchMoves();
    },
    methods: {

        downloadPDF() {
            const pdf = new jsPDF();

            const element = document.querySelector('.printable') as HTMLElement;

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const widthRatio = pdfWidth / element.offsetWidth;
            const heightRatio = pdfHeight / element.offsetHeight;
            const scale = Math.min(widthRatio, heightRatio);

            pdf.html(element, {
                callback: function (pdf) {
                    pdf.save(`ReportEmprestimo.pdf`);
                },
                x: 0,
                y: 0,
                html2canvas: {
                    scale: scale,
                },
            });
        },
        formatDate(dateString: string | number | Date) {
            const dateTime = new Date(dateString);
            const formattedDate = dateTime.toLocaleDateString();
            const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `${formattedDate} ${formattedTime}`;
        },
        async fetchMoves() {
            try {
                const moveClient = new MovimentacoesClient();
                const response = await moveClient.findByDatePdf(this.from, this.to)
                this.moves = response;
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
    font-size: 15px;
    color: #ffffff !important;
    background-color: #0067c8 !important;
}
.summary-section {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.summary-item {
  flex-basis: 50%;
  display: flex;
  gap: 20px;
  margin-bottom: 0.5rem;
}

.summary-item span:first-child {
  font-weight: bold;
}
</style>