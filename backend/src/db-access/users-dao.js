const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function findAllUsers() {
    const db = await getDB()
    const users = await db.collection("users").find().toArray()
    return users
}
async function findById(id) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({ _id: new ObjectId(id) })
    return foundUser
}
async function findByEmail(userEmail) {
    const db = await getDB()
    const foundUser = await db.collection("users").findOne({ email: userEmail })
    return foundUser
}
async function insertUser(user) {
    const db = await getDB()
    const insertResult = await db.collection("users").insertOne(user)
    return insertResult
}
module.exports = {
    findAllUsers,
    findById,
    findByEmail,
    insertUser
}
