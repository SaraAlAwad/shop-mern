const { findByEmail } = require("../db-access/users-dao");
const { makeUser } = require("../domain/User");
const { createPasswordHash, createToken } = require("../utils/hash");

//in my case user is the admin planing to add users rols
async function login({ email, password }) {

    const invalidLoginMessage = "Invalid Login"
    const foundUser = await findByEmail(email)
    if (!foundUser) {
        throw new Error(invalidLoginMessage)
    }

    const user = makeUser(foundUser)
    const passwordHash = createPasswordHash(password, user.passwordSalt)

    const correctPassword = user.passwordHash === passwordHash

    if (!correctPassword) {
        throw new Error(invalidLoginMessage)
    }
    const token = createToken(user)
    return token

}
module.exports = {
    login
}