const JWT = require('jsonwebtoken')

function getAccessToken(payload){
    return JWT.sign({acessToken:payload},process.env.JWT_SECRET)
}

function verifyToken(accessToken){
    return JWT.verify(accessToken,process.env.JWT_SECRET)
}

module.exports = {
    getAccessToken,
    verifyToken
}