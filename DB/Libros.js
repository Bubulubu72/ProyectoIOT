const {mongoose} = require('./connectDB');

const bookSchema = mongoose.Schema({
    uuid:{
        type: String,
        unique:true,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    publicationDate:{
        type: Date,
        required: true
    },
    imageUrl:{
        type: String,
        default: "https://elconta.mx/wp-content/uploads/2017/09/por-definir.png"
    },
    rate:{
        type: Number,
        default: 0
    }

})

// 

bookSchema.statics.getBook = async function(params) {
    const query = {};
  
    if (params.date) {
      const date = new Date(params.date);
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  
      query.publicationDate = {
        $gte: startOfDay,
        $lt: endOfDay
      };
    }

    if (params.title) {
        query.title = { $regex: params.title, $options: 'i' };
    }
    
    if (params.author) {
        query.author = { $regex: params.author, $options: 'i' };
    }
    
    if (params.description) {
        query.description = { $regex: params.description, $options: 'i' };
    }

    if (params.category) {
        query.category = { $regex: params.category, $options: 'i' };
    }
    

    let projection = {_id:1, uuid: 1, title:1, description:1, author:1, category:1, imageUrl:1, publicationDate:1, rate:1};
    const books = await Book.find(query, projection);
    console.log("Funcion GetBooks");
    return books;
}

bookSchema.statics.getBookById = async (uuid) =>{
    let doc = await Book.findOne({uuid})
    //console.log("Funcion get One Book");
    return doc
}

bookSchema.statics.addBook = async (datos) =>{
    let newBook = Book(datos)
    console.log("Funcion addBook");
    return await newBook.save()
}

bookSchema.statics.updateBook = async (uuid, newData) =>{
    let updateBook = await Book.findOneAndUpdate({uuid}, {$set: newData}, {new: true})
    console.log("Funcion Actualizar Libro");
    return updateBook
}

bookSchema.statics.deleteBook = async (uuid) =>{
    let deleted = await Book.findOneAndDelete({uuid})
    console.log("Funcion Delete Book");
    return deleted
}

// 

const Book = mongoose.model('Book', bookSchema);

// book.getBook()

// book.deleteBook('Pruebas2')

// Book.addBook(
//     {
//         uuid: 'Pruebas',
//         title: "not my day",
//         description: "Descipcion ",
//         author: 'yo mero caguamero',
//         category: ''
//         publicationDate: '02/05/2023',
//         imageUrl: '',
//         rate: 2
//     }
// )

// Book.addBook(
//     {
//         uuid: 'Pruebas2',
//         title: "Mis Pruebas de nada",
//         description: "Descipcion no tan exacta como siemrpe",
//         author: 'yo mero caguamero2',
//         publicationDate: '02/02/2023'
//     }
// )

// book.getBook()

module.exports = {Book};