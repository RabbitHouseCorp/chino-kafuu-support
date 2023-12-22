
import { Collection } from './Collection'
import { guildDiscord } from './collections/GuildDiscord'
import { userDiscord } from './collections/UserDiscord'
import mongoose from 'mongoose'
import { Logger } from '../Logger'
import { initDatabase } from '../Launcher'
import { userRevolt } from './collections/UserRevolt'
import { serversRevolt } from './collections/ServerRevolt'
const logger = new Logger('Database')
export class Database {
  discord: DatabaseStruct
  revolt: DatabaseStruct
  constructor(output?: <T = Database>(arg: T) => void) {
    mongoose.set('strictQuery', false)
    const timestamp = performance.now()
    mongoose.connection.on('open', () => logger.debug('MongoDB connected!', timestamp))
    mongoose.connect(process.env.MONGO_URI)
    .then((_) => output(this))
    .catch(error => logger.error(`I'm unable to connect the MongoDB's database: ${error.message}`))
    
    this.revolt = {
      users: new Collection(userRevolt),
      guilds: new Collection(serversRevolt)
    }
    
    this.discord = {
      users: new Collection(userDiscord),
      guilds: new Collection(guildDiscord)
    }
  }
}

export type DatabaseStruct = { users: Collection; guilds?: Collection }

export default initDatabase({
  name: 'mongodb',
  lazy: true,
  init({ main, ready }) {
    main(() => new Database(ready))
  }
})


