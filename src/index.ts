import 'dotenv/config'
import { Logger } from './Logger'
import('./Launcher')

const logger = new Logger('Launcher')

process
  .on('uncaughtException', (exception) => logger.error(exception))
  .on('uncaughtExceptionMonitor', (exception) => logger.error(exception))