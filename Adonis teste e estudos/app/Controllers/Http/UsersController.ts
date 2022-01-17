import Logger from '@ioc:Adonis/Core/Logger';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, validator } from '@ioc:Adonis/Core/Validator'
import Auth from 'App/Models/Auth'
import ApiTokens from 'Database/migrations/1624301147308_api_tokens';
import ApiToken from 'App/Models/ApiToken';

export default class UsersController {
  public async index ({}: HttpContextContract) {
    try {
      const usesrs = await Auth.all()

      return usesrs
    } catch (error) {
      return error
    }
  }

  public async create ({request, response}: HttpContextContract) {
    try {
      const CreateUser = schema.create({
        email: schema.string({}, [
          rules.email(),
          rules.unique({table:'auth', column:'email'})
        ]),
        password: schema.string()
      })

      const messages = {
        required: 'O campo {{field}} é obrigatoria ao criar uma nova conta',
        'email.unique': 'Email ja cadastrado'
      }

      const payload = await request.validate({schema: CreateUser, messages, reporter: validator.reporters.api})

      const user = await Auth.create(payload)

      response.status(201).json(user)
    } catch (error) {
      response.badRequest(error["messages"]["errors"][0])
    }
  }

  public async show ({params}: HttpContextContract) {
    const {id} = params

    try{
      const user = await Auth.findOrFail(id)

      return user
    } catch(error){
      return error
    }

  }

  public async update ({request, params, response}: HttpContextContract) {

    const {id} = params

    if(!id){
      response.badRequest('Envie o parametro id na url corretamente')
    }

    const UpdateUser = schema.create({
      email: schema.string.optional({}, [
        rules.email(),
        rules.unique({table: 'auth', column:'email'})
      ]),
      password: schema.string()
    })

    const messages = {
      required: 'O campo {{field}} é obrigatoria ao atualizar uma conta',
      'email.unique': 'Email ja cadastrado'
    }

    try {
      const user = Auth.findOrFail(id)

      const payload = await request.validate({schema: UpdateUser, messages})

      await (await user).merge(payload)

      await (await user).save()

      return user
    } catch (error) {
      return error
    }

  }

  public async destroy ({params}: HttpContextContract) {
    try {
      const user = await Auth.findOrFail(params.id)

      await user.delete()

      return user
    } catch (error) {
      return error
    }
  }

  public async login({auth, request, response }: HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await Auth.findByOrFail('email', email)
      const token = await auth.use('api').attempt(email, password)
      return {token}
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async loginv2({request, response}: HttpContextContract){
    const email = request.input('email')
    const password = request.input('password')

    try{
      const user = await Auth.findByOrFail('email', email)
      const number = user.$primaryKeyValue
      const tokens = await ApiToken.query().where('user_id', Number(number))
      response.send(tokens)
    }
  }
}
