const app = {
    urlPosts : "https://jsonplaceholder.typicode.com/posts",

    cargarPosts : function(){
        //const cont = document.querySelector("#content");
        const cont = $("#content");
        cont.css("width","100%");
        cont.addClass("mx-auto mt-5");
        let html = "";
        fetch(this.urlPosts)
            .then(resp => resp.json())
            .then(posts => {
                for(let post of posts){
                    //let autor 
                    html += `
                    <div class="card text-center">
                    <div class="card-header">
                        ${post.tittle}
                    </div>
                    <div class="card-body">
                        <p class="card-text">${post.body}</p>
                    
                    </div>
                    <div class="card-footer text-muted">
                        <a href="#" class="btn btn-primary>Like</a>
                    </div>
                    </div>
                    `;
                    //cont.innerHTML = html;
                    cont.html(html);
                }
            }).catch( err => console.error(err));
    }
}
window.onload = function(){
    app.cargarPosts();
}