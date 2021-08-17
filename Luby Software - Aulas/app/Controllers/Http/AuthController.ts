import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login ({response, request, auth}: HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')

    try{
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch(error){
      return response.badRequest(error)
    }
  }
}
