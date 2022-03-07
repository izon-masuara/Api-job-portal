const authorizationStatus = async (req,res,next) => {
    if(req.user.role === 'admin'){
        next()
    }else{
        next({
            name : "Forbidden"
        })
    }
}

module.exports = authorizationStatus