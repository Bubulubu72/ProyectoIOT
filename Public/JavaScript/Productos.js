let pod;

async function loadBooks(){
    let data = await fetch("/api/libros",{
        method: 'GET',
        headers:{
            "x-auth": 12345
        }
    })

    let temp = await data.json();

    let books = temp[0];
    pod = [...books];
    let administrator = temp[1];

    table.innerHTML = books.map( p => /*HTML*/`
        <tr>
            <td>${p.uuid}</td>
            <td>${p.title}</td>
            <td>${p.description}</td>
            <td>${p.author}</td>
            <td>${p.publicationDate.split("T")[0]}</td>
            <td>${p.category}</td>
            <td>${p.rate}</td>
            <td><img src="${p.imageUrl}" class="img-fluid icard" alt="${p.imageUrl}"></td>

            <td>
                <button type="button" class="btn btn-info btn-md borderless editButton" data-toggle="modal" data-target="#editarProdcuto">
                    <span class="fa fa-pencil-alt">Editar</span>
                </button>
                <div class="p-2"></div>
                <button type="button" class="btn btn-danger btn-md borderless delButton" data-toggle="modal">
                    <span class="fa fa-trash-alt">Eliminar</span>
                </button>
            </td>


            </tr>
        `
    ).join("")



    ///////////////////
    checkAdd();

    ///////////////////
    checkEdit(books.length, books)

    ///////////////////
    checkDel(books.length, books)
}

loadBooks();





//////////////////////////////////////////////

async function checkEdit(cantidad, p){
    let button = document.getElementsByClassName('editButton')
    for(let i = 0; i < button.length; i++){
        button[i].addEventListener("click", function(event){
            let buttonPress = event.target;
            for(let j = 0; j < cantidad; j++){
                if(buttonPress == button[j]){

                    editarProdcuto.innerHTML = /*HTML*/`
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                                <div class="modal-header">
                                        <h5 class="modal-title">Editar Prodcuto</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                </div>
                            <div class="modal-body">
                                <form action="">
                                    <div class="form-group pl-3 pr-5">
                                        <label for="form-groupTitle">Title</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="form-Title"
                                                placeholder="${p[j].title}" >
                                        </div>
                                    </div>

                                    <div class="form-group pl-3 pr-5">
                                        <label for="form-groupDesc">Description</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="form-description"
                                                placeholder="${p[j].description}" >
                                        </div>
                                    </div>

                                    <div class="form-group pl-3 pr-5">
                                        <label for="form-groupAuthor">Author</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="form-author"
                                                placeholder="${p[j].author}" >
                                        </div>
                                    </div>

                                    <div class="form-group pl-3 pr-5">
                                        <label for="form-groupPd">Publication Date</label>
                                        <div class="input-group">
                                            <input type="date" class="form-control" id="form-pd"
                                                placeholder="${p[j].publicationDate}" >
                                        </div>
                                    </div>

                                    <div class="form-group pl-3 pr-5">
                                        <label for="form-groupCat">Category</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="form-category"
                                                placeholder="${p[j].category}" >
                                        </div>
                                    </div>

                                    <div class="form-group pl-3 pr-5">
                                        <label for="form-groupRat">Rate</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="form-rate"
                                                placeholder="${p[j].rate}" >
                                        </div>
                                    </div>

                                    <div class="form-group pl-3 pr-5">
                                        <label for="form-groupImage">Imagen</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="form-image"
                                                placeholder="${p[j].imageUrl}">
                                        </div>
                                    </div>

                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" onclick="changeBook(${j})" data-dismiss="modal">Save</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                    `
                }
            }
        })
    }
}

async function changeBook(p){
    let title = document.getElementById("form-Title").value
    let desc = document.getElementById("form-description").value
    let author = document.getElementById("form-author").value
    let pd = document.getElementById("form-pd").value
    let categoria = document.getElementById("form-category").value
    let rate = document.getElementById("form-rate").value
    let imagen = document.getElementById("form-image").value

    if(!title){
       title = pod[p].title
    }

    if(!desc){
        desc = pod[p].description
    }

    if(!author){
        author = pod[p].author
    }

    if(!pd){
        pd = pod[p].publicationDate
    }

    if(!categoria){
        categoria = pod[p].category
    }

    if(!rate){
        rate = pod[p].rate
    }

    if(!imagen){
        imagen = pod[p].imageUrl
    }

    let llamada = {
        "title": title,
        "description": desc,
        "author": author,
        "publicationDate": pd,
        "category": categoria,
        "rate": rate,
        "imageUrl": imagen,
    }

    let data = await fetch("/api/libros/" + pod[p].uuid, {
        method: 'PUT',
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(llamada)
    })

    loadBooks();
}

//////////////////////////////////////////////

async function checkAdd(){
    let botonBookAdd = document.querySelector("#addBook")
    botonBookAdd.addEventListener("click", function(event){
        crearBook.innerHTML = /*HTML*/`
        <div class="modal-dialog " role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Agregar Libro</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group">
                                <label for="form-groupTitle">Titulo</label>
                                <input type="text" class="form-control" id="btitle"placeholder="Titulo" pattern="[a-zA-Z\s]+" required>
                        </div>
                        <div class="form-group">
                            <label for="form-groupDescripcion">Descripcion</label>
                            <input type="text" class="form-control" id="bdesc" placeholder="Descripcion" required>
                        </div>
                        <div class="form-group">
                            <label for="form-groupAutor">Autor</label>
                            <input type="text" class="form-control" id="bautor" placeholder="Autor" required>
                        </div>
                        <div class="form-group">
                            <label for="form-groupCategoria">Categoria</label>
                            <input type="text" class="form-control" id="bcat" placeholder="Categoria" required>
                        </div>
                        <div class="form-group">
                            <label for="form-groupDate">Fecha</label>
                            <input type="date" class="form-control" id="bdate" required>
                        </div>
                        <div class="form-group">
                            <label for="form-groupImagen">Imagen URL</label>
                            <input type="text" class="form-control" id="bimg" placeholder="Url de Imagen">
                        </div>
                        <div class="form-group">
                            <label for="form-groupRate">Calificaion</label>
                            <input type="number" class="form-control" id="bcali" placeholder="Califica el libro | 0-5"
                                min="0" max="5">
                        </div>
                        <br>
                        <div class="form-group px-4">
                            <button type="submit" class="btn btn-block btn-success" data-dismiss="modal" onclick="addBook()">
                                Agregar Libro</button>
                        </div>
                        <div class="form-group px-4">
                            <button type="submit" class="btn btn-block btn-danger" data-dismiss="modal"> Cancelar</button>
                        </div>

                    </form> 
                </div>
            </div>
        </div>
        `
    })
}

async function addBook(){
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
}

//////////////////////////////////////////////
async function checkDel(cantidad, p){
    let button = document.getElementsByClassName('delButton')
    for(let i = 0; i < button.length; i++){
        button[i].addEventListener("click", function(event){
            let buttonPress = event.target;
            for(let j = 0; j < cantidad; j++){
                if(buttonPress == button[j]){
                    deleteBook(j)
                }
            }
        })
    }
}

async function deleteBook(p){
    let book = pod[p];
    let data = await fetch("/api/libros/" + book.uuid, {
        method: 'DELETE'
    })

    loadBooks();
}