import { ClientOptions } from 'revolt.js'
import 'dotenv/config'
export const options: ClientOptions = {
  apiURL: 'https://api.revolt.chat/',
  heartbeat: 50,
  cache: false,
  unreads: false,
  debug: false,
  autoReconnect: true,
  ackRateLimiter: true,
  onPongTimeout: 'RECONNECT',
  pongTimeout: 10
}
