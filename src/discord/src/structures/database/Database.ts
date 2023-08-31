import { Logger } from '../utils/Logger'
import { Collection } from './Collection'
import { guild } from './collections/Guild'
import { user } from './collections/User'
import mongoose from 'mongoose'

export class Database {
  users: any
  guilds: any
  constructor() {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DISCORD_MONGO_URI).catch(error => console.error(`I'm unable to connect the MongoDB's database: ${error.message}`)

    this.users = new Collection(user)
    this.guilds = new Collection(guild)
  }
}
