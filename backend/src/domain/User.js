//in my case the user is the admin

function makeUser({
    _id,
    name,
    email,
    createdAt = new Date().toString(),
    password,
    passwordHash,
    passwordSalt
}

) {
    if (!email) {
        throw new Error("email must exist.")
    }
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new Error("User name must be a non-empty string")
    }

    if (!passwordHash && !password) {
        throw new Error("User must provide a password or passwordHash")
    }
    const _pwSalt = passwordSalt || createRandomSalt()

    return {
        name,
        email,
        createdAt: createdAt || new Date().toString(),
        // we dont store the user password we store the hashed value
        passwordHash: passwordHash || createPasswordHash(password, _pwSalt),
        passwordSalt: _pwSalt,
        _id,
    }

}
module.exports = {
    makeUser
}