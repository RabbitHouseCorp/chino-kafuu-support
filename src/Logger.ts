import chalk from 'chalk';
let messages_count = 0;
let len = 5
const s = (message: string) => {
  return message
    .replace(/((https:\/\/|http:\/\/)[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)/g, (url) => {
      return chalk.redBright(url)
    })
    .replace(/((https:\/\/|http:\/\/)[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\/([A-Za-z0-9?="])+)/g, (url) => {
      return chalk.redBright(url)
    })
}
export class Logger {
  private readonly pathName: string = 'unknown'

  constructor(pathName: string = 'unknown') {
    if (typeof pathName === 'string')
      this.pathName = pathName
  }

  extends(name?: string) {
    if (typeof name !== 'string')
      name = 'unknown'
    return new Logger(`${this.pathName}.${name}`)
  }

  log(message: string, took?: number) {
    messages_count++
    console.log(`${chalk.gray(`[${messages_count}]`.padEnd(len, ' '))} ${chalk.bgBlueBright.white('[LOG]'.padEnd(7, ' '))} ${chalk.blueBright(`${this.pathName} ~`)} ${s(message.replace(process.cwd(), ''))} ${took == null ? '' : `[${chalk.gray.bold('timestamp:')}(${chalk.bgYellowBright.bold(`${(performance.now() - took).toFixed(2)}ms`)})]`}`)
  }
  debug(message: string, took?: number, ...obj: any) {
    if (!process.argv.includes('--debug') && !process.argv.includes('-D')) return
    messages_count++
    console.debug(chalk.gray(`[${messages_count}]`.padEnd(len, ' ')), chalk.bgMagentaBright.whiteBright('[DEBUG]'), chalk.magentaBright(`${this.pathName} ~`), s(message.replace(process.cwd(), '')), ...obj, took == null ? '' : `[${chalk.gray.bold('timestamp:')}(${chalk.bgYellowBright.bold(`${(performance.now() - took).toFixed(2)}ms`)})]`)
  }
  warn(message: string | Error | any, ...obj: any) {
    messages_count++
    if (message instanceof Error) {
      const msg = message.stack.split('\n')
      msg.shift()
      console.error(`\n${chalk.gray(`[${messages_count}]`.padEnd(len, ' '))}  ${chalk.bgYellowBright.black('[WARN]')} ${chalk.yellowBright(`${this.pathName} ~`)} ${s(message.message.replace(process.cwd(), ''))} ${chalk.gray(msg.join('\n').replace(/(\([A-Za-z_0-9\-\\//!+\.:?]+\))/g, (a) => chalk.blueBright(a)))}\n`)

    } else {
      console.warn(
        chalk.gray(`[${messages_count}]`.padEnd(len, ' ')),
        chalk.bgYellowBright.black('[WARN]'), chalk.yellowBright(`${this.pathName} ~`),
        s(message.replace(process.cwd(), '')), ...obj)
    }
  }
  info(message: string, took?: number) {
    messages_count++
    console.info(`${chalk.gray(`[${messages_count}]`.padEnd(len, ' '))}  ${chalk.cyanBright.black('[INFO]')} ${chalk.cyanBright(`${this.pathName} ~`)} ${s(message.replace(process.cwd(), ''))} ${took == null ? '' : `(${(performance.now() - took).toFixed(2)}ms)`}`)
  }
  error(message: string | Error, took?: number) {
    messages_count++
    if (message instanceof Error) {
      const msg = message.stack.split('\n')
      msg.shift()
      console.error(`\n${chalk.gray(`[${messages_count}]`.padEnd(len, ' '))} ${chalk.bgRedBright.whiteBright('[ERROR]')} ${chalk.redBright(`${this.pathName} ~`)} ${s(`${message}\n`)}${chalk.gray(msg.join('\n').replace(/(\([A-Za-z_0-9\-\\//!+\.:?]+\))/g, (a) => chalk.blueBright(a)))}\n`)

    } else {
      console.error(`${chalk.gray(`[${messages_count}]`.padEnd(len, ' '))} ${chalk.bgRedBright.whiteBright('[ERROR]')} ${chalk.redBright(`${this.pathName} ~`)} ${s(message)} ${took == null ? '' : `(${(performance.now() - took).toFixed(2)}ms)`}`)
    }
  }
}


export default (new Logger('no-name'))