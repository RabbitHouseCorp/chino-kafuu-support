const { ChinoClient } = require('./ChinoClient')
const config = require('./config')
const client = new ChinoClient(process.env.TOKEN, config.options)
client.start()