<template>
  
  <div class="main-content">
    
    
    </div>
  
  
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






