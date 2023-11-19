const mongoose = require("mongoose")
const config = require('../Config/configuracion')

//console.log(config);

mongoose.connect(config.dbUrl(), {
    useNewUrlParser:true
}).then(() => {
    console.log("Conected to db");
}).catch(err => {
    console.log("Not connected to db", err);
});

//Modelos en Mayuscula#1

module.exports = {mongoose}