<?php
    namespace views;
    require '../../app/autoloader.php';
    include "./layouts/main.php";
    use Controllers\auth\LoginController as LoginController;
    $ua = new LoginController;

    head($ua);
?>
<div class="row mx-auto" style="90%;">
    <div class="col-8">
        <div id="content" class="content">
            <!-- Publicaciones -->
            <h2>Usuario logueado</h2>
        </div>
    </div>
    <div class="col-4">
        <div id="authors" class="list-group">
            <!-- Autores -->
            
        </div>
    </div>
</div>
 <?php 
    scripts();
 	foot();
  ?>