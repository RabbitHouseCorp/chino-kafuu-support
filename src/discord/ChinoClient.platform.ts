import { Client, ClientOptions } from 'eris'
import { readdir, readdirSync } from 'fs'
import { CommandListener } from './structures'
import { initPlatform, ResourceBlock } from '../Launcher'
import { Config } from './config'
import { join } from 'node:path'
import { DatabaseStruct } from '../database/MongoDB.database'

export class ChinoClient extends Client {
  aliases: Map<string, string> = new Map()
  commands: Map<string, CommandListener> = new Map()
  database: DatabaseStruct
  token: string;
  //@ts-ignore
  private readonly resource: ResourceBlock | null = null
  constructor() {
    super(process.env.DISCORD_BOT_TOKEN, Config.options)
    this.aliases = new Map()
    this.commands = new Map()
    this.database = fetchResource('mongodb').get().discord
  }

  commandLoader(path: string) {
    path = join(path, 'commands')
    readdirSync(path).forEach((category) => {
      readdirSync(join(path, category)).forEach(async (cmd) => {
        const Command = await import('file://' + join(path, category, cmd.split('.').at(0)))
        const command = new Command.default()
        this.commands.set(command.config.name, command)
        command.config.aliases.forEach((alias: string) => this.aliases.set(alias, command.config.name))
      })
    })
  }

  eventLoader(path: string) {
    path = join(path, 'events')
    readdirSync(path).forEach(async (event: string) => {
      const events = await import('file://' + join(path, event.split('.').at(0)))
      this.on(events.default.name, (...args) => {
        try {
          events.default.run(this, ...args)
        } catch (error) {
          console.error(error)
        }
      })
    })
  }

  start(ready: any, path: string) {
    super.connect()
    this.once('ready', () => ready())
    this.commandLoader(path)
    this.eventLoader(path)
  }
}


export default initPlatform({
  name: "discord-platform",
  init({ main, ready, getPath }) {
    const client = new ChinoClient()
    main(() =>  client.start(ready, getPath()))
  },
  lazy: true
})
