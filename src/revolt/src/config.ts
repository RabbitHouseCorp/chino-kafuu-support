import { ClientOptions } from 'revolt.js'
import 'dotenv/config'
export const options: ClientOptions = {
  cache: false,
  unreads: false,
  debug: false,
  autoReconnect: true,
  ackRateLimiter: true,
  onPongTimeout: 'RECONNECT',
  pongTimeout: 10
}
