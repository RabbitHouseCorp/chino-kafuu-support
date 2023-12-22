import axios from 'axios'
import { ActivityPartial } from 'eris'
import { Logger } from '../../Logger'
import { ChinoClient } from '../ChinoClient.platform'
import { Config } from '../config'
const banner = [
  'https://cdn.discordapp.com/attachments/481807707066859530/751192861365764126/Screenshot_20200731-202613_Goyabu.jpg',
  'https://cdn.discordapp.com/attachments/481807707066859530/751192867678060676/Screenshot_20200731-202639_Goyabu.jpg',
  'https://cdn.discordapp.com/attachments/481807707066859530/751192873562669166/Screenshot_20200731-202743_Goyabu.jpg',
  'https://cdn.discordapp.com/attachments/481807707066859530/751192879334162452/Screenshot_20200731-202804_Goyabu.jpg',
  'https://cdn.discordapp.com/attachments/481807707066859530/751192885956706394/Screenshot_20200731-210716_Goyabu.jpg',
  'https://cdn.discordapp.com/attachments/481807707066859530/751192889421463622/Screenshot_20200801-233101_Goyabu.jpg',
  'https://cdn.discordapp.com/attachments/481807707066859530/751192907985322005/Screenshot_20200802-003003_Goyabu.jpg'
]
const status: ActivityPartial[] = [
  { name: 'Trying to give you support.', type: 3 },
  { name: 'Moderating my support server!', type: 3 },
  { name: 'If you need support or have a question, please, go to the #support channel.', type: 3 },
  { name: 'Miracle Girls Festival', type: 0 },
  { name: 'Chimame Chronicle', type: 0 }
]

const logger = new Logger('DiscordPlatform.events.ReadyListener')
export default {
  name: 'ready',
  run: (client: ChinoClient) => {
    logger.log('Online, finally.')
    const guild = client.guilds.get(Config.guild_support.id)

    try {
      Promise.all([setInterval(async () => {
        if (!guild?.features?.includes('BANNER')) return
        const buffer = await axios.get(banner[Math.floor(Math.random() * banner.length)], { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
        const base64Banner = `data:image/${banner[Math.floor(Math.random() * banner.length)].substr(banner[Math.floor(Math.random() * banner.length)].length - 3)};base64,${buffer}`
        guild.edit({
          banner: base64Banner
        })
      }, 900000),
      setInterval(() => {
        const game = status[Math.round(Math.random() * status.length)]
        if (game?.type === 0) {
          client.editStatus('dnd', game)
        } else {
          client.editStatus('online', game)
        }
      }, 15000)])
    } catch (err) {
      logger.error(err)
    }
  }
}
