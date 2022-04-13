const FinalPage = require('../database/finalpage')
const Accounts = require('../database/account')

module.exports = function (pool) {
    return {
        async getLeaderboard(req, res){
            const client = await pool.connect()

            if(req.user === undefined) {
                res.enforcer.status(403).send("Unauthorized request")
            }
            else {
                const account = await Accounts.getAccount(client, req.user.id)
                if (account === undefined || account.userid !== req.user.id || account.progress !== 100) {
                    res.enforcer.status(403).send("Unauthorized request")
                }
                else {
                    const leaders = await FinalPage.getTopTenLeaders(client)
                    res.enforcer.status(200).send(leaders)
                }
            }
        },
        async getGroupChat(req, res){
            const client = await pool.connect()

            if(req.user === undefined) {
                res.enforcer.status(403).send("Unauthorized request")
            }
            else {
                const account = await Accounts.getAccount(client, req.user.id)
			    if (account === undefined || account.userid !== req.user.id || account.progress !== 100) {
				    res.enforcer.status(403).send("Unauthorized request")
			    }
                else {
                    const comments = await FinalPage.getComments(client)
                    res.enforcer.status(200).send(comments)
                }
            }
        },
        async addGroupChat(req, res){
            const { message } = req.enforcer.body
			const client = await pool.connect()

			try{
                if (req.user === undefined){
                    res.enforcer.status(403).send("Unauthorized request")
                }
                else if (message.length > 600) {
                    res.enforcer.status(400).send("Comment is too long.")
                }
                else{
                    await client.query('BEGIN')
				    const added = await FinalPage.postComment(client, req.user.id, req.user.username, message)
				    if (added) {
					    res.enforcer.status(200).send("Comment Added")
				    }
				    else {
					    res.enforcer.status(400).send("Bad Request")
				    }
				    await client.query('COMMIT')
                }
			}
			catch(e){
				await client.query('ROLLBACK')
				throw e
			}
			finally{
				client.release()
			}
        }
    }
}