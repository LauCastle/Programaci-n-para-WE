<?php
    namespace Controller\auth;
    
    use Models\user;

    class LoginController {
        public $sv; //sesión válida
        public $name;
        public $id; 
        public function __construct(){
            $this->sv = false;
        }
        public function userAuth($datos){
            $user = new user();

            $result = $user->where([["username",$datos["username"]],
                                    ["passwd",$datos["passwd"]]])->get();
            if(count(json_decode($result)) > 0){
                //se registra sesión
                return $this->sessionRegister($datos);
                //return con algo aqui
            }else{
                //destruir toda sección existente
                echo json_encode(["r"=>false]);
            }
        }

        private function sessionRegister($datos){
            session_start();
            $_SESSION['IP'] = $_SERVER['REMOTE_ADDR'];
            $_SESSION['username'] = $datos['username'];
            $_SESSION['passwd']= $datos['passwd']; 
            session_write_close();
            return json_encode(["r"=> true]);

        }

        private function sessionDestroy(){
            session_start();
            $_SESSION = [];
            session_destroy();
            session_write_close();
            $this->sv = false;
            $this->name = "";
            $this->id = "";

            return;
        }
    }