import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Defesa from 'App/Models/TbDefesa'
import Validators from 'App/Validators/DefesaValidator'
import CustomResponse from 'App/Utils/CustomResponse'

export default class DefesasController {
  protected validators: Validators
  protected customResponse: CustomResponse

  constructor() {
    this.validators = new Validators()
    this.customResponse = new CustomResponse()
  }

  public async listar({ request, response, params }: HttpContextContract) {
    try {
      const id = params.id_defesa
      const dados = request.qs()

      if (id) {
        const resultado = await Defesa.query().where('id_defesa', id).first()
        if (!resultado) {
          return this.customResponse.erro(response, 'Item de defesa não encontrado.', [])
        }
        return this.customResponse.sucesso(
          response,
          'Item de defesa listado com sucesso!',
          resultado
        )
      }

      const query = Defesa.query()

      if (dados.id) {
        query.where('id_defesa', '=', dados.id)
      }

      if (dados.nome_defesa) {
        query.where('nome_defesa', 'LIKE', '%' + dados.nome_defesa.toUpperCase() + '%')
      }

      if (dados.page) {
        const retorno = await query
          .orderBy('id', 'asc')
          .paginate(dados.page ? dados.page : 1, dados.per_page ? dados.per_page : 10)

        return this.customResponse.sucesso(
          response,
          'Itens de defesa listados com sucesso!',
          retorno
        )
      }

      const retorno = await query.exec()

      return this.customResponse.sucesso(response, 'Itens de defesa listados com sucesso!', retorno)
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public async cadastrar({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(this.validators.cadastrar())
      let defesa: Defesa = new Defesa()

      defesa.nome_defesa = payload.nome_defesa.toUpperCase()
      defesa.descricao_defesa = payload.descricao_defesa.toUpperCase()
      defesa.tipo_defesa = payload.tipo_defesa.toUpperCase()
      defesa.peso_defesa = payload.peso_defesa
      defesa.bonus_ca = payload.bonus_ca
      defesa.penalidade_defesa = payload.penalidade_defesa
      await defesa.save()

      return this.customResponse.sucesso(response, 'Item cadastrado com sucesso!', defesa)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao cadastrar o item!', error, 500)
    }
  }

  public async editar({ request, params, response }: HttpContextContract) {
    try {
      const payload = await request.validate(this.validators.editar())
      const id = params.id
      let defesa = await Defesa.findOrFail(id)

      if (!defesa) {
        return this.customResponse.erro(response, 'Item não encontrado!', 400)
      }

      defesa.merge(payload)

      await defesa.save()

      return this.customResponse.sucesso(response, 'Item editado com sucesso!', defesa)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao editar o item!', error, 500)
    }
  }

  public async deletar({ response, params }: HttpContextContract) {
    try {
      let defesa: Defesa | null

      defesa = await Defesa.findOrFail(params.id)

      if (!defesa) {
        return this.customResponse.erro(response, 'Item não encontrado!', 400)
      }

      await defesa.delete()

      return this.customResponse.sucesso(response, 'Item excluido com sucesso!', defesa)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao excluir o item!', error, 500)
    }
  }
}
