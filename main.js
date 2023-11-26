const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
//const sesion = require('express-session');

const port = process.env.PORT || 4200;
const path = require('path');

const userRouter = require('./Routes/User-route');
const loginRouter = require('./Routes/login-route');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

// app.use( sesion({
//     secret: process.env.SECRET_SESION,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {secure: false},
// }))

app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.json());

app.use('/user', userRouter);
app.use('/user/login', loginRouter);

app.get('/LoggedUser', (req, res) => {
    const user = req.cookies;
    //console.log(user);
    res.send(user)
})

app.get('/LogOut', (req, res) => {
    res.clearCookie('userToken')
    //console.log(user);
    res.send('delete cookie')
})

app.listen(port, ()=> console.log("running on port " + port));


