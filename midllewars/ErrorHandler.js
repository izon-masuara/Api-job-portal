const ErrorHandler = (err,req,res,next) => {
    switch (err.name) {
        case "NotFound":
            res.status(404).json({msg:`Data is not found`})
            break;
        case "InternalServerError":
            res.status(500).json({msg:`Your request does not process`})
            break;
        case "SequelizeValidationError":
            res.status(400).json({msg:err.msg})
            break;
        case "Unauthentication":
            res.status(401).json({msg:`You must be login before`})
            break;
        case "Forbidden":
            res.status(403).json({msg:`You do not have access`})
            break;
        case "E&P":
            res.status(401).json({msg:"Email and Password are wrong"})
            break;
        case "imageKit":
            res.status(401).json({msg:"You must be upload image"})
            break;
        case "imageLarge":
            res.status(401).json({msg:"You must be upload image file size under 255kb"})
            break;
        case "editFiled":
            res.status(401).json({msg:"Edit status Failed"})
            break;
        case "nameFileImage":
            res.status(401).json({msg:"Your file image must be .png or .jpg"})
            break;
        default:
            break;
    }
}

module.exports = ErrorHandler