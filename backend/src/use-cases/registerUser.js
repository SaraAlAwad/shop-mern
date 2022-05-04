
const { findByEmail, insertUser } = require("../db-access/users-dao");
const { makeUser } = require("../domain/User");
const { createPasswordHash, createRandomSalt } = require("../utils/hash");

async function registerUser({ name, email, password }) {
    const foundUser = await findByEmail(email)
    console.log("foundUser", foundUser);
    if (foundUser) {
        throw new Error("User with this email already exists.")
    }
    const passwordSalt = createRandomSalt()
    const passwordHash = createPasswordHash(password, passwordSalt)

    const user = makeUser({ name, email, passwordHash, passwordSalt })
    const updateResult = await insertUser(user)
    return updateResult
}
module.exports = {
    registerUser
}
// registerUser({
//     name: "admin222",
//     username: "admin",
//     email: "admin@mail.com",
//     password: "1234"
// })