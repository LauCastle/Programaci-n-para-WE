const app = {
	urlPost : "https://jsonplaceholder.typicode.com/posts",
	urlComments : "https://jsonplaceholder.typicode.com/comments",
	urlUsers : "https://jsonplaceholder.typicode.com/users",

	userId: "",

	cargarPost : async function(){
		//const cont = document.querySelector("#content");
		const cont = $("#content");
		cont.css("width", "100%");
		cont.addClass("mx-auto mt-5")
		let html = "";
		let urlaux = "";
		if (this.userId !== ""){
			urlaux = "?userId=" + this.userId;
		}
		let r = await  fetch(this.urlUsers + "/" + this.userId)
					.then(resp => resp.json())
					.catch(err => console.error(err));
		console.log(r);
		fetch(this.urlPost + urlaux)
			 .then(resp => resp.json())
			 .then(posts => {
			 	for(let post of posts){
					console.log(r.name);
			 		let autor = ( typeof r[post.userId-1] !== "undefined" ? r[post.userId].name : r.name);
			 		html += `
			 			<div class="card mb-3">
			              <div class="card-header">
			                <h5 class="card-tittle">${post.title}</h5>
							<h6 class="card-subtitle mb-2">${autor} | Fecha</h6>
			              </div>
			              <div class="card-body">
			                <p class="card-text">${post.body}</p>
			              </div>
			              <div class="card-footer text-muted">
			                <button class="btn btn-link" type="button" id="btn-ver-com${post.id}" onclick="app.cargarComments(${post.id})">
			                	Ver comentarios
			                </button>
			                <button class="btn btn-link d-none" type="button" id="btn-cer-com${post.id}" onclick="app.cerrarComments(${post.id})">
			                	Cerrar comentarios
			                </button>
			                <div class="card d-none" id="card-comm${post.id}">
			                	<ul class="list-group list-group-flush" id="comments${post.id}">

			                	</ul>
			                </div>
			              </div>
			            </div>
			 		`;
			 		//cont.innerHTML = html;
			 		cont.html(html);
			 	}
			 }).catch(err => console.error(err));
	},

	cargarComments : function(postId){
		let html = "";
		const listaCom = $("#comments" + postId);
		fetch(this.urlComments + "?postId" + postId)
			 .then(resp => resp.json())
			 .then(comments => {
			 	for(let c of comments){
			 		html +=`
			 			<li class="list-group-item mb-2">
			 				De: <b>${c.email}</b><br>${c.body}
			 			</li>`;
			 	}
			 	listaCom.html(html);
			 	$("#card-comm" + postId).toggleClass("d-none", false);
			 	$("#btn-ver-com" + postId).toggleClass("d-none", true);
			 	$("#btn-cer-com" + postId).toggleClass("d-none", false);
			 }).catch(err => console.error(err));
	},

	cerrarComments : function(postId){
		$("#comments" + postId).html("");
		$("#card-comm" + postId).toggleClass("d-none", true);
		$("#btn-ver-com" + postId).toggleClass("d-none", false);
		$("#btn-cer-com" + postId).toggleClass("d-none", true);
	},

	cargarUsers : function(){
		const users = $("#authors");
		let html = "";
		users.addClass("mt-5");
		users.html(html);
		fetch(this.urlUsers)
			 .then(resp => resp.json())
			 .then(usuarios => {
			 	for(let u of usuarios){
			 		html +=`
				    <button type="button" class="list-group-item list-group-item-action" aria-current="true" id="up${u.id}" onclick="app.userPost(${u.id})">
		                ${u.name}<br><small>${u.email}</small>
		              </button>`;
			 	}
			 	users.html(html);
			 }).catch(err => console.error(error));
	},

	userPost : function(userId){
		$("#up" + this.userId).removeClass("active");
		this.userId = userId;
		$("#up" + userId).addClass("active");
		this.cargarPosts();
	},
	buscarPalabra : function(){
		
	}
}

window.onload = function(){
	app.cargarPost();
	app.cargarUsers();
}