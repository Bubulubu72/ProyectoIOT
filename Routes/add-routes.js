const router = require('express').Router();
const nanoid = require('nanoid')
const {User} = require('../DB/User');
const { Book } = require('../DB/Libros');


router.post('/', async (req, res) => {
    let {email, uuid} = req.body;
    
    let user = await User.getUsersByEmail(email);
    if(!user){
        res.status(404).send({error: "user not found"})
        return
    }

    let book = await Book.getBookById(uuid)
    if(!book){
        res.status(404).send({error: "Book not found"})
        return
    }

    user.favoritos += book._id
    let changedUsder = await User.upadteUser(user.uuid ,user)
    res.send(changedUsder)
})  


module.exports = router