<?php 
    function head(){
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/resources/css/bootstrap.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400&display=swap" rel="stylesheet">
    <style>
        body{
            font-family: 'Roboto Mono', monospace;
        }
        </style>
    <title>Ejercicio2</title>
</head>
<body>
    <div id="app" class="container-fluid p-0">
        <header class="row m-0 light">
            <div class="col-9">
                <h1 class="ml-3 mt-2">BLOG X</h1>
            </div>
            <div class="col-3">

            </div>
        </header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Sección 1</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Sección 2</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
<?php
    }
    function foot(){
?>
    </div>

<script src="/resources/js/jquery.js"></script>
<script src="/resources/js/bootstrap.js"></script>
<script src="/resources/js/app.js"></script>

</body>
</html>

<?php
    }
?>