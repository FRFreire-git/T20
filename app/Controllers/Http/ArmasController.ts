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

  public async cadastrar({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(this.validators.cadastrar())
      let arma: Arma = new Arma()

      arma.nome_arma = payload.nome_arma.toUpperCase()
      arma.descricao_arma = payload.descricao_arma.toUpperCase()
      arma.municao_arma = payload.municao_arma
      arma.habilidade_arma = payload.habilidade_arma.toUpperCase()
      arma.preco_arma = payload.preco_arma
      arma.dano_arma = payload.dano_arma
      arma.critico_arma = payload.critico_arma
      arma.alcance_arma = payload.alcance_arma.toUpperCase()
      arma.peso_arma = payload.peso_arma
      arma.tipo_ataque = payload.tipo_ataque.toUpperCase()
      arma.tipo_arma = payload.tipo_arma.toUpperCase()
      arma.qt_mao = payload.qt_mao
      await arma.save()

      return this.customResponse.sucesso(response, 'Item cadastrado com sucesso!', arma)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao cadastrar o item!', error, 500)
    }
  }

  public async editar({ request, params, response }: HttpContextContract) {
    try {
      const payload = await request.validate(this.validators.editar())
      const id = params.id
      let arma = await Arma.findOrFail(id)

      if (!arma) {
        return this.customResponse.erro(response, 'Item não encontrado!', 400)
      }

      arma.merge(payload)

      await arma.save()

      return this.customResponse.sucesso(response, 'Item editado com sucesso!', arma)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao editar o item!', error, 500)
    }
  }

  public async deletar({ response, params }: HttpContextContract) {
    try {
      let arma: Arma | null

      arma = await Arma.findOrFail(params.id)

      if (!arma) {
        return this.customResponse.erro(response, 'Item não encontrado!', 400)
      }

      await arma.delete()

      return this.customResponse.sucesso(response, 'Item excluido com sucesso!', arma)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao excluir o item!', error, 500)
    }
  }
}
