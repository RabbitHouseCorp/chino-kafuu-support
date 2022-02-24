import { Logger } from '../utils/Logger'
import { Collection } from './Collection'
import { guild } from './collections/Guild'
import { user } from './collections/User'
import mongoose from 'mongoose'

export class Database {
  users: any
  guilds: any
  constructor() {
    mongoose.connect(process.env.MONGO_URI, (err: Error) => {
      if (err) return console.error(`Unable to connect to the database: ${err.message}`)
      Logger.log('Connected to the database')
    })

    this.users = new Collection(user)
    this.guilds = new Collection(guild)
  }
}
