export class Collection {
  model: any
  constructor(model: any) {
    this.model = model
  }

  async findOneById(_id: string) {
    return await this.model.findOne({ _id })
  }

  async getOrCreate(_id: string, defaultValues: object) {
    const data = await this.findOneById(_id)
    if (!data) {
      this.model({ _id, ...defaultValues }).save()
    }

    return data
  }

  async getAndDelete(_id: string) {
    const data = await this.findOneById(_id)
    if (!data) return undefined

    return this.model.findByIdAndDelete(_id)
  }
}
