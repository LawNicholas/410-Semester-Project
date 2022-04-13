const { text } = require('express')
//const Accounts = require('../database/account')

exports.getComments = async function (client) {
    const { rows } = await client.query({
        name: 'get-all-comments',
        text: 'SELECT * FROM comments ORDER BY commentid DESC',
        values: []
    })

    return rows
}

exports.getTopTenLeaders = async function (client) {
    const { rows } = await client.query({
        name: 'get-top-ten-leaders',
        text: 'SELECT * FROM leaderboard LIMIT 10',
        values: []
    })

    let i = 0
    while (rows.length > i) {
        rows[i]['leaderboard'] = i + 1
        i += 1
    }

    return rows
}

exports.postComment = async function (client, userid, username, message) {
    /*const account = await Accounts.getAccountByUsername(client, username)

    if (account === undefined) {
        return account
    }
    */

    commentDate = new Date().toUTCString()

    const { rowCount } = await client.query({
        name: 'post-comment',
        text: 'INSERT INTO comments (userid, username, commentdate, message) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        values: [
            userid,
            username,
            commentDate,
            message
        ]
    })

    return rowCount > 0
}
