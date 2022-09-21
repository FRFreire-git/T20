import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  //Defesa
  Route.get('defesa', 'DefesasController.listar')
  Route.get('defesa/:id?', 'DefesasController.listar')
  Route.post('defesa', 'DefesasController.cadastrar')
  Route.put('defesa/:id', 'DefesasController.atualizar')
  Route.delete('defesa/:id', 'DefesasController.apagar')

  //Arma
  Route.get('arma', 'ArmasController.listar')
  Route.get('arma/:id?', 'ArmasController.listar')
  Route.post('arma', 'ArmasController.cadastrar')
  Route.put('arma/:id', 'ArmasController.atualizar')
  Route.delete('arma/:id', 'ArmasController.apagar')
}).prefix('api/')
