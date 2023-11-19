let actual = 1;
let objetosPagina;

let AdminToken = {};

async function loadBooks(queryParams = "", header){
    let data = await fetch("/api/libros" + queryParams,{
        method: 'GET',
        headers: header
    })

    let temp = await data.json();
    let books = temp[0];
    let administrator = temp[1];

    if(administrator){
        mi_cuenta.innerHTML = /*HTML*/` Admin`

        cambios.innerHTML = /*HTML*/``

        divider.innerHTML = /*HTML*/`
            <a class="btn dropdown-item" href="../html/Productos.html">Mostrar Libros</a>
            <a class="btn dropdown-item" href="../html/Users.html">Mostrar Usuarios</a>
        `
        console.log("Admin");

    }
    else{
        mi_cuenta.innerHTML = /*HTML*/` Invitado`

        cambios.innerHTML = /*HTML*/`
            <button type="button" class="btn dropdown-item" data-toggle="modal" data-target="#ingresar"> Ingresar</button>
            <button type="button" class="btn dropdown-item" data-toggle="modal" data-target="#Registro"> Registro</button>
            <button type="button" class="btn dropdown-item" data-toggle="modal" data-target="#admin"> Admin</button>
        `

        divider.innerHTML = /*HTML*/``

        elbody.innerHTML = /*HTML*/`
        <tr>
            <th></th>
            <td>Wow que vacio, Accede a tu cuenta para mostrar tus favoritos</td>
        </tr>
        `

        console.log("Invitado");
    }

    ////////////
    //pagiando
    const max_products = 3

    let totalLibros = books.length;
    let totalPaginas = Math.ceil(totalLibros / max_products);

    let inicio = (actual - 1) * max_products;
    let fin = inicio + max_products;
    objetosPagina = books.slice(inicio, fin);

    //Libors Carga
    libros.innerHTML = objetosPagina.map( p => /*HTML*/`
    <div class="col-md-4" >
        <div class="item-box-blog">
            <div class="item-box-blog-image">
                <div class="item-box-blog-date bg-blue-ui white"> <span class="mon">${p.publicationDate.split("T")[0]}</span> </div>
                <figure> <img alt="Por confirmar" src="${p.imageUrl}"></figure>
            </div>
            <div class="item-box-blog-body">
                <div class="item-box-blog-heading">
                    <a href="#" tabindex="0">
                        <h5>${p.title}</h5>
                    </a>
                </div>
                <div class="item-box-blog-data" style="padding: px 15px;">
                    <p><i class="fa fa-user-o"></i>Autor: ${p.author} </p>
                    <p><i class="fa fa-comments-o">categoria: ${p.category}</i></p>
                </div>
                <div class="item-box-blog-text">
                    <p>${p.description}</p>
                </div>
                <div class="item-box-blog bg-blue-ui white"> <span class="mon">Calificacion: ${p.rate} 🌟</span> </div>
            </div>
        </div>
    </div>
    `).join('')

    ////////////
    let botonLogin = document.querySelector("#Login")
    botonLogin.addEventListener("click", function(event){
        event.preventDefault();
        checkUser();
    })

    ////////////
    let botonLoginAdmin = document.querySelector("#LoginAdmin")
    botonLoginAdmin.addEventListener("click", function(event){
        event.preventDefault();
        checkAdmin();
    })

    ////////////
    let botonRegister = document.querySelector("#registrer")
    botonRegister.addEventListener("click", function(event){
        event.preventDefault();
        addUser();
    })

    ////////////

    let botonaddbook = document.querySelector("#Blibros")
    botonaddbook.addEventListener("click", function(event){
        event.preventDefault();
        addLibros();
    })



}

loadBooks()


async function checkUser(){
    let email = document.getElementById('form-groupCorreo').value;
    let password = document.getElementById('form-groupPassword').value;
    
    let user = {
        email,
        password
    }

    let data = await fetch('/api/libros/user/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })

    let token = await data.json()
    checkTypeUser(token.token)
}

async function checkTypeUser(token){
    let data = await fetch('/api/libros/user/login', {
        method: 'GET',
        headers: {
            "x-token": token
        }
    })

    let tmp = await data.json()

    let email = tmp[0];
    let validated = tmp[1];

    if (validated){
        mi_cuenta.innerHTML = /*HTML*/` ${email}`

        cambios.innerHTML = /*HTML*/``

        divider.innerHTML = /*HTML*/`
            <button type="button" class="btn dropdown-item" data-toggle="modal" data-target="#addBooks"> Agregar Libro</button>
        `
        elbody.innerHTML = /*HTML*/`
            <tr>
                <th></th>
                <td>Favoritos</td>
            </tr>
        `

        libros.innerHTML = objetosPagina.map( p => /*HTML*/`
        <div class="col-md-4" >
            <div class="item-box-blog">
                <div class="item-box-blog-image">
                    <div class="item-box-blog-date bg-blue-ui white"> <span class="mon">${p.publicationDate.split("T")[0]}</span> </div>
                    <figure> <img alt="Por confirmar" src="${p.imageUrl}"></figure>
                </div>
                <div class="item-box-blog-body">
                    <div class="item-box-blog-heading">
                        <a href="#" tabindex="0">
                            <h5>${p.title}</h5>
                        </a>
                    </div>
                    <div class="item-box-blog-data" style="padding: px 15px;">
                        <p><i class="fa fa-user-o"></i>Autor: ${p.author} </p>
                        <p><i class="fa fa-comments-o">categoria: ${p.category}</i></p>
                    </div>
                    <div class="item-box-blog-text">
                        <p>${p.description}</p>
                    </div>
                    <div class="item-box-blog-text" style="padding: p 15px;"> <button type="button" class="btn btn-info btn-md borderless addButton">Agregar</button> </div>
                    <br>
                    <div class="item-box-blog bg-blue-ui white"> <span class="mon">Calificacion: ${p.rate} 🌟</span> </div>
                </div>
                
            </div>
        </div>
        `).join('')



        checkFavoritos(3, objetosPagina, email);
        console.log("User");
    }
}

async function checkFavoritos(cantidad, p, email){
    let button = document.getElementsByClassName('addButton')
    for(let i = 0; i < button.length; i++){
        button[i].addEventListener("click", function(event){
            let buttonPress = event.target;
            for(let j = 0; j < cantidad; j++){
                if(buttonPress == button[j]){
                    addFavorito(p[j], email)
                }
            }
        })
    }

}

async function addFavorito(book, email){

    let fav= {
        email,
        'uuid': book.uuid
    }
    let data = await fetch('/api/libros/user/add', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(fav)
    })
}


async function checkAdmin(){
    let email = document.getElementById('admin-groupCorreo').value;
    let password = document.getElementById('admin-groupPassword').value;

    if(email == 'admin@admin.com' && password == '12345'){
        AdminToken = {'x-auth': password}
        sessionStorage.estadoUser = 1;
        loadBooks('', AdminToken)
    }
}

////////////////////////////////////

function filtrarLibros(){
    let atributoSelect = document.querySelector("#atributoSelect")
    let searchValue = document.querySelector("#searchValue")
    //console.log(atributoSelect.value);
    //console.log(searchValue.value);
    if(atributoSelect.value != "")
      loadBooks("?"+atributoSelect.value+"="+searchValue.value)

}

function changeActive(n){
    let paginado = document.getElementsByClassName("page-item");

    if( n == 1){
        paginado[2].classList.remove("active")
        paginado[3].classList.remove("active")
        paginado[4].classList.remove("disabled")
        paginado[1].classList.add("active")
        paginado[0].classList.add("disabled")
        actual = 1
        loadBooks();
    }

    if(n == 2){
        paginado[0].classList.remove("disabled")
        paginado[1].classList.remove("active")
        paginado[3].classList.remove("active")
        paginado[4].classList.remove("disabled")
        paginado[2].classList.add("active")
        actual = 2
        loadBooks();
    }

    if(n == 3){
        paginado[0].classList.remove("disabled")
        paginado[1].classList.remove("active")
        paginado[2].classList.remove("active")
        paginado[3].classList.add("active")
        paginado[4].classList.add("disabled")
        actual = 3
        loadBooks();
    }

    if( n == 0 && !paginado[0].classList.contains("disabled")){
        changeActive(actual - 1)
    }

    if( n == 4 && !paginado[4].classList.contains("disabled")){
        changeActive(actual + 1)
    }

}

async function addLibros(){
    let title = document.getElementById("btitle").value
    let description = document.getElementById("bdesc").value
    let author = document.getElementById("bautor").value
    let category = document.getElementById("bcat").value
    let publicationDate = document.getElementById("bdate").value
    let imageUrl = document.getElementById("bimg").value
    let rate = document.getElementById("bcali").value

    let newBook = {
        "title": title,
        "description": description,
        "author": author,
        "category": category,
        "publicationDate": publicationDate,
        "imageUrl": imageUrl,
        "rate": Number(rate)
    }

    let data = await fetch("/api/libros", {
        method: 'POST',
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(newBook)
    })

    loadBooks();
    restaurarValores('addBooks');
}

function restaurarValores(str) {
    var modal = document.getElementById(str);
    var campos = modal.querySelectorAll("input[type='text']");
    var campos2 = modal.querySelectorAll("input[type='date']");
    var campos3 = modal.querySelectorAll("input[type='number']");

    campos.forEach(function(campo) {
      campo.value = campo.defaultValue;
    });

    campos2.forEach(function(campo) {
        campo.value = campo.defaultValue;
    });

    campos3.forEach(function(campo) {
        campo.value = campo.defaultValue;
      });

}

async function addUser(){
    let username = document.querySelector("#iusername").value
    let email = document.querySelector("#icorreo").value
    let password = document.querySelector("#ipassword").value

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

    loadBooks();
}
