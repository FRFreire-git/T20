import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Arma from 'App/Models/TbArma'
import Validators from 'App/Validators/ArmaValidator'
import CustomResponse from 'App/Utils/CustomResponse'

export default class ArmasController {
  protected validators: Validators
  protected customResponse: CustomResponse

  constructor() {
    this.validators = new Validators()
    this.customResponse = new CustomResponse()
  }

  public async listar({ request, response, params }: HttpContextContract) {
    try {
      const id = params.id_arma
      const dados = request.qs()

      if (id) {
        const resultado = await Arma.query().where('id_arma', id).first()
        if (!resultado) {
          return this.customResponse.erro(response, 'Arma não encontrada.', [])
        }
        return this.customResponse.sucesso(response, 'Arma listada com sucesso!', resultado)
      }

      const query = Arma.query()

      if (dados.id) {
        query.where('id_arma', '=', dados.id)
      }

      if (dados.nome_arma) {
        query.where('nome_arma', 'LIKE', '%' + dados.nome_arma.toUpperCase() + '%')
      }

      if (dados.page) {
        const retorno = await query
          .orderBy('id', 'asc')
          .paginate(dados.page ? dados.page : 1, dados.per_page ? dados.per_page : 10)

        return this.customResponse.sucesso(response, 'Armas listadas com sucesso!', retorno)
      }

      const retorno = await query.exec()

      return this.customResponse.sucesso(response, 'Armas listadas com sucesso!', retorno)
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
