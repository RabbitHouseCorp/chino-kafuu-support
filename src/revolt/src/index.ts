import { options } from './config'
import { ChinoClient } from './ChinoClient'
const client = new ChinoClient(options)
client.start(process.env.REVOLT_BOT_TOKEN)
