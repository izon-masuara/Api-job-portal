const multer = require('multer')
const upload = multer({
    storage : multer.memoryStorage(), // buffer
})

module.exports = upload