const express = require('express')
const basicAuth = require('express-basic-auth')
const cors = require('cors')
const app = express()

const port = 3001

// avoid cross domain error - when we edit frontend and backend at the same time
app.use(cors())

app.use(express.json())

// setting up basic auth - as soon as we put this, the website become password-protected
app.use(basicAuth({
    // users: {
    //     'admin': 'supersecret',
    //     'carlos': 'password'
    // },
    // challenge: true,
    unauthorizedResponse: () => {
        console.log("I am here in basicAuth config. Unauthorised!!")

        return "You are unauthorized!!"
    },
    authorizer: (email, password) => {
        console.log("#1. username and password input: ", email, password)

        const admin = {
            _email: "carlos",
            _password: "password"
        }

        const userMatches = basicAuth.safeCompare(email, admin._email)
        const passwordMatches = basicAuth.safeCompare(password, admin._password)

        if (userMatches && passwordMatches) {
            // both match -- working
            console.log("#2. Authorized!! both password and username match", userMatches, passwordMatches)

            return userMatches & passwordMatches
        }
    }
}))

app.get('/', (req, res, next) => {
    res.send('autorized!')
})

app.put('/login', (req, res) => {
    console.log(req)

    // create input data object
    let param = {
        email: req.body.email,
        password: req.body.password
    }

    console.log("#3. req.body is ", param)

    // check if the login user is ok to be authorized
    if (param.email === "carlos" && param.password === "password") {
        console.log("I am here returning json to frontend")

        res.send({
            msg: "SUCCESS",
            username: param.username,
            password: param.password
        })
    }
})

app.get('/logout', (req, res) => {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(() => {
        res.redirect('/')
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})