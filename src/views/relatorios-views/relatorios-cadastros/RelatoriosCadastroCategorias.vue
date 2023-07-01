<template>
    <div class="main-content d-flex flex-column">
        <div class="printable ml-2 mr-2">
            <div class="header d-flex align-items-center justify-content-between">
                <div class="titles">
                    <p class="title m-0">Relatórios de Cadastro | Categorias</p>
                    <p class="nowDate">Data de geração : {{ nowsDate }}</p>
                    <p class="fromTo">De {{ from }} Até {{ to }}</p>
                </div>
            </div>
            <div class="data">
                <div class="summary-section">
                    <div class="summary-item">
                        <span>Categorias Cadastradas :</span>
                        <span>{{ countCategoriasCadastrados }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Categoria Com Mais Ativos :</span>
                        <span>{{ categoriaComMaisAtivos }}</span>
                    </div>
                </div>
            </div>
            <table class="table table-sm table-bordered w-100 mt-4">
                <thead>
                    <tr>
                        <th scope="col">Data de Cadastro</th>
                        <th scope="col">Nome Categoria</th>
                        <th scope="col">Qtde. Ativos</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="categoria in categorias" :key="categoria.id">
                        <td> {{ formatDate(categoria.dataCriacao) }} </td>
                        <td>{{ categoria.nomeCategoria }}</td>
                        <td>{{ categoria.qtdeAtivos }}</td>
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
import { Categoria } from '@/model/categoria';
import { CategoriaClient } from '@/client/categoria.client';
export default defineComponent({
    name: 'RelatoriosCadastroAtivosView',
    data() {
        return {
            categorias: [] as Categoria[],
            nowsDate: '',
            from: '',
            to: '',
        }
    },
    computed: {
        countCategoriasCadastrados(): number {
            return this.categorias.length;
        },
        categoriaComMaisAtivos(): any {
            if (this.categorias.length > 0) {
                const sortedCategorias = this.categorias.sort(
                    (a, b) => b.qtdeAtivos - a.qtdeAtivos
                );
                return sortedCategorias[0].nomeCategoria;
            } else {
                return '';
            }
        }

    },
    created() {
        // Access query parameters from the URL
        const query = this.$route.query;
        this.from = query.from?.toString() || '';
        this.to = query.to?.toString() || '';
        this.nowsDate = new Date().toLocaleString();
        this.fetchCategorias();
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

            const elementa = document.querySelector('.data') as HTMLElement;

            pdf.html(element, {
                callback: function (pdf) {
                    pdf.save(`ReportCategoria.pdf`);
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
        async fetchCategorias() {
            try {
                const categoriaClient = new CategoriaClient();
                const response = await categoriaClient.findByDatePdf(this.from, this.to)
                this.categorias = response;
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