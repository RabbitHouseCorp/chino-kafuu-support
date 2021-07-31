const guild = require('./collections/Guild')
const user = require('./collections/User')
import { Collection } from './Collection'
const mongoose = require('mongoose')
module.exports = class Database {
  users: any
  guilds: any
  constructor() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err: Error) => {
      if (err) return console.error(`Unable to connect to the database: ${err.message}`)
      console.log('Connected to the database')
    })

    this.users = new Collection(user)
    this.guilds = new Collection(guild)
  }
}