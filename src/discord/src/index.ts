import { Config } from './config'
import { Logger } from './structures/utils/Logger'
import { ChinoClient } from './ChinoClient'
const client = new ChinoClient(process.env.DISCORD_BOT_TOKEN, Config.options)
client.start()

process.on('warning', (warn) => {
  return Logger.warn(warn)
})
process.on('uncaughtExceptionMonitor', (err) => {
  return Logger.error(err)
})
process.on('uncaughtException', (err) => {
  return Logger.error(err)
})