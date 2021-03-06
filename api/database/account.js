const bcrypt = require('bcryptjs')
const { text } = require('express')
const uuid = require('uuid').v4

exports.createAccount = async function (client, username, email, password) {
    let registryDate = new Date().toUTCString()

    const userid = uuid()
    const { rowCount } = await client.query({
        name: 'create-account',
        text: 'INSERT INTO accounts (userid, username, email, password, progress, datestarted, datecompleted, pagescompleted, fastesttime_dd, fastesttime_hh, fastesttime_mm, fastesttime_ss) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ON CONFLICT DO NOTHING',
        values: [
            userid,
            username,
            email,
            await encryptPassword(password),
            0.0,
            registryDate,
            null,
            0,
            null,
            null,
            null,
            null
        ]
    })
    return rowCount > 0 ? userid : undefined
}

exports.getAccount = async function (client, userid) {
    const { rows } = await client.query({
        name: 'get-account-by-id',
        text: 'SELECT * FROM accounts WHERE userid=$1',
        values: [userid]
    })
    if (rows[0] === undefined){
        return rows[0]
    }

    return await combineUserData(client, rows[0])
}

exports.getAccountByUsername = async function (client, username) {
    const { rows } = await client.query({
        name: 'get-account-by-username',
        text: 'SELECT * FROM accounts WHERE username=$1',
        values: [username]
    })

    if (rows[0] === undefined){
        return rows[0]
    }

    return await combineUserData(client, rows[0])
}

exports.updateAccount = async function (client, userid, data) {
    const { email, username, password, progress, datestarted, datecompleted, fastesttime_dd, fastesttime_hh, fastesttime_mm, fastesttime_ss } = data
    const values = []
    const sets = []

    if (email !== undefined) {
        const { rows:account } = await client.query({
            name: 'get-account-by-email',
            text: 'SELECT * FROM accounts WHERE email=$1',
            values: [email]
        })
        if (account.length > 0) {
            return account
        }
        values.push(email)
        sets.push('email=$' + values.length)
    }

    if (username !== undefined) {
        const { rows:account } = await client.query({
            name: 'get-account-by-username',
            text: 'SELECT * FROM accounts WHERE username=$1',
            values: [username]
        })
        if (account.length > 0) {
            return account
        }
        values.push(username)
        sets.push('username=$' + values.length)
    }

    if (password !== undefined) {
        values.push(await encryptPassword(password))
        sets.push('password=$' + values.length)
    }

    if (progress !== undefined) {
        values.push(progress)
        sets.push('progress=$' + values.length)
    }

    if (datestarted !== undefined) {
        values.push(datestarted)
        sets.push('datestarted=$' + values.length)
    }

    if (datecompleted !== undefined) {
        if (datecompleted !== '') {
            values.push(datecompleted)
            sets.push('datecompleted=$' + values.length)
    
            const { rows } = await client.query({
                name: 'get-fastest-time',
                text: 'SELECT datestarted, fastesttime_dd, fastesttime_hh, fastesttime_mm, fastesttime_ss FROM accounts WHERE userid=$1',
                values: [userid]
            })
            if(rows[0].fastesttime_dd !== null) {
                const fastesttime = ((rows[0].fastesttime_dd * 24 * 60 * 60) + (rows[0].fastesttime_hh * 60 * 60) + (rows[0].fastesttime_mm * 60) + rows[0].fastesttime_ss)
    
                const date1 = new Date(rows[0].datestarted)
                const date2 = new Date(datecompleted)
                const diffTime = Math.abs(date2 - date1)

                console.log(date1)
                console.log(date2)
                console.log(diffTime)
    
                if (Math.ceil(diffTime / 1000) < fastesttime) {
                    let days = Math.floor(diffTime / (1000 * 60 * 60 * 24))
                    values.push(days)
                    sets.push('fastesttime_dd=$' + values.length)
                    let hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                    values.push(hours)
                    sets.push('fastesttime_hh=$' + values.length)
                    let minutes = Math.floor(((diffTime % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60))
                    values.push(minutes)
                    sets.push('fastesttime_mm=$' + values.length)
                    let seconds = Math.floor((((diffTime % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60)) / (1000))
                    values.push(seconds)
                    sets.push('fastesttime_ss=$' + values.length)
                }
                
            }
            else {
                const date1 = new Date(rows[0].datestarted)
                const date2 = new Date(datecompleted)
                const diffTime = Math.abs(date2 - date1)
                values.push(Math.floor(diffTime / (1000 * 60 * 60 * 24)))
                sets.push('fastesttime_dd=$' + values.length)
                values.push(Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
                sets.push('fastesttime_hh=$' + values.length)
                values.push(Math.floor(((diffTime % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60)))
                sets.push('fastesttime_mm=$' + values.length)
                values.push(Math.floor((((diffTime % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60)) / (1000)))
                sets.push('fastesttime_ss=$' + values.length)
            }
        }
        else {
            values.push(null)
            sets.push('datecompleted=$' + values.length)
        }
        
    }

    if (fastesttime_dd !== undefined && fastesttime_hh !== undefined && fastesttime_mm !== undefined && fastesttime_ss !== undefined) {
        values.push(fastesttime_dd)
        sets.push('fastesttime_dd=$' + values.length)
        values.push(fastesttime_hh)
        sets.push('fastesttime_hh=$' + values.length)
        values.push(fastesttime_mm)
        sets.push('fastesttime_mm=$' + values.length)
        values.push(fastesttime_ss)
        sets.push('fastesttime_ss=$' + values.length)
    }

    // if no properties were passed in then there is nothing to update
    if (values.length === 0) return await exports.getAccount(client, userid)

    values.push(userid)

    const { rows } = await client.query({
        name: 'update-account-by-id',
        text: 'UPDATE accounts SET ' + sets.join(', ') + ' WHERE userid=$' + (values.length) + ' RETURNING *',
        values
    })
    return rows[0]
}

exports.deleteAccount = async function (client, username) {
    const { rows:account } = await client.query({
        name: 'get-account-by-username',
        text: 'SELECT * FROM accounts WHERE username=$1',
        values: [username]
    })
    
    if (account.length == 0) return false

    await client.query({
        name: 'delete-checkpoints-by-id',
        text: 'DELETE FROM account_checkpoints WHERE userid=$1',
        values: [account[0].userid]
    })

    await client.query({
        name: 'delete-tools-by-userid',
        text: 'DELETE FROM account_toolids WHERE userid=$1',
        values: [account[0].userid]
    })

    await client.query({
        name: 'delete-comments-by-userid',
        text: 'DELETE FROM comments WHERE userid=$1',
        values: [account[0].userid]
    })

    const { rowCount } = await client.query({
        name: 'delete-account-by-id',
        text: 'DELETE FROM accounts WHERE username=$1',
        values: [username]
    })
    return rowCount > 0
}

async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

async function combineUserData (client, user) {
    const { rows:toolIds } = await client.query({
        name: 'get-tool-ids-by-user-id',
        text: 'SELECT toolid FROM account_toolids WHERE userid=$1',
        values: [await user.userid]
    })

    let tls = []

    if (toolIds.length > 0) {
        let i = 0
        let queryText = ''
        const values = []
        while (i < toolIds.length) {
            queryText += 'toolid=$' + (i + 1)
            if (i + 1 < toolIds.length) {
                queryText += ' OR '
            }
            values.push(toolIds[i].toolid)
            i += 1
        }

        const { rows:tools } = await client.query({
            name: 'get-tools',
            text: 'SELECT toolname FROM tools WHERE ' + queryText,
            values
        })

        tls = tools
    }

    const { rows:checkpoints } = await client.query({
        name: 'get-checkpoints-by-id',
        text: 'SELECT checkpoint FROM account_checkpoints WHERE userid=$1',
        values: [await user.userid]
    })

    i = 0
    let cps = []
    while (i < checkpoints.length) {
        cps.push(checkpoints[i].checkpoint)
        i += 1
    }

    i = 0
    while (i < tls.length) {
        tls[i] = tls[i].toolname
        i += 1
    }

    let userData = user
    userData['checkpoints'] = cps
    userData['tools'] = tls

    return userData
}