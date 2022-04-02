import pkg from 'mongoose'
const { model, Schema } = pkg

const Guild = new Schema({
  id: { type: String },
  prefix: { type: String, default: process.env.DISCORD_BOT_PREFIX },
  channelReport: { type: String, default: '' },
  reportModule: { type: Boolean, default: false },
  lang: { type: String, default: 'en-US' },
  punishChannel: { type: String, default: '' },
  punishModule: { type: Boolean, default: false },
  partner: { type: Boolean, default: false },
  animu: { type: Boolean, default: false },
  animuChannel: { type: String, default: '' },
  antiflood: {
    type: Object,
    default: {
      enabled: false,
      messagesLimit: 5
    }
  }
})

export const guild = model('Guilds', Guild)