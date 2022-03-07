require('dotenv').config()
const express = require('express')
const router = require('./routers')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)

module.exports = app