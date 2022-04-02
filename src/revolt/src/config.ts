import { ClientOptions } from 'revolt.js'
import 'dotenv/config'
export const options: ClientOptions = {
  apiURL: 'https://api.revolt.chat',
  cache: false,
  unreads: false,
  heartbeat: 1,
  debug: false,
  autoReconnect: true,
  ackRateLimiter: true
}