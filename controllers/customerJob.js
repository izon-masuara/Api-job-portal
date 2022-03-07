const { Job,Company,History } = require('../models')

class CustomerJob {
    static async getJobs(req,res,next) {
        const {page,size} = req.query
        try {
            const data = await Job.findAll({
                limit : page,
                offset : size, 
                include : [
                    {
                        model : Company,
                        attributes : {
                            exclude : [
                                'createdAt',
                                'updatedAt'
                            ]
                        }
                    },
                ],
                attributes : {
                    exclude : [
                        'createdAt',
                        'updatedAt'
                    ]
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next({
                name : "InternalServerError"
            })
        }
    }

    static async getCompany(req,res,next){
        const data = await Company.findAll()
        try {
            res.status(200).json(data)
        } catch (error) {
            next({
                name : "NotFound"
            })
        }
    }

    static async findJob(req,res,next) {
        try {
            const data = await Job.findByPk(+req.params.id,{
                include : [
                    {
                        model : Company,
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
                    name : "NotFound"
                })
            }
        } catch (error) {
            next({
                name : "InternalServerError"
            })
        }
    }

    static async editJob(req,res,next){
        const payload = {
            title : req.body.title,
            description : req.body.description,
            imgUrl : req.file.img,
            authorId : req.user.id,
            companyId : +req.body.companyId,
            jobType : req.body.jobType
        }
        try {
            const found = await Job.findByPk(+req.params.id)
            if(found){
                const data = await Job.update(payload,{
                    where : {
                        id : +req.params.id
                    },
                    returning : true
                })
                const dataHistory = {
                    entityId : found.id,
                    title : `${data[1][0].title}`,
                    description : `Jobs with title ${payload.title} has been updated`,
                    updatedBy : req.user.id
    
                }
                History.create(dataHistory)
                res.status(200).json(data[1][0])
            }else{
                next({
                    name : "NotFound"
                })
            }
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                const dataError = error.errors.map(el => el.message)
                next({
                    msg:dataError,
                    name : "SequelizeValidationError"
                })
            }else{
                next({
                    name : "InternalServerError"
                })
            }
        }
    }

    static async removeJob(req,res,next) {
        try {
            const found = await Job.findByPk(+req.params.id)
            if(found){
                await Job.destroy({
                    where : {
                        id : req.params.id
                    }
                })
                const dataHistory = {
                    entityId : found.id,
                    title : `${found.title}`,
                    description : `Jobs with title ${found.title} has been Deleted`,
                    updatedBy : req.user.id
    
                }
                History.create(dataHistory)
                res.status(200).json({msg:`User with id ${+req.params.id} has been deleted`})
            }else{
                next({
                    name : "NotFound"
                })
            }
        } catch (error) {
            next({
                name : "InternalServerError"
            })
        }
    }

    static async editStatus(req,res,next) {
        const payload = {
            status : req.body.status
        }
        const data = await Job.update(payload,{
            where : {
                id :+req.params.id
            },
            returning : true
        })
        try {
            const dataHistory = {
                entityId : req.params.id,
                title : `${data[1][0].title}`,
                description : `Jobs with status ${payload.status} has been updated`,
                updatedBy : req.user.id
            }
            History.create(dataHistory)
            res.status(200).json({
                msg : `Edit status success`
            })
        } catch (err) {
            next({
                name : 'editFiled'
            })
        }
    } 
}

module.exports = CustomerJob