import { Logger } from '../../Logger';
import { ChinoClient } from '../ChinoClient.platform';

const logger = new Logger('DiscordPlatform.events.WarnListener')


export default {
  name: 'warn',
  run: (_: ChinoClient, warn: string, id?: string | null | undefined) => {
    logger.warn(warn + (id ? `(id: ${id})` : ''))
  }
}