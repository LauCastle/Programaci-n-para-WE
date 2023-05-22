const app_myposts = {
  url: "/app/app.php",
  mp: $("#my-posts"),

  getMyPosts: function (uid) {
    let html = `<tr><td colspan="3">Aún no tiene publicaciones</td></tr>`;
    this.mp.html("");
    fetch(this.url + "?_mp&uid=" + uid)
      .then((resp) => resp.json())
      .then((mpresp) => {
        if (mpresp.length > 0) {
          html = "";
          for (let post of mpresp) {
            html += `<tr>
                        <td>${post.title}</td>
                        <td>${post.created_at}</td>
                        <td>
                            <a href="#" class="link-primary" data-bs-toggle="modal" data-bs-target="#modBody-${post.id}" onclick="app.openV(event, ${post})"><i class="bi bi-eye"></i></a>
                            <a href="#" class="link-primary mx-2" onclick="app.editPost(event, ${post.id}, ${JSON.stringify(post)})"><i class="bi bi-pencil-square"></i></a>
                            <a href="#" class="link-success" onclick=""><i class="bi bi-toggle-on"></i></a>
                            <a href="#" class="link-secondary mx-2" onclick="app.confirmation(event, ${post.id})"><i class="bi bi-trash"></i></a>
                        </td>
                    </tr>`;
          }
        }
        this.mp.html(html);
      })
      .catch((err) => console.error(err));
  },

  editPost: function (event, postId, post) {
    event.preventDefault();
    const postM = document.getElementById('postM');

    // Obtener los datos de la publicación a editar, puedes hacer una solicitud al servidor o utilizar los datos disponibles en la página
    const editTitle = post.title;
    const editBody = post.body;

    // Construir el formulario de edición
    const formHTML = `
      <form id="editForm">
        <div class="mb-3">
          <label for="editTitle" class="form-label">Título</label>
          <input type="text" class="form-control" id="editTitle" value="${editTitle}" required>
        </div>
        <div class="mb-3">
          <label for="editBody" class="form-label">Texto</label>
          <textarea class="form-control" id="editBody" rows="4" required>${editBody}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">Guardar cambios</button>
      </form>
    `;

    postM.innerHTML = formHTML;
    $('#postModal').modal('show');

    // Agregar evento de envío del formulario
    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', (event) => this.saveChanges(event, postId));
  },

  saveChanges: function (event, postId) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const editTitle = document.getElementById('editTitle').value;
    const editBody = document.getElementById('editBody').value;

    // Obtener la fecha actual
    const currentDate = new Date().toISOString();

    // Enviar los cambios al servidor, puedes hacer una solicitud utilizando fetch o utilizar la lógica correspondiente para guardar los cambios en tu sistema

    // Cerrar el diálogo flotante
    $('#postModal').modal('hide');
  },
};
