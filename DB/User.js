const {mongoose} = require('./connectDB')
const { Book } = require('./Libros')

const nanoid = require('nanoid')

let userSchema = mongoose.Schema({
    uuid: {
        type: String,
        unique:true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favoritos: [{type: mongoose.Types.ObjectId, ref: 'Book' }]
})

//User.getUsers({}, true)
userSchema.statics.getUsers = async (params) =>{
    let projection = {_id: 0, uuid: 1, username: 1, email:1, favoritos: 1, password:1 }

    const query = {};

    if(params.username){
        query.username = { $regex: params.username, $options: 'i' }
    }

    if(params.email){
        query.email = { $regex: params.email, $options: 'i' }
    }

    let data = await User.find(query, projection)
                            .populate({
                                path:'favoritos',
                                model: 'Book',
                                select: 'uuid title author, category'
                            })
    console.log("Funcion getUsers");
    return data
}

userSchema.statics.getUsersById = async (uuid) =>{
    let doc = await User.findOne({uuid}, 
        {_id:0, uuid: 1, email:1, username:1, favoritos:1})
    console.log(doc);
    return doc
}

userSchema.statics.getUsersByEmail = async (email) =>{
    let doc = await User.findOne({email}, 
        {_id:0, uuid: 1, email:1, username:1, favoritos:1})
    //console.log(doc);
    return doc
}

userSchema.statics.addUser = async (newUser) => {
    let newUserDb = User(newUser);
    console.log("Funcion addUser");
    return await newUserDb.save();
}

userSchema.statics.upadteUser = async function(uuid, userdata){
    //findOneAndUpdate{ buscar, {$set: datos}, {new:true}}
    //let projection = {_id:0, username:1, email:1}
    let data = await User.findOneAndUpdate({uuid}, {$set: userdata}, {new: true})
    console.log("Funcion UpdateUser");
    return data
}

userSchema.statics.deleteUser = async (uuid) =>{
    let user = await User.findOneAndDelete({uuid})
    console.log("deleteUser");
    return user;
}

let User = mongoose.model('user', userSchema);

//upadteUser("test4@algo.com", {"username": "Bubu"})

//getUsersByEmail("test4@algo.com")

//getUsers({email:"test4@algo.com"});
//getUsers({email: new RegExp('test', 'i')});

// addUser({email: "test4@algo.com", username: "test2", password: "1234"})


module.exports = {User}