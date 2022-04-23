import chalk from 'chalk';
let messages_count = 0;
const s = (message: string) => {
  return message
    .replace(/((https:\/\/|http:\/\/)[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/g, (url) => {
      return chalk.redBright(url)
    })
    .replace(/((https:\/\/|http:\/\/)[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\/([A-Za-z0-9?="])+)/g, (url) => {
      return chalk.redBright(url)
    })
}
export const Logger = {
  log: (message: string, took?: number) => {
    messages_count++
    console.log(`${chalk.gray(`[${messages_count}]`)} ${chalk.bgBlueBright.white('[LOG]')} ${chalk.yellowBright(`Chino@Discord ~`)} ${s(message)} ${took == null ? '' : `(${took - Date.now()}ms)`}`)
  },
  debug: (message: string, took?: number) => {
    messages_count++
    console.debug(`${chalk.gray(`[${messages_count}]`)} ${chalk.bgRedBright.whiteBright('[DEBUG]')} ${chalk.yellowBright(`Chino@Discord ~`)} ${s(message)} ${took == null ? '' : `(${took - Date.now()}ms)`}`)
  },
  warn: (message: string | Error, took?: number) => {
    messages_count++
    if (message instanceof Error) {
      const msg = message.stack.split('\n')
      msg.shift()
      console.error(`\n${chalk.gray(`[${messages_count}]`)}  ${chalk.bgYellowBright.black('[WARN]')} ${chalk.yellowBright(`Chino@Discord ~`)} ${s(message.message)} ${chalk.gray(msg.join('\n').replace(/(\([A-Za-z_0-9\-\\//!+\.:?]+\))/g, (a) => chalk.blueBright(a)))}\n`)

    } else {
      console.warn(`${chalk.gray(`[${messages_count}]`)}  ${chalk.bgYellowBright.black('[WARN]')} ${chalk.yellowBright(`Chino@Discord ~`)} ${s(message)} ${took == null ? '' : `(${took - Date.now()}ms)`}`)
    }
  },
  info: (message: string, took?: number) => {
    messages_count++
    console.info(`${chalk.gray(`[${messages_count}]`)}  ${chalk.cyanBright.black('[INFO]')} ${chalk.yellowBright(`Chino@Discord ~`)} ${s(message)} ${took == null ? '' : `(${took - Date.now()}ms)`}`)
  },
  error: (message: string | Error, took?: number) => {
    messages_count++
    if (message instanceof Error) {
      const msg = message.stack.split('\n')
      msg.shift()
      console.error(`\n${chalk.gray(`[${messages_count}]`)} ${chalk.bgRedBright.whiteBright('[ERROR]')} ${chalk.yellowBright(`Chino@Discord ~`)} ${s(`${message}\n`)}${chalk.gray(msg.join('\n').replace(/(\([A-Za-z_0-9\-\\//!+\.:?]+\))/g, (a) => chalk.blueBright(a)))}\n`)
      
    } else {
      console.error(`${chalk.gray(`[${messages_count}]`)} ${chalk.bgRedBright.whiteBright('[ERROR]')} ${chalk.yellowBright(`Chino@Discord ~`)} ${s(message)} ${took == null ? '' : `(${took - Date.now()}ms)`}`)
    }
   
  }
}