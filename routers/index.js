const router = require('express').Router()
const authentication = require('../midllewars/authentication')
const ErrorHandler = require('../midllewars/ErrorHandler')
const CareerRuter = require('./CareerPortal')
const userRouter = require('./user')
const HistoryRouter = require('./history')
const CustomerRouter = require('./CustomerJob')
const BookmarkRouter = require('./Bookmark')

router.use(userRouter)
router.use(CustomerRouter)
router.use(authentication)
router.use(BookmarkRouter)
router.use(CareerRuter)
router.use(HistoryRouter)
router.use(ErrorHandler)

module.exports = router