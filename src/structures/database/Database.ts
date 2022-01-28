import { Logger } from '../../utils/Logger'
import { Collection } from './Collection'

const guild = require('./collections/Guild')
const user = require('./collections/User')

const mongoose = require('mongoose')
export class Database {
  users: any
  guilds: any
  constructor() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err: Error) => {
      if (err) return console.error(`Unable to connect to the database: ${err.message}`)
      Logger.log('Connected to the database')
      
    })

    this.users = new Collection(user)
    this.guilds = new Collection(guild)
  }
}
