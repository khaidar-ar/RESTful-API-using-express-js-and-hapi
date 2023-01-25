const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.API_SECRET


exports.authenticateJWT = (req, res, next) => {
    const autHeader = req.headers.authorization
    if (autHeader) {
        const token = autHeader.split(' ')[1]
        jwt.verify(token, accessTokenSecret, (error, user) => {
            if (error) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}