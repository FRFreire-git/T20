import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  //Defesa
  Route.get('defesa', 'DefesasController.listar')
  Route.get('defesa/:id?', 'DefesasController.listar')
  Route.post('defesa', 'DefesasController.cadastrar')
  Route.put('defesa/:id', 'DefesasController.editar')
  Route.delete('defesa/:id', 'DefesasController.deletar')

  //Arma
  Route.get('arma', 'ArmasController.listar')
  Route.get('arma/:id?', 'ArmasController.listar')
  Route.post('arma', 'ArmasController.cadastrar')
  Route.put('arma/:id', 'ArmasController.editar')
  Route.delete('arma/:id', 'ArmasController.deletar')
}).prefix('api/')
