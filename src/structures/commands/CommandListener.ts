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

export class CommandListener {
  config: CommandConfig
  constructor(options: Command) {
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      permissions: options.permissions || [],
      dev: options.dev || false
    }
  }
}