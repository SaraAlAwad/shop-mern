const crypto = require("crypto");
const jwt = require("jsonwebtoken")

function hash(input) {
    return crypto.createHash('sha256').update(input).digest('hex')
}
//salt is short random set of char.s wich is diffrent for evrysingle user
function createRandomSalt() {
    return crypto.randomBytes(64).toString('hex')
}
function createPasswordHash(password, salt) {
    return hash(password + salt)
}
function createToken(user) {
    const TEN_MINUTES = 60 * 10 // 60seconds x 10 
    const initiatedAt = Math.floor(Date.now() / 1000)
    const expiresAt = initiatedAt + TEN_MINUTES

    const tokenPayload = {
        sub: user._id, // subjekt
        tokenType: "access",
        iat: initiatedAt, // initiaed at in seconds
        exp: expiresAt    // expires
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET)
    return token
}

function imageBufferToBase64(imgBuffer, mimeType) {
    return "data:" + mimeType + ";base64," + imgBuffer.toString('base64')
}
module.exports = {
    hash,
    createRandomSalt,
    createPasswordHash,
    createToken,
    imageBufferToBase64
}