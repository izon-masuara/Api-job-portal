const Form = require('form-data')
const axios = require('axios')

const instance = axios.create({
    baseURL:"https://upload.imagekit.io/api/v1/files",
    auth : {
        username : process.env.IMAGE_KIT
    },
})


const imageKit = async (req,res,next) => {
    if(req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpeg'){
        if(req.file.size > 25000){
            next({
                name:'imageLarge'
            })
        }
        if(!req.file){
            next({
                name : "imageKit"
            })
        }
        const image = new Form()
        image.append('file',(req.file.buffer).toString('base64'))
        image.append('fileName', req.file.originalname)
    
        const response = await instance.post('/upload',image,{
            headers :{
                ...image.getHeaders()
            },
        })
    
    
        req.file = {
            img : response.data.url
        }
    
        next()
    }else{
        next({
            name : "nameFileImage"
        })
    }
   
}

module.exports = imageKit