require('dotenv').config()
module.exports = {
  options: {
    defaultImageFormat: 'png',
    defaultImageSize: 2048,
    getAllUsers: true,
    intents: 14207,
    maxShards: 2,
    restMode: true,
    allowedMentions: {
      everyone: false,
      roles: false,
      users: true,
      repliedUser: true
    }
  },
  guild_support: {
    id: '468877023926943764',
    notifyRole: '482366922822909982',
    muteRole: '703018773216755752',
    staffRole: '554039524309860362',
    eventLog: '468880753195745291',
    memberRole: '468884032399081473',
    welcomeChannel: '468878407711719435',
    leaveChannel: '468878407711719435',
    modLog: '468881393787863052',
    botRole: '481833458306514944',
    booster: {
      donateRoleID: '481829963767480360',
      value: 20000
    },
  }
}