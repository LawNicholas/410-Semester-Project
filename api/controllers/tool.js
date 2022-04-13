const Tools = require('../database/tool')

module.exports = function (pool) {
    return {
        async addTool(req, res){
            const { toolId } = req.enforcer.params
			const client = await pool.connect()

			try{
                if (req.user === undefined){
                    res.enforcer.status(403).send("Unauthorized request.")
                }
                else if (Tools.getTool(client, toolId) === undefined) {
                    res.enforcer.status(404).send("Tool not found.")
                }
                else {
                    await client.query('BEGIN')
				    const added = await Tools.addTool(client, toolId, req.user.id)
				    if (added) {
					    res.enforcer.status(200).send("Tool Added")
				    }
				    else {
					    res.enforcer.status(200).send("Tool Already Owned")
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
        },
        async getTool(req, res){
            const { toolId } = req.enforcer.params
            const client = await pool.connect()

            if (req.user === undefined){
                res.enforcer.status(403).send("Unauthorized request.")
            }
            else {
                const tool = await Tools.getTool(client, toolId)
                if (tool === undefined){
                    res.enforcer.status(404).send("Tool not found.")
                }
                else {
                    res.enforcer.status(200).send(tool)
                }
            }
        }
    }
}