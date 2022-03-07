const { User } = require('../models')
const { hashPassword,comparePassword } = require('../helpers/encryptPassword')
const { getAccessToken } = require('../helpers/JWT')
// const verify = require('../apis/googleoAuth')

class UserController {
    static async register(req,res,next){
        const { username,email,password,phoneNumber,address } = req.body
        try {
            const data = await User.create(
                { username,email,password,role:"admin",phoneNumber,address }
            )
            const sendData = {
                email : data.email,
                id : data.id
            }
            const accessToken = getAccessToken(sendData)
            res.status(200).json({accessToken})
        } catch (err) {
            if(err.name === 'SequelizeValidationError'){
                const dataErr = err.errors.map(el => el.message)
                next({
                    msg:dataErr,
                    name : "SequelizeValidationError"
                })
            }else{
                next({
                name : "InternalServerError"
            })
            }
        }
    }

    static async getUser(req,res,next){
        try {
            const data = await User.findAll()
            res.status(200).json(data)
        } catch (err) {
            next({
                name : "InternalServerError"
            })
        }
    }

    static async login(req,res,next){
        const { email,password } = req.body
        try {
            const data = await User.findOne({
                where : {
                    email
                }
            })
            if(data){
                const correct = comparePassword(password,data.password)
                if(correct){
                    const sendData = {
                        email : data.email,
                        id : data.id
                    }
                    const accessToken = getAccessToken(sendData)
                    res.status(200).json({accessToken})
                }else{
                    next({
                    name : "E&P"
                })
                }
            }else {
                next({
                    name : "E&P"
                })
            }
        } catch (err) {
            next({
                name : "InternalServerError"
            })
        }
    }

    static async signInGoogle(req,res,next){
        const idToken = req.headers.id_token
        const verivyToken = await verify(idToken)
        try {
            const password = hashPassword(verivyToken.email)
            const addData = await User.findOrCreate({
                where : {
                    email : verivyToken.email
                },
                defaults : {
                    username : verivyToken.name,
                    email : verivyToken.email,
                    password,
                    role : "staff"
                }
            })
            if(addData){
                const sendData = {
                    email : addData[0].email,
                    id : addData[0].id
                }
                const accessToken = getAccessToken(sendData)
                res.status(200).json({accessToken})
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
}

module.exports = UserController