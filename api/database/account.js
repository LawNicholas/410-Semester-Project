const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4

exports.createAccount = async function (client, username, email, password) {
    registryDate = new Date()

    const userId = uuid()
    const { rowCount } = await client.query({
        name: 'create-account',
        text: 'INSERT INTO accounts (userId, username, email, password, progress, datestarted, datecompleted, pagescompleted, fastesttime, leaderboard) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) ON CONFLICT DO NOTHING',
        values: [
            userId,
            username,
            email,
            await encryptPassword(password),
            0.0,
            registryDate,
            null,
            0,
            null,
            null
        ]
    })
    return rowCount > 0 ? userId : undefined
}

exports.getAccount = async function (client, userId) {
    const { rows } = await client.query({
        name: 'get-account-by-id',
        text: 'SELECT * FROM accounts WHERE userId=$1',
        values: [userId]
    })
    return rows[0]
}

exports.updateAccount = async function (client, userId, data) {
    const { email, username, password } = data
    const values = []
    const sets = []

    if (email !== undefined) {
        values.push(email)
        sets.push('email=$' + values.length)
    }

    if (username !== undefined) {
        values.push(username)
        sets.push('username=$' + values.length)
    }

    if (password !== undefined) {
        values.push(await encryptPassword(password))
        sets.push('password=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getAccount(client, userId)

    values.push(userId)

    const { rows } = await client.query({
        name: 'update-account-by-id',
        text: 'UPDATE accounts SET ' + sets.join(', ') + ' WHERE userId=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows[0]
}

exports.deleteAccount = async function (client, userId) {
    const { rows } = await client.query({
        name: 'delete-account-by-id',
        text: 'DELETE FROM accounts WHERE userId=$1',
        values: [userId]
    })
    return rows > 0
}

async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}