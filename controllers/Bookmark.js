const { Bookmark,User,Job} = require('../models')

class BookmarkController {
    static async getAll(req,res,next){
        try {
            const data = await Bookmark.findAll({
                where : {
                    id : req.user.id
                },
                include : [
                    {
                        model : User,
                        attributes : {
                            exclude : [
                                'createdAt',
                                'updatedAt'
                            ]
                        }
                    },
                    {
                        model : Job,
                        attributes : {
                            exclude : [
                                'createdAt',
                                'updatedAt'
                            ]
                        }
                    }
                ]
            })
            if(data){
                res.status(200).json(data)
            }else{
                next({
                    name : 'NotFound'
                })
            }
        } catch (err) {
            next({
                name : 'InternalServerError'
            })
        }
    }

    static async addBookmark(req,res,next){
        try {
            const found = await Job.findOne({
                where : {
                    id : +req.body.JobId
                }
            })
            if(found){
                const payload = {
                    UserId : req.user.id,
                    JobId : +req.body.JobId
                }
                const data = await Bookmark.create(payload)
                res.status(201).json(data)
            }else{
                next({
                    name : 'NotFound'
                })
            }
        } catch (err) {
            next({
                name : 'InternalServerError'
            })
        }
    }
}

module.exports = BookmarkController