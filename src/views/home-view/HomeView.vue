<template>
    
  <div class="main-content">
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">Calma, bença!</h4>
    <p>O Carousel já vai sair!</p>
    <hr>
    <p class="mb-0">Enquanto ele não sai, use a imaginação aqui!</p>
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
            <button type="button" class="btn btn-success d-block w-100">Success</button>
          </div>
        <div class="carousel-item">
          <button type="button" class="btn btn-danger d-block w-100">nao Success</button>

        </div>
        <div class="carousel-item">
            <button type="button" class="btn btn-warning d-block w-100">talvez Success</button>
          </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
            </div>    
          </div>
          <hr>
          <table class="table caption-top col-md-3 table-bordered ">
    <caption>List of users</caption>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Ativos em atraso</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Ativo</td>
        
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Ativo</td>
        
      </tr>
      <tr>
        <th scope="row">3</th>
        <td>Ativo</td>
        
      </tr>
    </tbody>
  </table>



        </div> 
     
  
  
  </template>

  <style>
 @import url('../../../node_modules/bootstrap-icons/font/bootstrap-icons.css');
 /* As cores ficam muito fortes ativando isso. Sério.
 @import url('http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
*/

</style>






