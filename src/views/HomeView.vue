<template>
  <!-- <link rel="stylesheet" href="App.vue">
  <div class="main-content">
   <body>
    <div class="caroussel">
      <h1>imagina um carrousel aqui uau</h1>
      <hr id="linha-baixo-carrousel">
    </div>
    <div class="table-01">
    <table class="ativosAtraso">
            <thead>
              <tr>
                <th class="tableHeader">
                  <p>Ativos Em Atraso</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Cadeira de Rodas</p>
                  <span>#812498</span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Muletas</p>
                  <span>#234589</span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Cama Hospitalar</p>
                  <span>#6467382</span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Andador</p>
                  <span>#202933</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table class="recemCadastros">
            <thead class="tableHeaderOne">
              <tr>
                <th>Nome</th>
                <th>Posição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr class="dinamic">
                <td>
                  <p>Amy Mathues</p>
                  <span>#11023</span>
                </td>
                <td>
                  <p>Funcionario</p>
                </td>
                <td>
                  <a href="#"><i class="bi bi-arrow-up-right-square"></i></a>
                  <span><i class="bi bi-trash3"></i></span>
                </td>
              </tr>

              <tr class="dinamic">
                <td>
                  <p>Amira Kandanvski</p>
                  <span>#123301</span>
                </td>
                <td>
                  <p>Beneficiário</p>
                </td>
                <td>
                  <a href="#"><i class="bi bi-arrow-up-right-square"></i></a>
                  <span><i class="bi bi-trash3"></i></span>
                </td>
              </tr>

              <tr class="dinamic">
                <td>
                  <p>Cadeira de Roda</p>
                  <span>#99201</span>
                </td>
                <td>
                  <p>Ativo</p>
                </td>
                <td>
                  <a href="#"><i class="bi bi-arrow-up-right-square"></i></a>
                  <span><i class="bi bi-trash3"></i></span>
                </td>
              </tr>

              <tr class="dinamic">
                <td>
                  <p>Joseph Martini</p>
                  <span>#202933</span>
                </td>
                <td>
                  <p>Beneficiário</p>
                </td>
                <td>
                  <a href="#"><i class="bi bi-arrow-up-right-square"></i></a>
                  <span><i class="bi bi-trash3"></i></span>
                </td>
              </tr>
            </tbody>
          </table>

    </div>
  
   </body>
    
    </div>
  -->
  <body>
      <section class="popUpDel show">
        <div class="modalDel">
          <div class="con">
            <p>Tem certeza de que deseja excluir o registro?</p>
          </div>

          <div class="btnsDel">
            <button class="btnOneDel">Sim</button>
            <button class="btnTwoDel">Cancelar</button>
          </div>
        </div>
      </section>

      <div class="body-content">
        <section class="dashboard">
          <div class="container">
            <div class="elemento">
              <div class="interAlign">
                <span class="quantidade"></span>
                <p class="itens">Itens Restantes :</p>
              </div>
              <p class="nome">Cadeira de rodas</p>
            </div>

            <div class="elemento">
              <div class="interAlign">
                <span class="quantidade"></span>
                <p class="itens">Itens Restantes :</p>
              </div>
              <p class="nome">Muletas</p>
            </div>

            <div class="elemento">
              <div class="interAlign">
                <span class="quantidade"></span>
                <p class="itens">Itens Restantes :</p>
              </div>
              <p class="nome">Cama hospitalar</p>
            </div>

            <div class="elemento">
              <div class="interAlign">
                <span class="quantidade"></span>
                <p class="itens">Itens Restantes :</p>
              </div>
              <p class="nome">Tala</p>
            </div>

            <div class="elemento">
              <div class="interAlign">
                <span class="quantidade"></span>
                <p class="itens">Itens Restantes :</p>
              </div>
              <p class="nome">Andador</p>
            </div>
          </div>
        </section>

        <hr />

        <section class="dashTables">
          <table class="ativosAtraso">
            <thead>
              <tr>
                <th class="tableHeader">
                  <p>Ativos Em Atraso</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Cadeira de Rodas</p>
                  <span>#812498</span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Muletas</p>
                  <span>#234589</span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Cama Hospitalar</p>
                  <span>#6467382</span>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Andador</p>
                  <span>#202933</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table class="recemCadastros">
            <thead class="tableHeaderOne">
              <tr>
                <th>Nome</th>
                <th>Posição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr class="dinamic">
                <td>
                  <p>Amy Mathues</p>
                  <span>#11023</span>
                </td>
                <td>
                  <p>Funcionario</p>
                </td>
                <td>
                  <a href="#"><i class="bi bi-arrow-up-right-square"></i></a>
                  <span><i class="bi bi-trash3"></i></span>
                </td>
              </tr>

              <tr class="dinamic">
                <td>
                  <p>Amira Kandanvski</p>
                  <span>#123301</span>
                </td>
                <td>
                  <p>Beneficiário</p>
                </td>
                <td>
                  <a href="#"><i class="bi bi-arrow-up-right-square"></i></a>
                  <span><i class="bi bi-trash3"></i></span>
                </td>
              </tr>

              <tr class="dinamic">
                <td>
                  <p>Cadeira de Roda</p>
                  <span>#99201</span>
                </td>
                <td>
                  <p>Ativo</p>
                </td>
                <td>
                  <a href="#"><i class="bi bi-arrow-up-right-square"></i></a>
                  <span><i class="bi bi-trash3"></i></span>
                </td>
              </tr>

              <tr class="dinamic">
                <td>
                  <p>Joseph Martini</p>
                  <span>#202933</span>
                </td>
                <td>
                  <p>Beneficiário</p>
                </td>
                <td>
                  <a href="#"><i class="bi bi-arrow-up-right-square"></i></a>
                  <span><i class="bi bi-trash3"></i></span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
  </body>
  </template>

  <style>
  :root {
    --cor-principal: #0067C8;
    --cor-secundario: #F7A81B;
    --bg-principal: white;
    --text-secundario: #808192;
    --font-principal: 'Inter', sans-serif;
    --font-weight-leve: 400;
    --font-weight-principal: 500;
    --font-weight-destaque: 600;
    --font-weight-forte: 800;
  }
 
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  /* POP-UP GENRERAL CSS */

  .popUpDel {
    width: 450px;
    height: 100px;
    position: fixed;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background-color: white;
    filter: drop-shadow(8px 8px 8px #000 );
  }

  .show {
    display: none;
  }

  .popUpDel .modalDel{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .popUpDel .modalDel .con p {
    font-family: Inter;
    font-size: 1rem;
  }

  .popUpDel .modalDel .btnsDel {
    display: flex;
    gap: 30px;
  }

  .popUpDel .modalDel .btnsDel button {
    align-self: center;
    background: #f7a81b;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-family: "Inter";
    width: 130px;
    height: 30px;
    font-size: 18px;
    text-align: center;
    cursor: pointer;
  }

  .body-content {
    display: flex;
    flex-direction: column;
  }

  /* CAIXAS-DASHBOARD */

  .container {
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    margin-top: 35px;
    margin-right: 30px;
  }

  .container .elemento {
    width: 205px;
    font-family: "Roboto", sans-serif;
    color: #fff;
    text-transform: uppercase;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .elemento .interAlign {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 8px;
  }

  .elemento .interAlign .quantidade {
    align-self: center;
    text-indent: 2px;
    font-weight: bolder;
    font-size: 62px;
    text-indent: 7px;
  }

  .elemento .nome {
    text-align: center;
  }

  hr {
    margin-left: 20px;
    margin-right: 50px;
  }
  /* ////////////////// */

  .dashTables {
    height: 330px;
    margin-bottom: 30px;
    align-items: flex-end;
    display: inline-flex;
    gap: 100px;
    margin-left: 20px;
  }

  .ativosAtraso {
    box-sizing: border-box;
    height: 300px;
    background: #fff;
    border: 1px solid #e0e2e7;
    border-collapse: collapse;
  }

  .tableHeader {
    font-family: "Inter", sans-serif;
    color: #fff;
    background-color: #0067c8;
    width: 300px;
    line-height: 2px;
    text-align: initial;
    text-indent: 5px;
  }

  .ativosAtraso td,
  .ativosAtraso th {
    border: 1px solid #e0e2e7;
  }

  .ativosAtraso td p {
    font-family: "Inter";
    font-weight: 550;
    font-size: 17px;
    line-height: 5px;
    margin-top: 5px;
    text-indent: 5px;
  }

  .ativosAtraso td span {
    font-weight: 400;
    font-size: 14px;
    margin-left: 5px;
  }

  .recemCadastros {
    box-sizing: border-box;
    height: 300px;
    width: 600px;
    background: #fff;
    border: 1px solid #e0e2e7;
    border-collapse: collapse;
  }

  .tableHeaderOne {
    font-family: "Inter", sans-serif;
    color: #fff;
    background-color: #0067c8;
    line-height: 35px;
    text-align: start;
    text-indent: 5px;
  }

  .recemCadastros td,
  .recemCadastros th {
    border: 1px solid #e0e2e7;
  }

  .recemCadastros td p {
    font-family: "Inter";
    font-weight: 550;
    font-size: 17px;
    line-height: 5px;
    margin-top: 5px;
    text-indent: 5px;
  }

  .recemCadastros td span {
    font-weight: 400;
    font-size: 14px;
    margin-left: 5px;
  }

  .recemCadastros td i {
    cursor: pointer;
    margin-left: 60px;
    font-size: 19px;
    color: #0067c8;
  }

  /* RESPONSIVITY */

  @media (max-width: 1140px) {
    .container {
      display: grid;
      grid-template-columns: auto auto auto;
    }
    hr {
      margin-top: 180px;
    }

    .dashTables {
      gap: 10px;
    }
  }

  @media (max-width: 1090px) {
    .dashTables {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
      gap: 30px;
    }
  }

  @media (max-width: 1030px) {
    .container {
      display: grid;
      grid-template-columns: auto auto;
    }
    hr {
      margin-top: 300px;
    }

    .dashTables {
      gap: 30px;
    }
  }

</style>






