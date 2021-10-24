import { Config } from './config'

const { ChinoClient } = require('./ChinoClient')

const client = new ChinoClient(process.env.TOKEN, Config.options)
client.start()