<template>
    <div class="main-content d-flex flex-column">
        <div class="printable ml-2 mr-2">
            <div class="header d-flex align-items-center justify-content-between">
                <div class="titles">
                    <p class="title m-0">Relatórios de Cadastro | Categorias</p>
                    <p class="nowDate">Data de geração : {{ nowsDate }}</p>
                    <p class="fromTo">De {{ from }} Até {{ to }}</p>
                </div>
                <div class="actions d-flex align-items-center align-self-start mt-3">
                    <div class="search-container ">
                    <input type="text" class="search-input" placeholder="Buscar por Nome Categoria ..."
                        v-model="searchQuery" />
                    <i class="bi bi-search search-icon"></i>
                </div>
                    <button class="download btn btn-danger d-flex align-items-center gap-2" id="downloadButton" @click="downloadPDF"
                style="background-color: #DC3545;color: #fff;">
                <i class="bi bi-download"></i>
            </button>
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
                    <tr v-for="categoria in categoriasFilter" :key="categoria.id">
                        <td> {{ formatDate(categoria.dataCriacao) }} </td>
                        <td>{{ categoria.nomeCategoria }}</td>
                        <td>{{ categoria.qtdeAtivos }}</td>
                    </tr>
                </tbody>
            </table>
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
            searchQuery: '',
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
        },
        categoriasFilter(): Categoria[] {
            if (this.searchQuery) {
                return this.categorias.filter((categoria) =>
                    categoria.nomeCategoria
                        .toLowerCase()
                        .includes(this.searchQuery.toLowerCase())
                );
            } else {
                return this.categorias;
            }
        },

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

    // Hide the .search-container element
    const searchElement = element.querySelector('.search-container') as HTMLElement;
    if (searchElement) {
        searchElement.style.display = 'none';
    }

    const downloadButton = document.querySelector('.btn-danger') as HTMLElement;
if (downloadButton) {
    downloadButton.style.setProperty('display', 'none', 'important');
    console.log(downloadButton);
}


    // Hide the form elements
    const formElements = element.querySelectorAll('form label, form input, form select') as NodeListOf<HTMLElement>;
    formElements.forEach((formElement) => {
        formElement.style.display = 'none';
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const widthRatio = pdfWidth / element.offsetWidth;
    const heightRatio = pdfHeight / element.offsetHeight;
    const scale = Math.min(widthRatio, heightRatio);

    pdf.html(element, {
        callback: function (pdf) {
            pdf.save(`ReportCategoria.pdf`);

            // Show the .search-container element and form elements after saving the PDF
            if (searchElement) {
                searchElement.style.display = '';
            }
            if (downloadButton) {
                downloadButton.style.display = '';
            }

            formElements.forEach((formElement) => {
                formElement.style.display = '';
            });
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

.search-container {
    position: relative;
    margin-right: 30px;
}

.search-input {
    position: relative;
    width: 350px;
    height: 36px;
    padding: 0.5rem 1rem 0.5rem 2rem;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 50px;
    background: #f5f5f5;
}

.search-input:focus {
    outline: none;
    border-color: #aaa;
}

.search-input::placeholder {
    font-family: "Raleway", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    color: #3c3c43;
}

.search-icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    color: #888;
}

td,
th,
tr {
    text-align: center;
}

th {
    text-align: center;
    height: 30px;
    background: #0d6efd;
    color: #fff;
    font-weight: 300;
}

.summary-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

.data {
    margin-bottom: 20px;
}

.table {
    border-collapse: collapse;
}

td {
    height: 30px;
}</style>