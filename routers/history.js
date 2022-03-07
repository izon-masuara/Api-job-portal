const router = require('express').Router()
const HistoryController = require('../controllers/History')

router.get('/History',HistoryController.getHistory)

module.exports = router