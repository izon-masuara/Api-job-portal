const CustomerJob = require('../controllers/customerJob')
const CustomerController = require('../controllers/Custommer')
const CustomerRouter = require('express').Router()

CustomerRouter.post('/customer/Register',CustomerController.register)
CustomerRouter.post('/customer/Login',CustomerController.login)
CustomerRouter.post('/customer/Login/Google',CustomerController.signInGoogle)
CustomerRouter.get('/customer/Jobs',CustomerJob.getJobs)
CustomerRouter.get('/customer/Jobs/:id',CustomerJob.findJob)

module.exports = CustomerRouter