import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  log: () => import('App/Middleware/LogRequest'),
  guard: () => import('App/Middleware/Guard')
})
