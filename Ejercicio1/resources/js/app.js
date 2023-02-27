const app={
    
    urlDatos:"/resources/data/datos.json",
    filtro: "todos",

    cargarFichas: function(){
        const fichas = document.querySelector("#fichas");
        let html = "";
        fetch(this.urlDatos)
            .then( response => response.json())
            .then( autos => {
                for( auto of autos){
                    if( auto.tipo === this.filtro || this.filtro === "todos"){
                        html += `
                            <div class="ficha">
                                <img src="./resources/img/${auto.foto}" alt="${ auto.marca }">
                                <div class="datos">
                                    <h3>${auto.marca}</h3>
                                    <span>${auto.modelo}</span>
                                    <span>${auto.anio}</span>
                                    <br>
                                    <small> ${auto.motor.potencia},
                                            ${auto.motor.kilometraje}, 
                                            ${auto.desplazamiento}
                                    </small>
                                </div>
                            </div>
                        `;
                    }
                }
                fichas.innerHTML = html;
            }).catch(err => console.error(err))
        
    }
}
window.onload = function(){
    app.cargarFichas();

    const mitem = documente.querySelectorAll("a.mitem");

    mitem.forEach(menuItem => {
        menuItem.addEventListener("click", event => {
            event.preventDefault();
            app.filtro = menuItem.getAttribute("data-tipo-auto");
            app.cargarFichas();
        })
    })
}