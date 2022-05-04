const { findAllUsers } = require("../db-access/users-dao");

async function listAllUsers() {
    console.log("List all Users");
    const users = await findAllUsers()
    const usersView = users.map(u => ({
        _id: u._id,
        email: u.email,
        name: u.name
    }))
    return usersView

}
module.exports = {
    listAllUsers
}

