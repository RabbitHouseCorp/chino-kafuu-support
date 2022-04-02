import { Message } from 'eris'
import { ChinoClient } from '../../ChinoClient'

interface Command {
  name: string,
  aliases?: string[]
  permissions?: string[]
  dev?: boolean
}

interface CommandConfig {
  name: string
  aliases?: Array<any>
  permissions?: Array<any>
  dev?: boolean
}

export interface CommandRunOptions {
  readonly client: ChinoClient
  readonly message: Message
  readonly args: string[]
}

export interface CommandInterface {
  run({}: CommandRunOptions): void
}

export class CommandListener implements CommandInterface {
  config: CommandConfig
  constructor(options: Command) {
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      permissions: options.permissions || [],
      dev: options.dev || false
    }
  }
  run({ }: CommandRunOptions): void {
    throw new Error('Method not implemented.')
  }


}