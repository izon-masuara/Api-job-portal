const router = require('express').Router()
const BookmarkController = require('../controllers/Bookmark')
const AuthZCust = require('../midllewars/authzCust')

router.get('/customer/bookmark',AuthZCust,BookmarkController.getAll)
router.post('/customer/bookmark',BookmarkController.addBookmark)

module.exports = router