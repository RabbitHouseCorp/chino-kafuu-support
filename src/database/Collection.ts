export class Collection {
  model: any
  constructor(model: any) {
    this.model = model
  }

  async findOneById(id: string) {
    return await this.model.findOne({ id })
  }

  async getOrCreate(id: string, defaultValues: object) {
    if (!id) return undefined
    let data = await this.findOneById(id)
    if (!data) {
      data = this.model({ id, ...defaultValues }).save()
    }

    return data
  }

  async getAndDelete(id: string) {
    const data = await this.findOneById(id)
    if (!data) return undefined

    return this.model.findByIdAndDelete(id)
  }
}