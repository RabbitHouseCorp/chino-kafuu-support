import { Collection } from './Collection'
import { guild } from './collections/Guild'
import { user } from './collections/User'
import mongoose from 'mongoose'
import { Logger } from '..'

export class Database {
  users: any
  guilds: any
  constructor() {
    try {
      mongoose.createConnection(process.env.REVOLT_MONGO_URI)

      Logger.log('Connected to the database')
    } catch (err) {
      Logger.error(`Unable to connect to the database: ${err.message}`)
    }
    // mongoose.connect(process.env.REVOLT_MONGO_URI, (err: Error) => {
    //   if (err) return console.error(`Unable to connect to the database: ${err.message}`)
    //   Logger.log('Connected to the database')
    // })

    this.users = new Collection(user)
    this.guilds = new Collection(guild)
  }
}
