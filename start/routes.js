'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => ({ greeting: 'Hello world in JSON' }))

Route.group(() => {
  Route.resource('/posts', 'PostController')
  Route.resource('/users', 'UserController')

  Route.post('/assets', 'AssetController.upload')
  Route.get('/assets/:fileName', 'AssetController.show')
}).prefix('api/v1')
