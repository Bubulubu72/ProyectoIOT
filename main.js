const dotenv = require('dotenv')
dotenv.config();

const express = require('express')

const port = process.env.PORT || 4200;
const path = require('path')

const userRouter = require('./Routes/User-route')
const loginRouter = require('./Routes/login-route')

const app = express();

app.use(express.static(path.join(__dirname, 'Public')))
app.use(express.json());

app.use('/user', userRouter)
app.use('/user/login', loginRouter)

app.listen(port, ()=> console.log("running on port " + port));


