<?php 
	function head(){
 ?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="/src/css/bootstrap.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap" rel="stylesheet">
	<style>
		body{
			font-family: 'Poppins', sans-serif;
		}
	</style>
	<title>Blog X</title>
</head>
<body>
	<div id="app" class="container-fluid p-0">
		<header class="row m-0 bg-light">
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
		          <a class="nav-link active" aria-current="page" href="#">Home</a>
		        </li>
		        <li class="nav-item">
		          <a class="nav-link" href="#">Link</a>
		        </li>
		        <li class="nav-item dropdown">
		          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
		            Dropdown
		          </a>
		          <ul class="dropdown-menu">
		            <li><a class="dropdown-item" href="#">Action</a></li>
		            <li><a class="dropdown-item" href="#">Another action</a></li>
		            <li><hr class="dropdown-divider"></li>
		            <li><a class="dropdown-item" href="#">Something else here</a></li>
		          </ul>
		        </li>
		        <li class="nav-item">
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

	<script src="/src/js/jquery.js"></script>
	<script src="/src/js/bootstrap.js"></script>
	<script src="/src/js/app.js"></script>
</body>
</html>
<?php 
	}
?>