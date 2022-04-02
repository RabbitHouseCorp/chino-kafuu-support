import pkg from 'mongoose'
const { model, Schema } = pkg

const User = new Schema({
  _id: { type: String },
  economy: { type: Object, default: { yens: 0, sugarcubes: 0, daily: 0 } },
  blacklist: { type: Object, default: { banned: false, reason: '', who_banned: '' } },
  social: { type: Object, default: { aboutme: '', profile_color: '#7DAFFF', background_list: ['gochiusa_3'], profile_list: ['default'], profile_type: 'default', background: 'gochiusa_3', rep: 0, rep_time: 0 } },
  marry: { type: Object, default: { soulmate: '', married: false } }
})

export const user = model('User', User)
