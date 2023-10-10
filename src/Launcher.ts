import EventEmitter from 'node:events'
import { existsSync, statSync } from 'node:fs'
import { join, parse } from 'node:path'
import { Logger } from './Logger'
import tsconfig from '../tsconfig.json' assert { type: 'json' }
import { readdirSync } from 'fs'
const BuildSrc = typeof tsconfig?.compilerOptions?.outDir === 'string' ?  tsconfig?.compilerOptions.outDir : null
// const RootDir = typeof tsconfig?.compilerOptions?.rootDir === 'string' ? (tsconfig?.compilerOptions?.rootDir === '.') : false

const FileTypes = ['service.js', 'platform.js', 'database.js']
const logger = new Logger('Launcher')


export enum Type {
  None,
  Platform,
  Service,
  Database
}

export class Launcher extends EventEmitter {
  private resources: Array<ResourceBlock> = [] 
  constructor() {
    super()
    this.initListener()
    this.prepareLauncher().then(null)
  }
  
  private async prepareLauncher() {
    const dirProject = await this.readProject()
    
    for (const { path } of dirProject.filter(({ isFileInit }) => isFileInit === true)) {
      this.resources.push(await (new ResourceBlock('', { path }, this).loadFile()))
    }
    
    await this.startResource()
  }
  
  
  private async startResource() {
    const resources = this.resources
    .sort((a, b) => b.getType - a.getType)
    for (const resource of resources) {
      resource.extendStart()
        const start = async () => new Promise((resolve, reject) => {
          this.once('ready', ({ name, path }: { name: string, lazy: boolean, path: string }) => {
            if (name === resource.getName && parse(path).dir === resource.getPathDir) {
              logger.debug(`the ${resource.getName} has been initialized successfully!`)
              resolve(null)
            } else {
              logger.error(`Something went wrong when starting up: ${resource.getName}`)
              reject(`Something went wrong when starting up: ${resource.getName}`)
            }
          })
        })
      
      if (resource.isLazy)
        await start()
      else
        start().then(null)
    }
  }
  
  private async readProject(): Promise<FileOptions[]> {
    const dir = await this.readDir(join(process.cwd(), BuildSrc))
    let breakThis = false
    const metadata: FileOptions[] = []
    const verified: string[] = []
    const read = async (arr: FileOptions[]) => {
      const executeReader = async (path: string) => new Promise((resolve) => {
        this.readDir(path).then((_dir) => {
          metadata.push(..._dir)
          read(_dir).then((array) => resolve(array))
        })
      }) as Promise<FileOptions[]>
      
      for (const { path } of arr.filter(({ type }) => type === 'dir')) {
        if (breakThis)
          break
        if (verified.find((str) => str == path) == undefined) {
          verified.push(path)
          await executeReader(path)
          .then(async (array) => await read(array))
          .catch((err) => { breakThis = true; throw err })
        } 
      }
      
      return arr
    }
    await read(dir)
    verified.splice(0, verified.length)
    return metadata
  }
  
  private async readDir(path: string): Promise<FileOptions[]> {
    return new Promise((resolve, reject) => {
      if (!path.startsWith(process.cwd())) return reject('This doesn\'t appear to be a starter directory')
      const dirs = readdirSync(path)
      
      resolve(dirs.map((value) => {
        const _path = join(path, value)
        const isDir = this.isDir(_path)
        const isFileInit = isDir === true ? false : this.checkPath(_path, false)
        const parsePath = parse(path)
       
        return ({
          type: isDir === true ? 'dir' : 'fileSource',
          name: this.isFile(_path) ? parsePath.base : null,
          path: _path,
          pathDir: parsePath.dir,
          isFileInit
        })
      })) 
    })
  }
  
  
  private isDir(path: string): boolean {
    if (typeof path !== 'string') throw 'path is not string.'
    if (existsSync(path) === false) return false
    const stat = statSync(path)
    return stat.isDirectory() && !stat.isSymbolicLink()
  }

  
  private isFile(path: string): boolean {
    if (typeof path !== 'string') throw 'path is not string.'
    if (!existsSync(path)) return false
    const stat = statSync(path)

    return stat.isFile() && !stat.isSymbolicLink()
  }


  private checkPath(path: string, error?: boolean): boolean {
    if (typeof path != 'string') throw 'path is not string.'
    if (existsSync(path) == false) throw 'file not found.'
    if (error) {
      if (FileTypes.find((str) => path.endsWith(str)) == undefined) throw 'the file is not service or platform.'
    } else {
      return FileTypes.find((str) => path.endsWith(str)) != undefined
    }
    return true
  }
  
  
  public fetchResource(name: string, opt?: { filter?: Type[] }) {
    logger.debug(`fetching: ${name}, opt: ${JSON.stringify(opt ?? {}, undefined, ' ')}`)
    if (opt?.filter && Array.isArray(opt.filter)) {
      logger.debug(`current filter status: ${JSON.stringify(opt ?? {}, undefined, ' ')}`)
      opt.filter = opt.filter.filter((value) => !(value >= Type.Database) || value < 0)
      logger.debug(`cleaner filter: ${JSON.stringify(opt ?? {}, undefined, ' ')}`)
      return this.resources
      .filter((value) => opt.filter.includes(value.getType))
      .find((value) => value.getName.includes(name)) ?? null
    } else if (opt?.filter !== undefined) {
      throw 'this filter does not appear to be an array.'
    }
    return this.resources.find((value) => value.getName === name) ?? null
  }
  
  
  
  private initListener() {
    this
    .on('debug', (message) => logger.debug(message))
    .on('start', (message) => logger.info(message))
    .on('error', (message) => logger.error(message))
    .on('service', (message) => logger.info(message))
    .on('stopping', (message) => logger.warn(message))
  }
  
  
  public static default() {
    return new Launcher()
  }
}



export interface ResourceBlockOptions {
  path?: string | null
  
}


const loggerResource = logger.extends('ResourceBlock')

export class ResourceBlock {
  private name: string = 'none'
  private type: Type = Type.None
  private readonly launcher: Launcher | null = null
  private _file: Resource | null = null
  private readonly opts: ResourceBlockOptions = { path: null }
  private loaded: boolean = false
  
  constructor(name: string = '', opts: ResourceBlockOptions, launcher: Launcher = null) {
    if (typeof name === 'string')
      this.name = name
    if (typeof opts === 'object')
      this.opts = opts
    else
      this.opts = { path: null }
    if (launcher instanceof Launcher)
      this.launcher = launcher
    loggerResource.debug('Preparing the resource...')
    Object.defineProperty(this, '_file', { configurable: false, enumerable: false, writable: true })
    Object.defineProperty(this, '_opts', { configurable: false, enumerable: false, writable: true })
    Object.defineProperty(this, 'launcher', { configurable: false, enumerable: false, writable: false })
    Object.defineProperty(this, 'opts', { configurable: false, enumerable: false, writable: false })
  }
  
  public get() {
    return this._file.get()
  }
  
  public async loadFile(): Promise<ResourceBlock> {
    if (!this.loaded)
      this.loaded = true
    else
      return
    return new Promise((resolve, reject) => {
      loggerResource.debug('Loading file...')
      const timestamp = Date.now()
      Resource.create(this.opts.path, this.launcher).then((resource) => {
        loggerResource.debug(`File was loaded with success: ${resource.dir}`, timestamp)
        this._file = resource
        this.name =  resource.getName
        this.setType(resource.getType)
        resolve(this)
      })
      .catch((err) => reject(err))
    })
  }
  
  public extendStart() {
    loggerResource.debug(`Starting: ${this.getName}`)
    logger.debug(`the ${this.getName} is being initialized in lazy mode, other resources may take time to initialize because of this.`)
    this.start()
  }
  
  public get getPathDir(): string {
    if (this._file == null) return ''
    return parse(this._file.path).dir
  }
  
  public get getType(): Type {
    return this.type
  }
  
  public get getName(): string {
    return this._file.getName
  }
  
  public get isLazy(): boolean {
    return this._file.isLazy
  }
  
  private setType(type: string) {
    if (typeof type != 'string') throw 'That argument is not a string'
    loggerResource.debug(`the ${this.getName} is a ${type}.`)
    switch (type) {
      case 'service.js' || 'service':
        this.type = Type.None
          break
      case 'platform.js' || 'platform':
        this.type = Type.Platform
          break
      case 'database.js' || 'database':
        this.type = Type.Database
          break
      default:
        this.type = Type.None
    }
  }
  
  
  private async start() {
    this._file.execute()
  }
  
}


export class Resource {
  public readonly path: string = null
  public dir: string = null
  private readonly base: Launcher = null
  private opts: ResourceOptions = null
  private launcherOpts: LauncherOptions | null = null
  private _file: LauncherBox | null = null
  private output: any | null = null
  constructor(path: string, launcher: Launcher, options?: ResourceOptions) {
    if (launcher instanceof Launcher) {
      this.base = launcher
    }
    if (typeof path === 'string' && existsSync(path)) {
      this.path = path
    }
    if (options != undefined) {
      this.opts = options
    }
    Object.defineProperty(this, 'output', { configurable: false, enumerable: false, writable: true })
  }
  
  
  
  public static async create(path: string, launcher: Launcher, options?: ResourceOptions): Promise<Resource> {
    const resource = new Resource(path, launcher, options)
    return new Promise((resolve) => {
      resource.resolve().then((_resource) => resolve(_resource))
    })
  }
  
  
  public async resolve(): Promise<Resource> {
    const importFile = await import(join('file://', this.path))
    this.resolveFile(importFile, this.path)
    return this
  }
  
  public get isLazy() {
    return this?.launcherOpts?.lazy ?? false 
  }
  
  public get getName() {
    return this.launcherOpts.name
  }
  
  public get getType() {
    if (this?.opts?.type != null)
      return this.opts.type
    return this.launcherOpts.type
  }
  
  private start() {
    this.base.emit('starting', ({
      name: this.getName,
      lazy: this.isLazy,
      path: this.path
    }))
  }
  
  private ready() {
    this.base.emit('ready', ({
      name: this.getName,
      lazy: this.isLazy,
      path: this.path
    }))
  }
  
  public get() {
    return this.output
  }
  
  private restart() {
    this.base.emit('restart', ({
      name: this.getName,
      lazy: this.isLazy,
      path: this.path
    }))
  }
  
  public execute() {
    return this.executeFile()
  }
  
  private executeFile() {
    if (this._file == null) throw null
    Reflect['set'](globalThis, 'fetchResource', this.base.fetchResource.bind(this.base))
    const main = <T = any>(func: (event?: string) => any, getClass?: T) => {
      if (typeof getClass === 'object' && this.output == null) {
        this.output = getClass
      } 
      this.start()
      if (typeof func === 'function') {
        try {
          func()
        } catch (_) {
          logger.error(_)
        }
      }
    }
    const ready = <T = any>(output: T) => (() => {
      if (this.output == null) {
        this.output = output
      }
      this.ready()
    })()
    const restart = () => (() => { this.restart() })()
    const getResource = (name: string, opts?: { filter: Type[] }) => this.base.fetchResource(name, opts)
    const getPath = () => this.dir
    const fetchResource = this.base.fetchResource.bind(this.base)
    try {
      this._file.opts.init({
        ready,
        restart,
        getResource,
        started: Date.now(),
        main,
        fetchResource,
        getPath
      })
    } catch (_) {
      logger.error(_)
    }
  }
  
  private setOptions(): LauncherOptions  {
    if (this._file != null) {
      this.launcherOpts = this._file.opts
    }
    return
  }
  
  private resolveFile({ default: file}: { default?: LauncherBox | null} , path: string | null) {
    if (file == null) throw `There is something wrong with this file: ${path}`
    if (!(file instanceof LauncherBox)) throw `This file is not init: ${path}`
    this._file = file
    this.dir = parse(this.path).dir
    loggerResource.debug(`file resolved: ${this.dir}`)
    this.setOptions()
  }
}

export interface LauncherInit<T = any, R = any> {
  started: number;
  restart(func: (event?: string, returns?: T) => void): void
  main(func: (event?: string) => T, getClass?: R): void
  ready<R = any>(output?: R): void
  getResource(name: string, opt?: { filter?: Type[] }): ResourceBlock
  fetchResource(name: string, opt?: { filter?: Type[] }): ResourceBlock
  getPath(): string
}

export interface LauncherOptions {
  type?: string
  name: string
  lazy?: boolean
  init(props?: LauncherInit): void 
}

export class LauncherBox {
  opts: LauncherOptions = null
  constructor(options: LauncherOptions) {
    if (options && typeof options === 'object') {
      this.opts = options
    }
  }
  
  
  public static prepare(options: LauncherOptions) {
    return new LauncherBox(options)
  }
}


export const initDatabase = (options: LauncherOptions) => LauncherBox.prepare({
  init: () => null,
  lazy: false,
  ...options,
  type: 'database'
} as LauncherOptions)

export const initPlatform = (options: LauncherOptions) => LauncherBox.prepare({
  init: () => null,
  lazy: false,
  ...options,
  type: 'plataform'
} as LauncherOptions)

export default (() => Launcher.default())()

type FileOptions = { type: 'fileSource' | 'dir' | null; name: string; path: string | null; isFileInit: boolean; pathDir: string; }
export type ResourceOptions = |
    { type: 'platform', name: string, extendsLogger: boolean, lazy: boolean } | 
    { type: 'database', name: string, extendsLogger: boolean, lazy: boolean } 
 