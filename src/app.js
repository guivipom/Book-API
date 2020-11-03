const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const bookRouter = require('./routers/book')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(bookRouter)


module.exports = app
