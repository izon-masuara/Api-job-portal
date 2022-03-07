const CareerPortalController = require('../controllers/CareerPortal')
const authorization = require('../midllewars/authorization')
const CareerRouter = require('express').Router()
const upload = require('../helpers/multer')
const imageKit = require('../apis/imageKit')
const authorizationStatus = require('../midllewars/editStatus')

CareerRouter.get('/Jobs/Companies',CareerPortalController.getCompany)
CareerRouter.get('/Jobs',CareerPortalController.getJobs)
CareerRouter.post('/Jobs',upload.single('imgUrl'),imageKit,CareerPortalController.addJob)
CareerRouter.get('/Jobs/:id',CareerPortalController.findJob)
// CareerRouter.use(authorization)
CareerRouter.put('/Jobs/:id',authorization,upload.single('imgUrl'),imageKit,CareerPortalController.editJob)
CareerRouter.delete('/Jobs/:id',authorization,CareerPortalController.removeJob)
CareerRouter.patch('/Jobs/:id',authorizationStatus,CareerPortalController.editStatus)

module.exports = CareerRouter