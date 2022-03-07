const request = require('supertest')
const app = require('../app')
const {User} = require('../models')

let accessToken = ''
// Customor Register

describe("Path customer/Register", () => {
    test("Register success", done => {
        request(app)
            .post("/customer/Register")
            .set('Accept', 'application/json')
            .send('email=admin@mail.com')
            .send('&password=admin')
            .then(response => {
                accessToken = {authorization : response.body.accessToken}
                expect(response.statusCode).toBe(200);
                expect((response.text.accessToken))
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("Register Email Empty", done => {
        request(app)
            .post("/customer/Register")
            .set('Accept', 'application/json')
            .send('email=')
            .send('&password=sadasd')
            .then(response => {
                expect(response.statusCode).toBe(400)
                expect(response.body.msg[0]).toContain('Validation isEmail on email failed')
                done()
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("Register Email Empty String", done => {
        request(app)
            .post("/customer/Register")
            .set('Accept', 'application/json')
            .send("email=''")
            .send('&password=sadasd')
            .then(response => {
                // console.log(response.statusCode)
                // console.log(response.body)
                expect(response.statusCode).toBe(400)
                expect(response.body.msg).toContain('Validation isEmail on email failed')
                done()
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("Email has been registered", done => {
        request(app)
            .post("/customer/Register")
            .set('Accept', 'application/json')
            .send("email=admin@mail.com")
            .send('&password=sadasd')
            .then(response => {
                // console.log(response.statusCode)
                // console.log(response.body)
                expect(response.statusCode).toBe(500)
                expect(response.body.msg).toContain('Your request does not process')
                done()
            })
            .catch(err => {
                console.log(err)
            })
    });

});

// // Csutomer Login 

describe("Path customer/Login", () => {
    test("Correct email and password", done => {
        request(app)
            .post("/customer/Login")
            .set('Accept', 'application/json')
            .send('email=admin@mail.com')
            .send('&password=admin')
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect((response.text.accessToken))
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("Wrong password", done => {
        request(app)
            .post("/customer/Login")
            .set('Accept', 'application/json')
            .send('email=admin@mail.com')
            .send('&password=dsad')
            .then(response => {
                expect(response.statusCode).toBe(401);
                expect(response.text).toBe("{\"msg\":\"Email and Password are wrong\"}")
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("Invalid Email", done => {
        request(app)
            .post("/customer/Login")
            .set('Accept', 'application/json')
            .send('email=admin123@mail.com')
            .send('&password=admin')
            .then(response => {
                expect(response.statusCode).toBe(401);
                expect(response.text).toBe("{\"msg\":\"Email and Password are wrong\"}")
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });
});

//  Main Entity 

describe("Path Entity", () => {
    test("getALl Entity both accessToken and not accessToken", done => {
        request(app)
            .get("/customer/Jobs")
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body)
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("getALl Entity both accessToken and not accessToken", done => {
        request(app)
            .get("/customer/Jobs?page=1")
            .set(accessToken)
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body)
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("getALl Entity both accessToken and not accessToken", done => {
        request(app)
            .get("/customer/Jobs?page=1&size=2")
            .set(accessToken)
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body)
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("getALl Entity both accessToken and not accessToken", done => {
        request(app)
            .get("/customer/Jobs/1")
            .set(accessToken)
            .then(response => {
                expect(response.statusCode).toBe(200)
                expect(response.body)
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });

    test("getALl Entity both accessToken and not accessToken", done => {
        request(app)
            .get("/customer/Jobs/100")
            .set(accessToken)
            .then(response => {
                // console.log(response.statusCode)
                expect(response.statusCode).toBe(404)
                expect(response.body.msg).toContain('Data is not found')
                done();
            })
            .catch(err => {
                console.log(err)
            })
    });

});

describe('Path Bookmark' , () => {
    const baseUrl = '/customer/bookmark'

    test('get all bookmark lists ' , done => {
        request(app)
            .get(baseUrl)
            .set(accessToken)
            .then(res => {
                expect(res.statusCode).toBe(200)
                expect(res.body)
                // if there are input youy must be check res with tehe input
                done()
            })
            .catch(err => {
                console.log(err)
            })
    });

    test('Add bookmark success',done => {
        request(app)
            .post(baseUrl)
            .send('JobId=1')
            .set(accessToken)
            .then(res => {
                expect(res.statusCode).toBe(201)
                done()
            })
            .catch(err => {
                console.log(err)
            })
    });

    test('Bookmark add faild', done => {
        request(app)
            .post(baseUrl)
            .send('JobId=3')
            .set(accessToken)
            .then(res => {
                expect(res.statusCode).toBe(404)
                done()
            })
    });

    test('Get bookmark faild',done => {
        request(app)
            .get(baseUrl)
            .then(res => {
                expect(res.statusCode).toBe(401)
                expect(res.body.msg).toContain('You must be login before')
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('Get bookmark With accessToken role curomer',done => {
        request(app)
            .get(baseUrl)
            .set(accessToken)
            .then(res => {
                // expect(res.statusCode).toBe(401)
                // expect(res.body.msg).toContain('You must be login before')
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })

    test('Get bookmark and do not have access',done => {
        request(app)
            .get(`${baseUrl}/role`)
            .set(accessToken)
            .then(res => {
                expect(res.statusCode).toBe(403)
                done()
            })
            .catch(err => {
                console.log(err)
            })
    })
})

afterAll(function(){
    const payload = {
        
    }
})

beforeAll(function(){
    User.destroy({
        where : {}
    })
})

// bookmark
//job Id
//User id