const jwt = require("jsonwebtoken")

function doAuthMiddleware(req, res, next) {
    console.log("middelware has been called");
    const token = req.headers.tocken
    try {
        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        console.log("error while verifying token:", err)
        return res.status(401).json({ message: "please login first" })
    }
}
module.exports = {
    doAuthMiddleware
}