import { Logger } from '../utils/Logger'
import { Collection } from './Collection'
import { guild } from './collections/Guild'
import { user } from './collections/User'
import mongoose from 'mongoose'

export class Database {
  users: any
  guilds: any
  connected: Boolean
  constructor() {
    this.users = new Collection(user)
    this.guilds = new Collection(guild)
    this.connected = false
  }
  
  _connect() {
    function connect() {
      mongoose.connect(process.env.DISCORD_MONGO_URI, { autoIndex: true } => {
        this.connected = true
        Logger.log('Connected to the database')
      })
    }

    mongoose.connection.on('error', err: Error => {
      if (err) return Logger.error(`Unable to connect to the database: ${err.message}`)
    })
    
    mongoose.connection.on('disconnected', () => {
      this.connected = false
      connect()
    })
  }
}
