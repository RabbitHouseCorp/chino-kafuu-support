import { ChinoClient } from '../ChinoClient'
import axios from 'axios'
import { Logger } from '../utils/Logger'
const { guild_support } = require('../config')

export default {
  name: 'ready',
  run: (client: ChinoClient) => {
    Logger.log('Online, finally.')
    const guild = client.guilds.get(guild_support.id)
    const banner = [
      'https://cdn.discordapp.com/attachments/481807707066859530/751192861365764126/Screenshot_20200731-202613_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192867678060676/Screenshot_20200731-202639_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192873562669166/Screenshot_20200731-202743_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192879334162452/Screenshot_20200731-202804_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192885956706394/Screenshot_20200731-210716_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192889421463622/Screenshot_20200801-233101_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192899294855238/Screenshot_20200801-235637_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192907985322005/Screenshot_20200802-003003_Goyabu.jpg'
    ]
    setInterval(async () => {
      if (!guild.features.includes('BANNER')) return
      const buffer = await axios.get(banner[Math.floor(Math.random() * banner.length)], { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
      const base64Banner = `data:image/${banner[Math.floor(Math.random() * banner.length)].substr(banner[Math.floor(Math.random() * banner.length)].length - 3)};base64,${buffer}`
      guild.edit({
        banner: base64Banner
      })
    }, 900000)
  
    client.editStatus('dnd', { name: 'Providing support to you, user.' })
  }
}