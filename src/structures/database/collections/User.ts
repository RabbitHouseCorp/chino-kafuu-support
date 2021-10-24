import { model, Schema } from 'mongoose'

const User = new Schema({
  id: { type: String },
  yens: { type: Number, default: 0 },
  timeDaily: { type: String, default: '000000000000' },
  afk: { type: Boolean, default: false },
  afkReason: { type: String, default: null },
  blacklist: { type: Boolean, default: false },
  blacklistReason: { type: String, default: null },
  aboutme: { type: String, default: '\'A Chino é minha amiga!\' Você pode mudar isso usando k.sobremim' },
  profileColor: { type: String, default: '#7DAFFF' },
  isMarry: { type: Boolean, default: false },
  marryWith: { type: String, default: '' },
  rep: { type: Number, default: 0 },
  repTime: { type: String, default: '0000000000000' },
  shipValue: { type: String, default: null }
})

const users = model('Users', User)
export default { users }