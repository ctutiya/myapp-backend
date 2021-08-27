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
        console.log("unauthorizedResponse")

        return "You are unauthorized!!"
    },
    authorizer: (email, password) => {
        const admin = {
            _email: "carlos",
            _password: "password"
        }

        const userMatches = basicAuth.safeCompare(email, admin._email)
        const passwordMatches = basicAuth.safeCompare(password, admin._password)

        if (userMatches && passwordMatches) {
            console.log("authorizer")

            return userMatches & passwordMatches
        }
    }
}))

app.get('/', (req, res, next) => {
    res.send('autorized!')
})

app.put('/login', (req, res) => {
    let param = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(param)

    // check if the login user is ok to be authorized
    if (param.email === "carlos" && param.password === "password") {
        console.log("login successfully!")

        res.send({
            msg: "SUCCESS",
            email: param.email,
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