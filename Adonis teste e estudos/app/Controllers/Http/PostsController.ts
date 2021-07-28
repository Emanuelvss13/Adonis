import { schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import auth from 'App/Models/Auth'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index ({}: HttpContextContract) {
    try {
      const posts = await Post.all()

      return posts
    } catch (error) {
      return error
    }
  }

  public async create ({request, params}: HttpContextContract) {
    try {
      const id = params.id
      let url = request.input('url')
      let title = request.input('title')
      let description = request.input('description')

      const user = await auth.find(id)

      if(user){
        const post = new Post()

        post.title = title
        post.description = description
        post.url = url
        post.user_id = id

        await post.save()

        return post
      } else {
        return new Error('Insira um usuario válido')
      }

    } catch (error) {
      return error
    }


  }

  public async show({params}: HttpContextContract){
    try {
      const post = await Post.findOrFail(params.id)

      return post
    } catch (error) {
      return error
    }
  }

  public async update ({request, params}: HttpContextContract) {
    const {id} = params

    const CreatePost = schema.create({
      url: schema.string.optional(),
      title: schema.string.optional(),
      description: schema.string.optional()
    })

    try {
      const payload = await request.validate({schema: CreatePost})

      const post = await Post.findOrFail(id)

      await post.merge(payload)

      await post.save()

      return post
    } catch (error) {
      return error
    }

  }

  public async destroy ({params}: HttpContextContract) {
    try {
      const post = await Post.findOrFail(params.id)

      await post.delete()

      return post
    } catch (error) {
      return error
    }

  }

  public async byUser ({params}: HttpContextContract) {
    try {
      const id = params.id

      const posts = Post.query().where('user_id', '=', id)

      return posts

    } catch (error) {
      return error
    }

  }
}

