<template>
    <div class="main-content d-flex flex-column">
        <div class="printable ml-2">
            <div class="header d-flex align-items-center justify-content-between">
                <div class="titles">
                    <p class="title m-0">Relatórios de Cadastro | Ativos</p>
                    <p class="nowDate">Data de geração : {{ nowsDate }}</p>
                    <p class="fromTo">De {{ from }} Até {{ to }}</p>
                </div>
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
        <div class="download align-self-center">
            <button class="btn btn-danger d-flex align-items-center gap-2" id="downloadButton" @click="downloadPDF"
                style="background-color: #DC3545;color: #fff; margin-right: 30px;">
                <i class="bi bi-download"></i>
                <span>Download</span>
            </button>
        </div>
    </div>
</template> 

<script lang="ts">
import { AtivoClient } from '@/client/ativo.client';
import { Ativo } from '@/model/ativo';
import { PageRequest } from '@/model/page/page-request';
import { PageResponse } from '@/model/page/page-response';
import { defineComponent } from 'vue';
import jsPDF from 'jspdf';
export default defineComponent({
    name: 'RelatoriosCadastroAtivosView',
    data() {
        return {
            ativos: [] as Ativo[],
            nowsDate: '',
            from: '',
            to: '',
            currentPage: 0,
            pageSize: 4,
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
        // Access query parameters from the URL
        const query = this.$route.query;
        this.from = query.from?.toString() || '';
        this.to = query.to?.toString() || '';
        this.nowsDate = new Date().toLocaleString();
        this.fetchAtivos();
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

            this.pageSize = this.ativos.length;

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
        async fetchAtivos() {
            try {
                const pageRequest = new PageRequest();
                pageRequest.currentPage = this.currentPage;
                pageRequest.pageSize = this.pageSize;
                const ativoClient = new AtivoClient();
                const response = await ativoClient.findByDatePdf(this.from,this.to)
                this.ativos = response;
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