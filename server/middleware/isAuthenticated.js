require('dotenv').config() // use .env file
const jwt = require('jsonwebtoken') // use jwt
const {SECRET} = process.env // get SECRET from env

module.exports = {
    // checks if user is authenticated. throws error on failure. invokes callback on success.
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')
        console.log(headerToken);

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            console.log("----ERROR----");
            err.statusCode = 500
            throw err
        }

        if (!token) {
            console.log("----Invalid Token----");
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        // invoke callback
        next()
    }
}