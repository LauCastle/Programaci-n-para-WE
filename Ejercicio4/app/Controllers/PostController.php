<?php

    namespace Controllers;

    use Models\posts;
    use Controllers\auth\LoginController as LoginController;

    class PostController {

        private $userId;
        private $title;
        private $body;

        public function __construct(){
            $ua = new LoginController();
            $ua->sessionValidate();
            $this->userId = $ua->id;
        }

        public function getPosts($limit="",$pid = ""){
            $posts = new posts();
            $result = $posts->select(['a.id','a.title','a.body','date_format(a.created_at,"%d/%m/%Y") as fecha','b.name'])
                            ->join('user b','a.userId=b.id')
                            ->where( $pid != "" ? [['a.id',$pid]] : [] )
                            ->orderBy([['a.created_at','DESC']])
                            ->limit($limit)
                            ->get();
                            
            return $result;
        }

        public function newPost($datos){
            $post = new posts();
            $post->valores = [null,$datos['uid'],$datos['title'],$datos['body']];
            $result = $post->create();
            return;
            die;
        }

        public function getMyPosts($uid){
            $posts = new posts();
            $result = $posts->where([['userId',$this->userId]])->get();
            return $result;                
        }

        public function deletePost($pid){
            $deletePost = new posts();
            $result = $deletePost->where([['id',$pid]])->deletePost();
            return $result;                
        }

        public function editPost($postId, $title, $body) {
            // Obtener la publicación a editar utilizando el ID ($postId)
            $postId = new posts();
            // Actualizar los campos de título y texto con los valores proporcionados ($title y $body)
            $time = date('Y-m-d H:i:s');
            // Establecer el campo updated_at con la fecha actual
            $result = $post->where([['id', $postId]])->update(['title'=> $title, 'body'=> $body, 'time'=>$time]);
            // Guardar los cambios en la base de datos
            return $result;
            // Retornar una respuesta apropiada, por ejemplo, un mensaje de éxito o un código de estado HTTP
        }
          
    }