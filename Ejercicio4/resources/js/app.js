const app = {

    routes : {
        inisession : "/resources/views/auth/login.php",
        endsession : "/app/app.php?_logout",
        login : "/app/app.php",
        register : "/resources/views/auth/register.php",
        doregister : "/app/app.php",
        prevposts : "/app/app.php?_pp",
        lastpost : "/app/app.php?_lp",
        openpost : "/app/app.php?_op",
        newpost : "/resources/views/autores/newpost.php",
        myposts : "/resources/views/autores/myposts.php",
        deletepost : "/app/app.php?_dp",
    },

    pp : $("#prev-posts"),
    lp : $("#content"),

    view : function(route){
        location.replace(this.routes[route]);
    },
    previousPosts : function(){
        let html = `<b>Aún no hay publicaciones en este blog</b>`;
        this.pp.html("");
        fetch(this.routes.prevposts)
            .then( resp => resp.json())
            .then( ppresp => {
                if( ppresp.length > 0){
                    html = "";
                    let primera = true;
                    for( let post of ppresp ){
                        html += `
                            <a href="#" onclick="app.openPost(event,${ post.id },this)"
                                class="list-group-item list-group-item-action ${ primera ? `active`:``} pplg">
                                <div class="w-100 border-bottom">
                                    <h5 class="mb-1">${ post.title }</h5>
                                    <small class="text-${ primera ? `light` : `muted` }">
                                        <i class="bi bi-calendar-week"></i> 
                                        ${ post.fecha }
                                    </small>
                                </div>
                                <small>
                                    <i class="bi bi-person-circle"></i>
                                    <b>${ post.name }</b>
                                </small>
                            </a>
                        `;
                        primera = false;
                    }
                    this.pp.html(html);
                }
            }).catch( err => console.error( err ));

    },
    lastPost : function(limit){
        let html = "<h2>Aún no hay publicaciones</h2>";
        this.lp.html("");

        fetch(this.routes.lastpost + "&limit=" + limit)
            .then( response => response.json())
            .then( lpresp => {
                if( lpresp.length > 0 ){
                    html = `
                        <div class="w-100 border-bottom">
                            <h5 class="mb-1">${ lpresp[0].title }</h5>
                            <small class="text-muted">
                                <i class="bi bi-calendar-week"></i> ${ lpresp[0].fecha } | 
                                <i class="bi bi-person-circle"></i> ${ lpresp[0].name }
                            </small>
                            <p class="bm-1 border-bottom fs-3" style="text-align:justify;">
                                ${ lpresp[0].body }
                            </p>
                            <i class="bi bi-hand-thumbs-up"></i><span id="likes">${0}</span>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control"
                                    placeholder="Deja tu comentario"
                                    aria-label="Recipient's username"
                                    aria-describedby="button-addon2">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                                    <i class="bi bi-send"></i>
                                </button>
                            </div>
                        </div>
                    `;
                }
                this.lp.html(html);
            }).catch( err => console.error( err ));
    },
    openPost : function(event,pid,element){
        event.preventDefault();
        $(".pplg").removeClass("active");
        element.classList.add("active");
        this.lp.html("");
        let html = "";
        fetch(this.routes.openpost + "&pid=" + pid)
            .then( response => response.json())
            .then( post => {
                console.log(post[0]);
                html = `
                    <div class="w-100 border-bottom">
                        <h5 class="mb-1">${ post[0].title }</h5>
                        <small class="text-muted">
                            <i class="bi bi-calendar-week"></i>${ post[0].fecha } |
                            <i class="bi bi-person-circle"></i><b>${ post[0].name }</b>
                        </small>
                    </div>
                    <p class="mb-1 border-bottom fs-3"  style="text-align:justify;">
                        ${ post[0].body }
                    </p>
                    <i class="bi bi-hand-thumbs-up"></i><span id="likes">${0}</span>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control"
                            placeholder="Deja tu comentario"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                            <i class="bi bi-send"></i>
                        </button>
                    </div>
                `;
                this.lp.html(html);
            }).catch( err => console.error( "Error al abrir la pulicación : ",err ));
    },
    postHTMLLoad : function(post){
        return `
                <div class="w-100 border-bottom">
                    <h5 class="mb-1">${ post[0].title }</h5>
                    <small class="text-muted">
                        <i class="bi bi-calendar-week"></i> ${ post[0].fecha } | 
                        <i class="bi bi-person-circle"></i> ${ post[0].name }
                    </small>
                    <p class="bm-1 border-bottom fs-3" style="text-align:justify;">
                        ${ post[0].body }
                    </p>
                    <i class="bi bi-hand-thumbs-up"></i> <span id="likes">${ 0 }</span>
                    <p class="float-end">
                        <span id="comentarios"><i class="bi bi-chat-right-dots"></i> ${ 0 } comentarios</span>
                    </p>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" ${ this.user.sv ? '' : ' disabled readonly '} 
                            placeholder="${ this.user.sv ? 'Deja tu comentario' : 'Regístrate para poder hacer comentarios' }" 
                            name="comment" id="comment"
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="app.saveComment(${ post[0].id });">
                            <i class="bi bi-send"></i>
                        </button>
                    </div>
                </div>
            `;
    },
    confirmation : async function(event, pid){
        const conf = confirm("Se eliminará la publicación así como sus comentarios en caso de que los haya. ¿Desea continuar?");
        if(conf){
            let del = await fetch(this.routes.deletepost + "&pid=" + pid);
            let resp = await del.json();

            if(resp){
                alert("Se ha borrado la publicación");
                return location.reload();
            }else{
                alert("Pipipipipi");
                return location.reload();
            }      
        }
    },
    saveComment(pid){
        const datos = new FormData();
        datos.append('pid',pid);
        datos.append("comment",$("#comment").val());
        datos.append('_sc',"");
        fetch(this.routes.savecomment,{
            method:"POST",
            body: datos
        }).then( () => {
            $("#comment").val("");
        }).catch( err => console.error( "Hay un error: ", err));
    },
    openV(event, post){
        console.log("here");
        event.preventDefault();
        const postM = document.getElementById('postM');
        let html = `<div class="modal fade" id="modBody-${post.id}"" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${ post[0].title }</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            ${ post[0].body }
                            </div>
                            <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;
                    postM.innerHTML = html;

        /*getPostContent(postid)
            .then((content)=> {
                postM.innerHTML = content;
                $('#postModal').modal('show');
            })
            .catch((error) => { console.error(error); });*/
    },
}