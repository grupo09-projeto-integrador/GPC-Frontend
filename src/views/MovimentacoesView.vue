<template>
  <h4>Movimentações</h4>
  <div class="forms-beneficiario">
    <form id="form-cadastro-beneficiario">
      <div class="flexbox">
        <div class="info">
          <label for="beneficiario">Beneficiario:</label>
          <input id="beneficiario" type="text" />
        </div>

        <div class="info">
          <label for="ativo">Ativo:</label>
          <input id="ativo" type="text" />
        </div>
      </div>

      <div class="flexbox">
        <div class="info">
          <label for="dt_emprestimo">Data de Empréstimo:</label>
          <input id="dt_emprestimo" type="date" />
        </div>
        <div class="info">
          <label for="dt_devolucao">Data de Devolução:</label>
          <input id="dt_devolucao" type="date" />
        </div>
      </div>
    </form>
  </div>

  <div class="table">
    <div class="table-title">
      <div class="filtrar">
        <a href="#"><i class="bi bi-funnel-fill"></i>Filtrar</a>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Ativo</th>
          <th scope="col">Data Inicial</th>
          <th scope="col">Data Final</th>
          <th scope="col">Devolvido</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p>Cadeira de Rodas<span class="id" id="id-ativo">11023</span></p>
          </td>
          <td class="date">21/11/2021</td>
          <td class="date">21/11/2022</td>
          <td>Não</td>
        </tr>
        <tr>
          <td>
            <p>Muleta<span class="id" id="id-ativo">11024</span></p>
          </td>
          <td class="date">21/11/2021</td>
          <td class="date">21/04/2022</td>
          <td>Não</td>
        </tr>
        <tr>
          <td>
            <p>Bota ortopédica<span class="id" id="id-ativo">9321</span></p>
          </td>
          <td class="date">21/11/2021</td>
          <td class="date">19/01/2022</td>
          <td>Não</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
