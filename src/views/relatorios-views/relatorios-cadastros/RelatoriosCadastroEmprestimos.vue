<template>
    <div class="main-content d-flex flex-column">
        <div class="printable ml-2 mr-2">
            <div class="header d-flex align-items-center justify-content-between">
                <div class="titles">
                    <p class="title m-0">Relatórios de Cadastro | Emprestimos</p>
                    <p class="nowDate">Data de geração : {{ nowsDate }}</p>
                    <p class="fromTo">De {{ from }} Até {{ to }}</p>
                </div>
                <div class="actions d-flex align-items-center align-self-start mt-3">
                    <div class="search-container ">
                    <input type="text" class="search-input" placeholder="Buscar por Id Património ..."
                        v-model="searchQuery" />
                    <i class="bi bi-search search-icon"></i>
                </div>
                    <button class="download btn btn-danger d-flex align-items-center gap-2" id="downloadButton" @click="downloadPDF"
                style="background-color: #DC3545;color: #fff;">
                <i class="bi bi-download"></i>
            </button>
                </div>
            </div>
            <form class="form-app mt-2 h-auto flex-row d-flex align-itens-cemter gap-4 align-self-start">
                <div class="d-flex flex-column">
                    <label for="select">Categoria</label>
                    <select class="form-select" id="select" style="width: 300px" v-model="selectedCategory">
                        <option value="" selected>Todas as Categorias</option>
                        <option v-for="categoria in categorias" :value="categoria.nomeCategoria">
                            {{ categoria.nomeCategoria }}
                        </option>
                    </select>
                </div>
            </form>
            <div class="data mt-4">
                <div class="summary-section">
                    <div class="summary-item">
                        <span>Total de Empréstimos:</span>
                        <span>{{ moves.length }}</span>
                    </div>
                    <div class="summary-item">
                        <span>Média de Duração do Empréstimo:</span>
                        <span>{{ calculateAverageDuration }} dias</span>
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
                    <tr v-for="move in moveFilter" :key="move.id">
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
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import jsPDF from 'jspdf';
import { Movimentacao } from '@/model/movimentacao';
import { MovimentacoesClient } from '@/client/movimentacao.client';
import { Categoria } from '@/model/categoria';
import { CategoriaClient } from '@/client/categoria.client';
export default defineComponent({
    name: 'RelatoriosCadastroAtivosView',
    data() {
        return {
            moves: [] as Movimentacao[],
            nowsDate: '',
            from: '',
            to: '',
            searchQuery: '',
            selectedDateEntry: '',
            selectedDateSaida: '',
            checked: false,
            categorias: [] as Categoria[],
            selectedCategory: '',
        }
    },
    mounted() {
        this.fetchCategories();
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
                const durationInMilliseconds = endDate.getTime() - startDate.getTime();
                const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
                totalDuration += durationInDays;
            });
            const averageDuration = totalDuration / this.moves.length;
            return averageDuration.toFixed(0);
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
        },
        moveFilter(): Movimentacao[] {
            if (!this.searchQuery && !this.selectedCategory) {
                return this.moves;
            } else {
                const lowerCaseQuery = this.searchQuery.toLowerCase();
                const filteredAtivos = this.moves.filter((move: Movimentacao) => {
                    const matchesQuery = move.ativo.idPatrimonio.toLowerCase().includes(lowerCaseQuery);
                    const matchesCategory = move.ativo.categoria.nomeCategoria.toString().toLowerCase() === this.selectedCategory.toLowerCase();
                    return (matchesQuery || matchesCategory);
                });
                return filteredAtivos;
            }
        },

    },
    created() {
        const query = this.$route.query;
        this.from = query.from?.toString() || '';
        this.to = query.to?.toString() || '';
        this.nowsDate = new Date().toLocaleString();
        this.fetchMoves();
    },
    methods: {
        fetchCategories() {
            const client = new CategoriaClient();
            const response = client.findAll();
            response.then((res) => {
                this.categorias = res;
            });
        },
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
            pdf.save(`ReportEmprestimo.pdf`);

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