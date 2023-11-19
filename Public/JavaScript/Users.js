

async function loadUser(queryParams = ''){
    let data = await fetch("/api/libros/user" + queryParams,{
        method: 'GET',
        headers:{}
    })

    let users = await data.json();
    //console.log(users);

    table.innerHTML = users.map( p => /*HTML*/`
        <tr>
            <td>${p.uuid}</td>
            <td>${p.username}</td>
            <td>${p.email}</td>
            <td>${p.password}</td>
        </tr>
        `
    ).join("")

    // <td>${p.favoritos}</td>

    ///////////////////
    checkAdd();

    ///////////////////
    checkEdit();

    ////////////////////
    checkDel();

}

loadUser();

//////////////////////////////////////////////
function filtrarUser(){
    let atributoSelect = document.querySelector("#atributoSelect")
    let searchValue = document.querySelector("#searchValue")
    //console.log(atributoSelect.value);
    //console.log(searchValue.value);
    if(atributoSelect.value != "")
      loadUser("?"+atributoSelect.value+"="+searchValue.value)
}

//////////////////////////////////////////////
async function checkAdd(){
    let botonUserAdd = document.querySelector("#agrUser")
    botonUserAdd.addEventListener("click", function(event){
        crearUser.innerHTML = /*HTML*/`
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                    <div class="modal-header">
                            <h5 class="modal-title">Agregar Usuario</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group pl-3 pr-5">
                            <label for="form-groupUsrNam">Username</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="aUsrName"
                                    placeholder="Username" >
                            </div>
                        </div>
        
                        <div class="form-group pl-3 pr-5">
                            <label for="form-groupEmail">Email</label>
                            <div class="input-group">
                                <input type="Email" class="form-control" id="aMail"
                                    placeholder="Email" >
                            </div>
                        </div>
        
                        <div class="form-group pl-3 pr-5">
                            <label for="form-groupPassword">Password</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="aPassword"
                                    placeholder="Password" >
                            </div>
                        </div>
        
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" onclick="agregarUser()" data-dismiss="modal">Add</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
        `
    })

}

async function agregarUser(){
    let username = document.querySelector("#aUsrName").value
    let email = document.querySelector("#aMail").value
    let password = document.querySelector("#aPassword").value

    let newUSer = {
        username,
        email,
        password
    }

    //console.log(newUSer);
    let data = await fetch("/api/libros/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(newUSer)
    })

    loadUser();
}

//////////////////////////////////////////////
async function checkEdit(){
    let botonUseredit = document.querySelector("#agrAdd")
    botonUseredit.addEventListener("click", function(event){

        editarUser.innerHTML = /*HTML*/`
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                    <div class="modal-header">
                            <h5 class="modal-title">Editar Usuario</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group pl-3 pr-5">
                            <label for="form-groupUid">UUID</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="buuid"
                                    placeholder="Username" >
                            </div>
                        </div>
        
                        <div class="form-group pl-3 pr-5">
                            <label for="form-groupMail">Username</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="bemail"
                                    placeholder="Cambiar username" >
                            </div>
                        </div>
        
                        <div class="form-group pl-3 pr-5">
                            <label for="form-groupPass">Password</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="bpassword"
                                    placeholder="cambiar Password" >
                            </div>
                        </div>
        
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" onclick="editUser()" data-dismiss="modal">Editar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
        `

    })
}

async function editUser(){
    let uuid = document.querySelector("#buuid").value
    let username = document.querySelector("#bemail").value
    let password = document.querySelector("#bpassword").value

    let edited = {
        username,
        password
    }

    let data = await fetch("/api/libros/user/" + uuid, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(edited)
    })

    loadUser();
}

//////////////////////////////////////////////
async function checkDel(){
    let botonUserDel = document.querySelector("#delUsr")
    botonUserDel.addEventListener("click", function(event){
        delUser.innerHTML = /*HTML*/`
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                    <div class="modal-header">
                            <h5 class="modal-title">Eliminar Usuario</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group pl-3 pr-5">
                            <label for="form-groupUsrID">UUID</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="cUsrName"
                                    placeholder="UUID" >
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" onclick="deleteUser()" data-dismiss="modal">Eliminar</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                </div>
            </div>
        </div>
        `
    })
}

async function deleteUser(){
    let uuid = document.querySelector("#cUsrName").value

    let data = await fetch("/api/libros/user/" + uuid, {
        method: "DELETE",
        headers: {},
    })

    loadUser();
}