import Route from '@ioc:Adonis/Core/Route'

Route.get('user', "UsersController.index")
Route.get('user/:id', "UsersController.show")
Route.post('user', "UsersController.create")
Route.put('user/:id?', "UsersController.update")
Route.delete('user/:id', "UsersController.destroy")
Route.post('login', "UsersController.login")

Route.get('post', "PostsController.index")
Route.post('post/:id', "PostsController.create")
Route.get('post/user/:id', "PostsController.byUser")
Route.get('post/:id', "PostsController.show")
Route.put('post/:id?', "PostsController.update")
Route.delete('post/:id', "PostsController.destroy")

Route.get('dashboard', async ({ auth, response }) => {
  try{
    await auth.use('api').authenticate()
    return auth.use('api').user
  } catch(error){
    response.notAcceptable(error)
  }

}).middleware('auth')

Route.post('logout', async({auth}) => {
  await auth.use('api').revoke()

  return{
    revoked: true
  }

})



Route.get('comment/', "CommentsController.index")
Route.get('comment/:id', "CommentsController.show")
Route.post('comment/:id', "CommentsController.create")
Route.delete('comment/:id', "CommentsController.destroy")
