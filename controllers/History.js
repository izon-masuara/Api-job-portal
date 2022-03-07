const { History } = require('../models')

class HistoryController {
    static async getHistory(req,res,next) {
        const data = await History.findAll({
            exclude : [
                'updatedAt',
                'deletedAt'
            ]
        })
        try {
            res.status(200).json(data)
        } catch (err) {
            next({
                name : 'InternalServerError'
            })
        }
    }
}

module.exports = HistoryController