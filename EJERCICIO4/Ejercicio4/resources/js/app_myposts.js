const app_myposts = {

    url : "/app/app.php",

    mp : $("#my-posts"),

    getMyPosts : function(uid){
       let html = `<tr><td colspan="3">Aún no tiene publicaciones</td></tr>`;
       this.mp.html("");
       fetch(this.url + "?_mp&uid=" + uid)
            .then( resp => resp.json())
            .then( mpresp => {
                if( mpresp.length > 0 ){
                    html = "";
                    for( let post of mpresp ){
                        html += `<tr>
                                    <td>${ post.title }</td>
                                    <td>${ post.created_at }</td>
                                    <td>${ post.updated_at != null ? post.updated_at : "Sin editar" }</td>
                                    <td>
                                        <a href="#" class="link-primary" data-bs-toggle="modal" data-bs-target="#modBody-${post.id}"><i class="bi bi-eye"></i></a>
                                        <a href="#" class="link-primary mx-2" data-bs-toggle="modal" data-bs-target="#modEd-${post.id}"><i class="bi bi-pencil-square"></i></a>
                                        <a href="#" class="link-success" onclick="app.seePost(${ post.id })"><i class="bi bi-toggle-on"></i></a>
                                        <a href="#" class="link-secondary mx-2" onclick="app.confirmation(event, ${ post.id })"><i class="bi bi-trash"></i></a>

                                        <!-- Modal para Visualizar -->
                                        <div class="modal fade" id="modBody-${post.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">${ post.title}</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ${ post.body }
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Modal para editar -->
                                        <div class="modal fade" id="modEd-${post.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Nueva Publicación</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <form>
                                                            <div class="mb-3">
                                                            <label for="recipient-name" class="col-form-label">Titulo:</label>
                                                            <input type="text" class="form-control" id="postTitle-${ post.id }" value="${ post.title }">
                                                            </div>
                                                            <div class="mb-3">
                                                            <label for="message-text" class="col-form-label">Nueva Información:</label>
                                                            <textarea class="form-control" id="postBody-${ post.id }">${post.body}</textarea>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                        <button type="button" class="btn btn-primary" onclick="app.guardarCamb(${ post.id })">Guardar Cambios</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </td>
                                </tr>`;
                    }
                }
                this.mp.html(html);
            }).catch( err => console.error( err ));  
    },
};