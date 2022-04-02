import { Client } from 'eris'
import { readdir, readdirSync } from 'fs'
import { CommandListener } from './structures'
import { Database } from './structures/database/Database'
export class ChinoClient extends Client {
  aliases: Map<string, string>
  commands: Map<string, CommandListener>
  database: Database
  options: object
  token: string
  public constructor(token: string, options: object) {
    super(token, options)

    this.aliases = new Map()
    this.commands = new Map()
    this.database = new Database()
  }

  commandLoader() {
    readdirSync('src/discord/src/commands').forEach((category) => {
      readdirSync(`src/discord/src/commands/${category}`).forEach(async (cmd) => {
        const Command = await import(`./commands/${category}/${cmd.split('.')[0]}`)
        const command = new Command.default()
        this.commands.set(command.config.name, command)
        command.config.aliases.forEach((alias: string) => this.aliases.set(alias, command.config.name))
      })
    })
    // readdir(`${__dirname}/commands`, (e, f) => {
    //   if (e) return console.error(e.message)
    //   f.forEach((category: string) => {
    //     readdir(`${__dirname}/commands/${category}`, (e, cmd) => {
    //       if (e) return console.error(e.message)
    //       cmd.forEach(async (cmd) => {
            
    //       })
    //     })
    //   })
    // })
  }

  eventLoader() {
    readdirSync('src/discord/src/events/').forEach(async (event: string) => {
      const events = await import(`./events/${event.split('.')[0]}`)
      super.on(events.default.name, (...args) => events.default.run(this, ...args))
    })
  }

  start() {
    super.connect()
    this.commandLoader()
    this.eventLoader()
    return this
  }
}