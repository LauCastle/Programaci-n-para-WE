<?php

namespace app;

require_once "autoloader.php";
use Controllers\auth\LoginController as LoginController;
use Controllers\PostController as PostController;

if(!empty($_POST)){

    //*************LOGIN */
    $login = in_array('_login',array_keys(filter_input_array(INPUT_POST)));
    if($login){
        $datos = filter_input_array(INPUT_POST,FILTER_SANITIZE_SPECIAL_CHARS);
        $userLogin = new LoginController();
        print_r($userLogin->userAuth($datos));
    }

    //*************Registrarse */
    $register = in_array('_register',array_keys(filter_input_array(INPUT_POST)));
    if($register){
        $datos = filter_input_array(INPUT_POST,FILTER_SANITIZE_SPECIAL_CHARS);
        $userRegister = new LoginController();
        print_r($userRegister->userRegister($datos));
    }

    //***************GUARDAR NUEVA PUBLICACIÓN */
    $gp =  in_array('_gp',array_keys(filter_input_array(INPUT_POST)));
    if($gp){
        $datos = filter_input_array(INPUT_POST,FILTER_SANITIZE_SPECIAL_CHARS);
        $post = new PostController();
        $post->newPost($datos);
        header('Location: /resources/views/autores/myposts.php');
    }

    //**********************Crear comentarios */
    $sc = in_array('_sc',array_keys(filter_input_array(INPUT_POST)));
    if($sc){
        $datos = filter_input_array(INPUT_POST,FILTER_SANITIZE_SPECIAL_CHARS);
        $cambio = new PostController();
        print_r($cambio->guardarCamb($datos));
    }

    //**** Para guardar los nuevos comentarios */
    $gc = in_array('_gc',array_keys(filter_input_array(INPUT_POST)));
    if($gc){
        $datos = filter_input_array(INPUT_POST,FILTER_SANITIZE_SPECIAL_CHARS);
        $comment = new PostController();
        print_r($comment->saveComment($datos));
    }
}
if(!empty($_GET)){
     //*************LOGOUT */
     $logout = in_array('_logout',array_keys(filter_input_array(INPUT_GET)));
     if($logout){
        $userLogout = new LoginController();
        $userLogout->logout();
        header('Location: /resources/views/home.php');
     }
     //******************CARGAR PUBLICACIONES PREVIAS */
    $pp = in_array('_pp',array_keys(filter_input_array(INPUT_GET)));
    if($pp){
        $post = new PostController();
        print_r($post->getPosts());
    }
    //******************CARGAR LA PUBLICACION MAS RECIENTE */
    $lp = in_array('_lp',array_keys(filter_input_array(INPUT_GET)));
    if($lp){
        $l = filter_input_array(INPUT_GET)["limit"];
        $lastpost = new PostController();
        print_r($lastpost->getPosts($l));
    }

    //******************CARGAR PUBLICACION SELECCIONADA*/
    $op = in_array('_op',array_keys(filter_input_array(INPUT_GET)));
    if($op){
        $pid = filter_input_array(INPUT_GET)["pid"];        
        $post = new PostController();
        print_r($post->getPosts(1,$pid));
    }
    //**********************CARGAR MIS PUBLICACIONES */
    $mp = in_array('_mp',array_keys(filter_input_array(INPUT_GET)));
    if($mp){
        $uid = filter_input_array(INPUT_GET)["uid"];
        $post = new PostController();
        print_r($post->getMyPosts($uid));
    }
    //**********************Contar comentarios */
    $cc = in_array('_cc',array_keys(filter_input_array(INPUT_GET)));
    if($cc){
        $pid = filter_input_array(INPUT_GET)["pid"];
        $post = new PostController();
        print_r($post->countPostComments($pid));
    }
    //**********************Borrar pubicaciones */
    $dp = in_array('_dp',array_keys(filter_input_array(INPUT_GET)));
    if($dp){
        $pid = filter_input_array(INPUT_GET)["pid"];
        $deletePost = new PostController();
        print_r($deletePost->deletePost($pid));
    }

}