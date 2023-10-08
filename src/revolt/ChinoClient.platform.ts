import { Client } from 'revolt.io'
import { readdirSync } from 'fs'
import { initPlatform } from '../Launcher'
import { join } from 'node:path'
import { DatabaseStruct } from '../database/MongoDB.database'
export class ChinoClient extends Client {
  public database: DatabaseStruct
  constructor() {
    super()
    this.database = fetchResource('mongodb').get().revolt
  }

  listenerLoader(path: string) {
    readdirSync(join(path, 'events')).forEach(async (event: string) => {
      const events = await import('file://' + join(path, 'events', event.split('.')[0]))
      super.on(events.default.name, (...args) => events.default.run(this, ...args))
    })
  }

  async start(token: string, path: string, ready: any) {
    this.listenerLoader(path)
    super.once('ready', () => ready(this))
    await super.login(token)
  }
}


export default initPlatform({
  name: "revolt-platform",
  async init({ main, ready, getPath }) {
    main(async () => await new ChinoClient().start(process.env.REVOLT_BOT_TOKEN, getPath(), ready))
  }
})