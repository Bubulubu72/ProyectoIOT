let dbConfig = {
    user: "alejandro740521",
    password: "7ap3SW8yXX5OWC7m",
    dbName: "IOT",
    dbUrl: function (){
        return `mongodb+srv://${this.user}:${this.password}@cluster0.ui6e6mp.mongodb.net/${this.dbName}?retryWrites=true&w=majority`
    },
    jwtSecret: '724195'
}

module.exports = dbConfig;