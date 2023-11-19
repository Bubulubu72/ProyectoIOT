const router = require('express').Router()
const {Book} = require('../DB/Libros');
const nanoid = require('nanoid');
const { validateIsAdmin } = require('../Middlewares/validateDatos');

router.get('/', validateIsAdmin, async (req, res) =>{
    let books = []

    let data = await Book.getBook(req.query)
    books.push(data)
    let admon = req.isAdmin
    books.push(admon)

    res.send(books)
})

router.post('/', async (req, res) => {
    let {title, description, author, category, publicationDate, imageUrl, rate} = req.body

    let newBook = {
        uuid: nanoid.nanoid(), 
        title, 
        description, 
        author,
        category,
        publicationDate,
        imageUrl,
        rate
    }

    if(category == ''){
        newBook.category = "Sin categoria"
    }

    if(imageUrl == ''){
        newBook.imageUrl = undefined;
    }

    if(rate > 5 || rate < 0 ){
        newBook.rate = undefined
    }

    Book.addBook(newBook)
    res.status(201).send("Creado Completo")
})

router.put('/:uuid', async (req, res) => {
    
    let book = await Book.getBookById(req.params.uuid);

    if(!book){
        res.status(404).send({error: "Book not found"})
        return
    }

    let uuid = req.params.uuid
    let {title, description, author, category, publicationDate, imageUrl, rate} = req.body;

    let updateBook = {
        title, 
        description, 
        author,
        category,
        publicationDate,
        imageUrl,
        rate
    }

    //console.log(updateBook);

    let changeBook = await Book.updateBook(uuid, updateBook);
    res.send(changeBook);
})

router.delete('/:uuid', async (req, res) => {
    let uuid = req.params.uuid
    let book = await Book.deleteBook(uuid);
    if(book){
        res.send(book)
    }else{
        res.status(404).send({error: "No existe"})
    }

})

module.exports = router
