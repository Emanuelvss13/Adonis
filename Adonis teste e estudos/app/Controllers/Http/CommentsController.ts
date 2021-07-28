import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Post from 'App/Models/Post'

export default class CommentsController {
  public async index ({}: HttpContextContract) {
    const comment = await Comment.all()

    return comment

  }

  public async create ({params, request, response}: HttpContextContract){
    const {id} = params
    const data = request.input('comment')

    const post = await Post.find(id)

    if(!post){
      response.badRequest('Post não encontrado')
    }

    try {
      const _comment = new Comment()

      _comment.comment = data
      _comment.post_id = id

      await _comment.save()

      return _comment
    } catch (error) {
      return error
    }
  }

  public async show ({params, response}: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(params.id)

      return comment
    } catch (error) {
      response.notFound()
    }
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({params, response}: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(params.id)

      await comment.delete()

      return comment
    } catch (error) {
      response.notFound()
    }
  }
}
