const { verifyToken } = require('../helpers/JWT')
const { User } = require('../models')

const authentication = async(req,res,next) => {
    try {
        const data = verifyToken(req.headers.authorization)
        const found = await User.findByPk(data.acessToken.id)
        if(found){
            req.user = {
                username : found.username,
                id : found.id,
                role : found.role
            }
            next()
        }else{
            next({
                name : "Unauthentication"
            })
        }
    } catch (err) {
        next({
            name : "Unauthentication"
        })
    }
}

module.exports = authentication