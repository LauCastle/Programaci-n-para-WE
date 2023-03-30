const app ={
    routes: {
        inisession : "/resources/views/auth/login.php",
        ensession : "/app/app.php?_logout",
        login : "/app/app.php",
    },
    view : function(route){
        location.replace(this.routes[route]);
    }
}