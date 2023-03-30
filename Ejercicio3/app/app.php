<?php
    namespace app;

    require_once "./autoloader.php";
    use Controllers\auth\LoginController as LoginController;

    if(!empty($_POST)){
        //******LOGIN */
        $login = in_array('_login', array_keys(filter_input_array(INPUT_POST)));
        if($login){
            $datos = filter_input_array(INPUT_POST,FILTER_SANITIZE_SPECIAL_CHARS);
            $userLogin = new LoginController();
            print_r($userLogin->userAuth($datos));
        }
    }
    if(!empty($_GET)){
        //******LOGOUT */
        $logout = in_array('_logout', array_keys(filter_input_array(INPUT_GET)));
        if($logout){
            $userLogout = new LoginController();
            $userLogout->logout();
            header('Location: /resources/views/home.php');
        }
    }