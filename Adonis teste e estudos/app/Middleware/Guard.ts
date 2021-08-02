import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guard {
  public async handle ({}: HttpContextContract, next: () => Promise<void>, guards?: String[]) {
    console.log(guards)
    await next()
  }
}
