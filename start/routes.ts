import Route from '@ioc:Adonis/Core/Route'
import JogadoresController from 'App/Controllers/Http/JogadoresController'

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

  //Background
  Route.get('background', 'BackgroundsController.listar')
  Route.get('background/:id?', 'BackgroundsController.listar')
  Route.post('background', 'BackgroundsController.cadastrar')
  Route.put('background/:id', 'BackgroundsController.editar')
  Route.delete('background/:id', 'BackgroundsController.deletar')

  //Jogador
  Route.get('jogador', 'JogadoresController.listar')
  Route.get('jogador/:id?', 'JogadoresController.listar')
  Route.post('upload', async (ctx) => {
    return new JogadoresController().handleFileUpload(ctx)
  })
  Route.post('jogador', 'JogadoresController.cadastrar')
  Route.put('jogador/:id', 'JogadoresController.editar')
  Route.delete('jogador/:id', 'JogadoresController.deletar')
}).prefix('api/')
