require('dotenv').config() // use .env file
const jwt = require('jsonwebtoken') // use jwt
const {SECRET} = process.env // get SECRET from env

module.exports = {
    // checks if user is authenticated. throws error on failure. invokes callback on success.
    isAuthenticated: (req, res, next) => {
        console.log("----In isAuthenticated----");
        const headerToken = req.get('Authorization')
        console.log("----headerToken----");
        console.log(headerToken);

        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            console.log("----TRY - before get token");
            token = jwt.verify(headerToken, SECRET)
            console.log("----TRY - after get token");
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