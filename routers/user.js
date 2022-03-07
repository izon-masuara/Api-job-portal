const userRouter = require('express').Router()
const UserController = require('../controllers/UserController')

userRouter.get('/users',UserController.getUser)
userRouter.post('/Register',UserController.register)
userRouter.post('/Login',UserController.login)
userRouter.post('/Login/Google',UserController.signInGoogle)

module.exports = userRouter