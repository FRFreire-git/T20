import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Background from 'App/Models/TbBackground'
import Validators from 'App/Validators/BackgroundValidator'
import CustomResponse from 'App/Utils/CustomResponse'

export default class BackgroundsController {
  protected validators: Validators
  protected customResponse: CustomResponse

  constructor() {
    this.validators = new Validators()
    this.customResponse = new CustomResponse()
  }

  public async listar({ request, response, params }: HttpContextContract) {
    try {
      const id = params.id_background
      const dados = request.qs()

      if (id) {
        const resultado = await Background.query().where('id_background', id).first()
        if (!resultado) {
          return this.customResponse.erro(response, 'Background não encontrado.', [])
        }
        return this.customResponse.sucesso(response, 'Background listado com sucesso!', resultado)
      }

      const query = Background.query()

      if (dados.id) {
        query.where('id_background', '=', dados.id)
      }

      if (dados.titulo) {
        query.where('titulo', 'LIKE', '%' + dados.titulo.toUpperCase() + '%')
      }

      if (dados.page) {
        const retorno = await query
          .orderBy('id', 'asc')
          .paginate(dados.page ? dados.page : 1, dados.per_page ? dados.per_page : 10)

        return this.customResponse.sucesso(response, 'Background listado com sucesso!', retorno)
      }

      const retorno = await query.exec()

      return this.customResponse.sucesso(response, 'Backgrounds listados com sucesso!', retorno)
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public async cadastrar({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(this.validators.cadastrar())
      let background: Background = new Background()

      background.titulo = payload.titulo.toUpperCase()
      background.subtitulo = payload.subtitulo.toUpperCase()
      background.historia = payload.historia.toUpperCase()
      background.aparencia = payload.aparencia.toUpperCase()
      await background.save()

      return this.customResponse.sucesso(response, 'Item cadastrado com sucesso!', background)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao cadastrar o item!', error, 500)
    }
  }

  public async editar({ request, params, response }: HttpContextContract) {
    try {
      const payload = await request.validate(this.validators.editar())
      const id = params.id
      let background = await Background.findOrFail(id)

      if (!background) {
        return this.customResponse.erro(response, 'Item não encontrado!', 400)
      }

      background.merge(payload)

      await background.save()

      return this.customResponse.sucesso(response, 'Item editado com sucesso!', background)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao editar o item!', error, 500)
    }
  }

  public async deletar({ response, params }: HttpContextContract) {
    try {
      let background: Background | null

      background = await Background.findOrFail(params.id)

      if (!background) {
        return this.customResponse.erro(response, 'Item não encontrado!', 400)
      }

      await background.delete()

      return this.customResponse.sucesso(response, 'Item excluido com sucesso!', background)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao excluir o item!', error, 500)
    }
  }
}
