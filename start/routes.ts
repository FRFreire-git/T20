import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('defesa', 'DefesasController.listar')
  Route.get('defesa/:id?', 'DefesasController.listar')
  Route.post('defesa', 'DefesasController.cadastrar')
  Route.put('defesa/:id', 'DefesasController.atualizar')
  Route.delete('defesa/:id', 'DefesasController.apagar')
}).prefix('api/')
