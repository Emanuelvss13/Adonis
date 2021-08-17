import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import geoip from 'geoip-lite'
var cloudinary = require('cloudinary');
import fs from 'fs'

const path = require('path')

cloudinary.config({
  cloud_name: 'emanuelvss13',
  api_key: '739236349528639',
  api_secret: 'BO20Kntd1fD7Xzz5MpVz1BlVyJE'
});

Route.get('/', async ({ view }) => {
  const html = await view.render('home', {
    greeting: 'Hello'
  })

  return html
}).middleware('log')

Route.get('user', "UsersController.index")
Route.get('user/:id', "UsersController.show")
Route.post('user', "UsersController.create")
Route.put('user/:id?', "UsersController.update")
Route.delete('user/:id', "UsersController.destroy")
Route.post('login', "UsersController.login")
Route.post('login2', "UsersController.loginv2")

Route.get('post', "PostsController.index")
Route.post('post/:id', "PostsController.create")
Route.get('post/user/:id', "PostsController.byUser")
Route.get('post/:id', "PostsController.show")
Route.put('post/:id?', "PostsController.update")
Route.delete('post/:id', "PostsController.destroy")

Route.get('dashboard', async ({ auth, response }) => {
  // try{
  //   await auth.use('api').authenticate()
  //   return auth.use('api').user
  // } catch(error){
  //   response.notAcceptable(error)
  // }

  //Code in midd

}).middleware('auth')

Route.post('logout', async({auth}) => {
  await auth.use('api').revoke()

  return{
    revoked: true
  }

})

Route.get('track', async({response, request}) => {
  var ip = "138.121.131.215";
  var geo = geoip.lookup(ip);
  if(geo.country !== 'BR'){
    response.send('not authorized')
  }  else {
    response.json(geo.country)
  }
})


Route.get('comment/', "CommentsController.index")
Route.get('comment/:id', "CommentsController.show")
Route.post('comment/:id', "CommentsController.create")
Route.delete('comment/:id', "CommentsController.destroy")


Route.get('download', async ({response}) => {
  // response.header('Content-type', 'image/png')
  const audio = path.resolve(__dirname, 'asd.reapeaks')
  response.attachment(audio)
})


Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.get('test', async({response}) => {
  response.send('<h1>Olá</h1>')
})


Route.post('send', async({request, response }) => {
  const coverImage = request.file('image')

  if (coverImage) {
    await coverImage.move(Application.startPath('uploads'))
  }

  if (coverImage) {
    await cloudinary.uploader.upload(coverImage.filePath, function(error, result) {console.log(result, error)});
  } else {
    return coverImage!.errors
  }

})

Route.get('receive', async({request, response}) => {
  // const name = request.input('name')

  // const image = await cloudinary.v2.api.resource('sample', result => result);


  // response.attachment(fs.createWriteStream('https://res.cloudinary.com/emanuelvss13/image/upload/v1628800027/sample.jpg', file));
})
