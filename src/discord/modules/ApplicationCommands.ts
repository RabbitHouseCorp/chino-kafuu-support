import { CommandBase, CommandOptions, SlashCommand } from 'eris';
import { ChinoClient } from '../ChinoClient.platform';


export class ApplicationCommands {
  client: ChinoClient;
  slash_command: SlashCommand
  constructor(client: ChinoClient) {
    this.client = client
    this.slash_command = this.client.slashCommand
  }

  async send() {
    this.slash_command.addVolumeOfCommands([
      new CommandBase()
        .setName('notify')
        .setDescription('Receive a role to receive all notifications of new updates from Chino Kafuu.')
        .setType(1)
    ])
  }
}