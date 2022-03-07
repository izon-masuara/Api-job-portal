# p2-cms-integration-server
CMS Integration Server

# Career Portal Restful API

- Base URL
```
    http://localhost:3000/

    https://jobsportalapp21.herokuapp.com/ --> Deployment
```

- Methods 
```
    GET | POST | PUT | DELETE | PATCH
```

## Get/Jobs

- Request Header 
```
    Authorization : <accessToken>
```

- Request Body 
```
    None
```

- Request Params
```
    None
```

### Response(200)
```
[
  {
    "id": 3,
    "title": "Ui/Ux",
    "description": "Front-End",
    "imgUrl": "Foto.png",
    "companyId": 1,
    "authorId": 1,
    "jobType": "Full Time",
    "Company": {
      "id": 1,
      "name": "Bukalipik",
      "companyLogo": "logo.png",
      "location": "Jakarta",
      "email": "Bukalipik@mail.mail",
      "description": "Marketplace company"
    }
  },
  ...
]
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Post/Jobs

- Request Header 
```
    Authorization : <accessToken>
```

- Request Body 
```
    title : <string>
    description : <string>
    imgUrl : <file>
    authorId : <integer>
    companyId : <integer>
    jobType : <string>
```

- Request Params
```
    None
```

### Response(201)
```
{
  "id": 5,
  "title": "Fullstack",
  "description": "Front-End ",
  "imgUrl": "Foto.png",
  "companyId": 1,
  "authorId": 1,
  "jobType": "Full Time",
  "updatedAt": "2021-08-30T22:16:21.338Z",
  "createdAt": "2021-08-30T22:16:21.338Z"
}
```

### Response(400)
```
{
  "msg": [
    "Validation notEmpty on title failed"
  ]
}
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Get/Jobs

- Request Header 
```
    Authorization : <accessToken>
```

- Request Body 
```
    None
```

- Request Params
```
    id : <integer>
```

### Response(200)
```
{
  "id": 3,
  "title": "Ui/Ux",
  "description": "Front-End",
  "imgUrl": "Foto.png",
  "companyId": 1,
  "authorId": 1,
  "jobType": "Full Time",
  "createdAt": "2021-08-30T12:04:26.113Z",
  "updatedAt": "2021-08-30T12:11:19.330Z"
}
```

### Response(404)
```
{
  "msg": "Not Found"
}
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Put/Jobs

- Request Header 
```
    Authorization : <accessToken>
```

- Request Body 
```
    title : <string>
    description : <string>
    imgUrl : <file>
    authorId : <integer>
    companyId : <integer>
    jobType : <string>
```

- Request Params
```
    id : <integer>
```

### Response(200)
```
{
  "id": 3,
  "title": "software enginer",
  "description": "Front-End",
  "imgUrl": "Foto.png",
  "companyId": 1,
  "authorId": 1,
  "jobType": "Full Time",
  "createdAt": "2021-08-30T12:04:26.113Z",
  "updatedAt": "2021-08-30T22:18:06.505Z"
}
```

### Response(404)
```
{
  "msg": "Not Found"
}
```

### Response(400)
```
{
  "msg": [
    "Validation notEmpty on title failed"
  ]
}
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Delete/Jobs

- Request Header 
```
    Authorization : <accessToken>
```

- Request Body 
```
    None
```

- Request Params
```
    id : <integer>
```

### Response(200)
```
{
  "msg": "User with id 3 has been deleted"
}
```

### Response(404)
```
{
  "msg": "Not Found"
}
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Patch/Jobs

- Request Header 
```
    Authorization : <accessToken>
```

- Request Body 
```
  status : <String>
```

- Request Params
```
    id : <integer>
```

### Response(200)
```
{
  msg : "Edit status success"
}
```

### Response(401)
```
{
  msg : "Edit status Failed"
}
```

## Post/Register

- Request Header 
```
    none
```

- Request Body 
```
    username : <string>
    email : <email>
    password : <string>
    phoneNumber : <string>
    address : <string>
```

- Request Params
```
    None
```

### Response(201)
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Vzc1Rva2VuIjp7ImVtYWlsIjoiYWRtaW5AbWFpbC5tYWlsIiwiaWQiOjJ9LCJpYXQiOjE2MzA5MzI1MzJ9.zs6lmHRfs3NryEwdDjPhFvKzySDRc983LJmxRTEHsog"
}
```

### Response(400)
```
{
  "msg": [
    "Validation notEmpty on password failed"
  ]
}
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Post/Login

- Request Header 
```
    none
```

- Request Body 
```
    email : <email>
    password : <string>
```

- Request Params
```
    None
```

### Response(201)
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Vzc1Rva2VuIjp7ImVtYWlsIjoiYWRtaW5AbWFpbC5tYWlsIiwiaWQiOjJ9LCJpYXQiOjE2MzA5MzI1MzJ9.zs6lmHRfs3NryEwdDjPhFvKzySDRc983LJmxRTEHsog"
}
```

### Response(401)
```
{
  msg: "Email and password are wrog"
}
```

### Response(500)
```
    msg : "Internal Server Error"
```

## Post/Login/Google

- Request Header 
```
    id_token : <token>
```

- Request Body 
```
    none
```

- Request Params
```
    None
```

### Response(201)
```
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Vzc1Rva2VuIjp7ImVtYWlsIjoiYWRtaW5AbWFpbC5tYWlsIiwiaWQiOjJ9LCJpYXQiOjE2MzA5MzI1MzJ9.zs6lmHRfs3NryEwdDjPhFvKzySDRc983LJmxRTEHsog"
}
```

### Response(404)
```
{
  msg: "Data is not found"
}
```

### Response(500)
```
    msg : "Internal Server Error"
```