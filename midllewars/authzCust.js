const { User,Job } = require('../models')

const AuthZCust = async (req,res,next) => {
    const jobData = await Job.findOne({
        where : {
            id : req.params.id
        }
    })
    try {
        const data = await User.findByPk(req.user.id)
        if(!data){
            next({
                name : "NotFound"
            })
        }else{
            if(req.user.role === 'customer'){
                next()
            }else{
                next({
                    name : "Forbidden"
                })
            }
        }
    } catch (err) {
        next({
            name : "InternalServerError"
        })
    }
}

module.exports = AuthZCust