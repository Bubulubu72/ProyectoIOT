require('dotenv').config({path: '../.env'})

const mongoose = require("mongoose")
const dbConfig = require('../config/configuracion')

mongoose.connect(dbConfig.dbUrl(), {
    useNewUrlParser:true
}).then(() => {
    console.log("Conected to db");
}).catch(err => {
    console.log("Not connected to db", err);
});

module.exports = {mongoose}