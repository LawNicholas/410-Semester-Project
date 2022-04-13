const { text } = require('express')

exports.addTool = async function (client, toolid, userid) {
    const { rowCount } = await client.query({
        name: 'add-tool-to-account',
        text: 'INSERT INTO account_toolids (toolid, userid) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        values: [
            toolid,
            userid
        ]
    })

    return rowCount > 0
}

exports.getTool = async function (client, toolid) {
    const { rows } = await client.query({
        name: 'get-tool',
        text: 'SELECT * FROM tools WHERE toolid=$1',
        values: [ toolid ]
    })

    return rows[0]
}