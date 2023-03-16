const app ={
    routes: {
        inisession : "/resources/views/auth/login.php",
        login: "/app/app.php",
    },
    view : function(route){
        location.replace(this.routes[route]);
    }
}