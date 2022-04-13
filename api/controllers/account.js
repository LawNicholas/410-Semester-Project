const Accounts = require('../database/account')

module.exports = function (pool) {
    return {
        async createAccount (req, res) {
			const { username, email, password } = req.enforcer.body
			const client = await pool.connect()

			try{
				await client.query('BEGIN')
				const userid = await Accounts.createAccount(client, username, email, password)
				if (userid) {
					res.set('location', '/api/accounts/' + userid)
						.enforcer
						.status(201)
						.send("Account created with id: " + userid)
				}
				else {
					res.enforcer.status(409).send()
				}
				await client.query('COMMIT')
			}
			catch(e){
				await client.query('ROLLBACK')
				throw e
			}
			finally{
				client.release()
			}
		},
        async getAccount(req, res) {
			const user = req.user
			const client = await pool.connect()
			const account = await Accounts.getAccount(client, user.id)
			if (account === undefined || account.userid !== req.user.id) {
				res.enforcer.status(403).send()
			}
			else {
				if (account.datecompleted != null) {
					res.enforcer.status(200).send({
						username: account.username,
						email: account.email,
						progress: account.progress,
						datestarted: account.datestarted,
						pagescompleted: account.pagescompleted,
						checkpoints: account.checkpoints,
						datecompleted: account.datecompleted,
						fastesttimedd: account.fastesttime_dd,
						fastesttimehh: account.fastesttime_hh,
						fastesttimemm: account.fastesttime_mm,
						fastesttimess: account.fastesttime_ss,
						tools: account.tools
					})
				}
				else if (account.fastesttime_dd == null) {
					res.enforcer.status(200).send({
						username: account.username,
						email: account.email,
						progress: account.progress,
						datestarted: account.datestarted,
						pagescompleted: account.pagescompleted,
						checkpoints: account.checkpoints,
						tools: account.tools
					})
				}
				else {
					res.enforcer.status(200).send({
						username: account.username,
						email: account.email,
						progress: account.progress,
						datestarted: account.datestarted,
						pagescompleted: account.pagescompleted,
						checkpoints: account.checkpoints,
						fastesttimedd: account.fastesttime_dd,
						fastesttimehh: account.fastesttime_hh,
						fastesttimemm: account.fastesttime_mm,
						fastesttimess: account.fastesttime_ss,
						tools: account.tools
					})
				}
			}
        },
		async getAccountByUsername(req, res) {
			const { username } = req.enforcer.params
			const client = await pool.connect()
			const account = await Accounts.getAccountByUsername(client, username)
			if (account === undefined || account.userid !== req.user.id) {
				res.enforcer.status(403).send()
			}
			else {
				if (account.datecompleted != null) {
					res.enforcer.status(200).send({
						username: account.username,
						email: account.email,
						progress: account.progress,
						datestarted: account.datestarted,
						pagescompleted: account.pagescompleted,
						checkpoints: account.checkpoints,
						datecompleted: account.datecompleted,
						fastesttimedd: account.fastesttime_dd,
						fastesttimehh: account.fastesttime_hh,
						fastesttimemm: account.fastesttime_mm,
						fastesttimess: account.fastesttime_ss,
						tools: account.tools
					})
				}
				else if (account.fastesttime_dd == null) {
					res.enforcer.status(200).send({
						username: account.username,
						email: account.email,
						progress: account.progress,
						datestarted: account.datestarted,
						pagescompleted: account.pagescompleted,
						checkpoints: account.checkpoints,
						tools: account.tools
					})
				}
				else {
					res.enforcer.status(200).send({
						username: account.username,
						email: account.email,
						progress: account.progress,
						datestarted: account.datestarted,
						pagescompleted: account.pagescompleted,
						checkpoints: account.checkpoints,
						fastesttimedd: account.fastesttime_dd,
						fastesttimehh: account.fastesttime_hh,
						fastesttimemm: account.fastesttime_mm,
						fastesttimess: account.fastesttime_ss,
						tools: account.tools
					})
				}
			}
		},
        async updateAccount (req, res) {
			const data = req.enforcer.body
			const { username } = req.enforcer.params
			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let account = await Accounts.getAccountByUsername(client, username)
				if (account === undefined) {
					res.enforcer.status(404).send()
				}
				else {
					account = await Accounts.updateAccount(client, account.userid, data)
					if (account.userid !== req.user.id) {
						res.enforcer.status(403).send()
					}
					else {
						res.enforcer.status(200).send()
					}
				}
				await client.query('COMMIT')
			}
            catch (e) {
				await client.query('ROLLBACK')
				throw e
			}
            finally {
				client.release()
			}
        },
        async deleteAccount (req, res) {
            const { username } = req.enforcer.params

            const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let account = await Accounts.getAccountByUsername(client, username)
				if (account === undefined) {
					res.enforcer.status(204).send()
				}
				else if (account.userid !== req.user.id) {
					res.enforcer.status(403).send()
				}
                else {
					await Accounts.deleteAccount(pool, username)
					res.enforcer.status(204).send("Account Deleted")
				}
				await client.query('COMMIT')
			}
            catch (e) {
				await client.query('ROLLBACK')
				throw e
			}
            finally {
				client.release()
			}
        }
    }
}