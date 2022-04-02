import { Client, ClientOptions } from 'revolt.js'
import { readdirSync } from 'fs'
import { Database } from './structures/database/Database'
export class ChinoClient extends Client {
  public database: Database
  constructor(options: ClientOptions) {
    super(options)

    this.database = new Database()
  }

  listenerLoader() {
    readdirSync('src/revolt/src/events/').forEach(async (event: string) => {
      const events = await import(`./events/${event.split('.')[0]}`)
      super.on(events.default.name, (...args) => events.default.run(this, ...args))
    })
  }

  start(token: string) {
    this.listenerLoader()
    super.loginBot(token)
  }
}
