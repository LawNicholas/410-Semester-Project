const accounts = require('../database/account')

module.exports = function (pool) {
    return {
        async createAccount (req, res) {
			const { username, email, password } = req.enforcer.body
			const client = await pool.connect()

			try{
				await client.query('BEGIN')
				const userId = await accounts.createAccount(client, username, email, password)
				if (userId) {
					res.set('location', '/api/accounts/' + userId)
						.enforcer
						.status(201)
						.send("Account created with id: " + userId)
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
			/*
			const userId = await accounts.createAccount(pool, username, email, password)
			console.log(userId)
			if (userId) {
				res.set('location', '/api/accounts/' + userId)
					.enforcer
					.status(201)
					.send()
			}
            else {
				res.enforcer.status(409).send()
			}
			*/
		},
        async getAccount(req, res) {

        },
        async updateAccount (req, res) {
			const data = req.enforcer.body
			const { userId } = req.enforcer.params
			const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let account = await accounts.getAccount(client, userId)
				if (account === undefined) {
					res.enforcer.status(404).send()
				}/*
				else if (account.account_id !== req.user.id) {
					res.enforcer.status(403).send()
				}*/
				else {
					await accounts.updateAccount(client, userId, data)
					res.enforcer.status(200).send()
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
            const { userId } = req.enforcer.params

            const client = await pool.connect()
			try {
				await client.query('BEGIN')
				let account = await accounts.getAccount(client, userId)
				if (account === undefined) {
					res.enforcer.status(204).send()
				}/*
                else if (account.userId !== req.user.id) {
					res.enforcer.status(403).send()
				}*/
                else {
					await accounts.deleteAccount(pool, userId)
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
        },
        async login(req, res){

        },
        async logout(req, res){

        }
    }
}