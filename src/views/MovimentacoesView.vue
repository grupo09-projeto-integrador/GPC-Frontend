<template>
  <form class="form-filtro">
    <div class="form-row d-flex justify-content-center">
      <div class="form-group col-md-4">
        <label for="ativo-id">Movimentação</label>
        <input
          type="text"
          class="form-control"
          id="movimentacao-id"
          placeholder="ID da Movimentação"
        />
      </div>
      <div class="form-group d-flex align-items-end">
        <button type="submit" class="btn btn-primary">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div class="form-group col-md-4">
        <label for="categoria-id">Categoria</label>
        <input
          type="text"
          class="form-control"
          id="categoria-id"
          placeholder="ID da Categoria"
        />
      </div>
      <div class="form-group d-flex align-items-end">
        <button type="submit" class="btn btn-primary">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
    <div class="form-row d-flex justify-content-center">
      <div class="form-group col-md-4">
        <label for="ativo-id">Ativo</label>
        <input
          type="text"
          class="form-control"
          id="ativo-id"
          placeholder="ID da Ativo"
        />
      </div>
      <div class="form-group d-flex align-items-end">
        <button type="submit" class="btn btn-primary">
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div class="form-group col-md-4">
        <label for="beneficiario-id">Beneficiario</label>
        <input
          type="text"
          class="form-control"
          id="beneficiario-id"
          placeholder="ID do Beneficiário"
        />
      </div>
      <div class="form-group d-flex align-items-end">
        <button type="submit" class="btn btn-primary">
          <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
    <div class="form-row d-flex justify-content-center">
      <div class="form-group col-md-3">
        <label for="inputCity">Data de Empréstimo</label>
        <input type="date" class="form-control" id="dt_emprestimo" />
      </div>
      <div class="form-group col-md-3">
        <label for="inputCity">Data de Devolução</label>
        <input type="date" class="form-control" id="dt_devolucao" />
      </div>
      
      <div class="d-flex align-items-center">
        <label style="margin:0"><input type="checkbox" />Mostrar devolvidos</label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Filtrar</button>
  </form>
  <!-- <div class="table">
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
  </div> -->
</template>

<style scoped>
.form-filtro {
  width: 75%;
  margin-top: 2rem;
}
</style>
