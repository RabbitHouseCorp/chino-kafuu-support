import { Client } from 'eris'
import { readdir } from 'fs'
import { CommandListener } from './structures'
import { Database } from './structures/database/Database'
const database = require('./structures/database/Database')
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
    readdir(`${__dirname}/commands`, (e, f) => {
      if (e) return console.error(e.message)
      f.forEach((category: string) => {
        readdir(`${__dirname}/commands/${category}`, (e, cmd) => {
          if (e) return console.error(e.message)
          cmd.forEach((cmd) => {
            var Command = require(`${__dirname}/commands/${category}/${cmd}`).default
       
            const command = new Command()
            this.commands.set(command.config.name, command)
            command.config.aliases.forEach((alias: string) => this.aliases.set(alias, command.config.name))
          })
        })
      })
    })
  }

  eventLoader() {
    readdir(`${__dirname}/events`, (e, f) => {
      if (e) return console.error(e.message)
      f.forEach((event: string) => {
        const events = require(`${__dirname}/events/${event}`).default
        super.on(events.name, (...args) => events.run(this, ...args))
      })
    })
  }

  start() {
    super.connect()
    this.commandLoader()
    this.eventLoader()
    return this
  }
}