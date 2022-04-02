import pkg from 'mongoose'
const { model, Schema } = pkg

const Guild = new Schema({
  _id: { type: String },
  prefix: { type: String, default: process.env.REVOLT_BOT_PREFIX },
  report: { type: Object, default: { module: false, channel_id: '' } },
  mod_log: { type: Object, default: { module: false, channel_id: '' } },
  language: { type: String, default: 'en-US' },
  animu: { type: Object, default: { module: false, channel_id: '' } }
})

export const guild = model('Guild', Guild)
