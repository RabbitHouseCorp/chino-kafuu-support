interface Command {
  name: String,
  aliases?: string[]
  permissions?: string[]
  dev?: boolean
}

export class CommandListener {
  config: object
  constructor(options: Command) {
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      permissions: options.permissions || [],
      dev: options.dev || false
    }
  }
}