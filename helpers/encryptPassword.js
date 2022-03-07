const bycrypt = require('bcrypt')

function hashPassword(myPassword){
    return bycrypt.hashSync(myPassword,5)
}

function comparePassword(myPassword,passwordDb){
    return bycrypt.compareSync(myPassword,passwordDb)
}

module.exports = {
    hashPassword,
    comparePassword
}