const express = require('express')
const port = process.env.PORT || 3000;
const path = require('path')
const libRouter = require('./Routes/Lib-route')
const userRouter = require('./Routes/User-route')
const loginRouter = require('./Routes/login-route')
const addRouter = require('./Routes/add-routes')
const app = express();

app.use(express.static(path.join(__dirname, 'Public')))
app.use(express.json());

app.use('/api/libros', libRouter)
app.use('/api/libros/user', userRouter)
app.use('/api/libros/user/add', addRouter)
app.use('/api/libros/user/login', loginRouter)

app.listen(port, ()=> console.log("running on port " + port));


