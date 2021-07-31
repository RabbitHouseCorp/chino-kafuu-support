export class Collection {
  model: any
  constructor(model: any) {
    this.model = model
  }

  findOneById(id: string) {
    return this.findOne({ id })
  }

  findOne(...args: any) {
    return this.model.findOne(...args)
  }

  async getOrCreate(id: string, defaultValues: object) {
    const data = await this.findOneById(id)
    if (!data) {
      this.model({ id, ...defaultValues }).save()
    }

    return data
  }

  async getAndDelete(id: string) {
    const data = await this.findOneById(id)
    if (!data) return undefined

    return this.model.findByIdAndDelete(id)
  }
}