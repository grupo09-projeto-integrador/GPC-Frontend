<template>
    <div class="main-content d-flex flex-column">
        <div class="printable ml-2">
            <div class="header d-flex align-items-center justify-content-between">
                <div class="titles">
                    <p class="title m-0">Relatórios de Cadastro | Emprestimos</p>
                    <p class="nowDate">Data de geração : {{ nowsDate }}</p>
                    <p class="fromTo">De {{ from }} Até {{ to }}</p>
                </div>
            </div>
            <div class="data d-flex flex-column gap-2">
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
                        <td>{{ move.ativo.categoria.nomeCategoria}}</td>
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

            // Get the HTML content you want to convert
            const element = document.querySelector('.printable') as HTMLElement;

            // Set the desired width and height for the PDF page
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Calculate the scaling factors based on the element's dimensions
            const widthRatio = pdfWidth / element.offsetWidth;
            const heightRatio = pdfHeight / element.offsetHeight;
            const scale = Math.min(widthRatio, heightRatio);


            // Convert HTML to PDF using jsPDF with scaling options
            pdf.html(element, {
                callback: function (pdf) {
                    // Save the PDF file
                    const pageNumber = 1; // Set the desired page number
                    pdf.save(`report_page_${pageNumber}.pdf`);
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
                const response = await moveClient.findByDatePdf(this.from,this.to)
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
</style>