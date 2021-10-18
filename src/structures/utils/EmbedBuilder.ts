import { EmbedAuthor, EmbedFooter, EmbedImage } from 'eris'

export class EmbedBuilder {
  fields: Array<Object>
  author: EmbedAuthor
  description: string
  color: number
  footer: EmbedFooter
  image: EmbedImage
  title: string
  thumbnail: object
  timestamp: Date
  url: string
  constructor() {
    this.fields = []
    this.author = null
    this.description = null
    this.color = null
    this.footer = null
    this.image = null
    this.timestamp = null
    this.title = null
    this.thumbnail = null
    this.url = null
  }

  setAuthor(name: string, icon_url?: string, url?: string) {
    this.author = { name, icon_url, url }
    return this
  }

  setTitle(title: string) {
    this.title = title
    return this
  }

  setDescription(description: string) {
    this.description = description.toString().substring(0, 2048)
    return this
  }

  setThumbnail(url: string) {
    this.thumbnail = { url }
    return this
  }

  setFooter(text: string, icon_url?: string) {
    this.footer = {
      text: text.toString().substring(0, 2048),
      icon_url
    }
    return this
  }

  setUrl(url: string) {
    this.url = url
    return this
  }

  setImage(url: string) {
    this.image = { url }
    return this
  }

  setTimestamp(timestamp = new Date()) {
    this.timestamp = timestamp
    return this
  }

  setColor(color?: string) {
    if (typeof color !== 'string') throw new Error(`Unexpected type ${typeof color} while building the embed`)
    color = color.toUpperCase()
    const DEFAULT_COLORS: any = {
      DEFAULT: 0x7DAFFF,
      ERROR: 0xFA704D,
      MODERATION: 0xFF4A4A,
      LEAVE: 0xBDBDBD,
      WELCOME: 0xB9FFA3
    }

    if (!color) color = null
    this.color = DEFAULT_COLORS[color] ?? parseInt(color.replace('#', ''), 16)
    return this
  }

  addField(name: string, value: string, inline?: boolean) {
    if (!name || this.fields.length >= 25) return this
    if (!value) return false
    this.fields.push({ name: name.toString().substring(0, 256), value: value.toString().substring(0, 1024), inline })
    return this
  }

  addBlankField() {
    this.addField('\u200B', '\u200B')
    return this
  }

  build(content?: string) {
    return { content, embeds: [this] }
  }
}