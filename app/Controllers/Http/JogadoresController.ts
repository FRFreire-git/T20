import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Jogador from 'App/Models/Jogador'
import Validators from 'App/Validators/JogadorValidator'
import CustomResponse from 'App/Utils/CustomResponse'
import Application from '@ioc:Adonis/Core/Application'

export default class JogadoresController {
  protected validators: Validators
  protected customResponse: CustomResponse

  constructor() {
    this.validators = new Validators()
    this.customResponse = new CustomResponse()
  }

  public async listar({ request, response, params }: HttpContextContract) {
    try {
      const id = params.id_jogador
      const dados = request.qs()

      if (id) {
        const resultado = await Jogador.query().where('id_jogador', id).first()
        if (!resultado) {
          return this.customResponse.erro(response, 'Jogador não encontrado.', [])
        }
        return this.customResponse.sucesso(response, 'Jogador listado com sucesso!', resultado)
      }

      const query = Jogador.query()

      if (dados.id) {
        query.where('id_jogador', '=', dados.id)
      }

      if (dados.nome_jogador) {
        query.where('nome_jogador', 'LIKE', '%' + dados.nome_jogador.toUpperCase() + '%')
      }

      if (dados.nome_personagem) {
        query.where('nome_personagem', 'LIKE', '%' + dados.nome_personagem.toUpperCase() + '%')
      }

      if (dados.page) {
        const retorno = await query
          .orderBy('id', 'asc')
          .paginate(dados.page ? dados.page : 1, dados.per_page ? dados.per_page : 10)

        return this.customResponse.sucesso(response, 'Jogadores listados com sucesso!', retorno)
      }

      const retorno = await query.exec()

      return this.customResponse.sucesso(response, 'Jogadores listados com sucesso!', retorno)
    } catch (error) {
      console.error(error)
      return error
    }
  }

  public async cadastrar({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(this.validators.cadastrar())
      let jogador: Jogador = new Jogador()

      const fotoPersonagem = request.file('foto_personagem', {
        size: '5mb',
        extnames: ['jpg', 'png', 'gif'],
      })

      jogador.nome_jogador = payload.nome_jogador.toUpperCase()
      jogador.nome_personagem = payload.nome_personagem.toUpperCase()
      jogador.nivel_jogador = payload.nivel_jogador
      jogador.forca_jogador = payload.forca_jogador
      jogador.destreza_jogador = payload.destreza_jogador
      jogador.constituicao_jogador = payload.constituicao_jogador
      jogador.inteligencia_jogador = payload.inteligencia_jogador
      jogador.sabedoria_jogador = payload.sabedoria_jogador
      jogador.carisma_jogador = payload.carisma_jogador
      jogador.ponto_xp = payload.ponto_xp
      jogador.valor_total = payload.valor_total
      if (!fotoPersonagem || fotoPersonagem.isValid) {
        return this.customResponse.erro(response, 'Imagem não é válida', fotoPersonagem)
      }

      // jogador.foto_personagem = fotoPersonagem

      await jogador.save()

      return this.customResponse.sucesso(response, 'Jogador cadastrado com sucesso!', jogador)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao cadastrar o jogador!', error, 500)
    }
  }

  public async editar({ request, params, response }: HttpContextContract) {
    try {
      const payload = await request.validate(this.validators.editar())
      const id = params.id
      let jogador = await Jogador.findOrFail(id)

      if (!jogador) {
        return this.customResponse.erro(response, 'Jogador não encontrado!', 400)
      }

      jogador.merge(payload)

      await jogador.save()

      return this.customResponse.sucesso(response, 'Jogador editado com sucesso!', jogador)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao editar o jogador!', error, 500)
    }
  }

  public async deletar({ response, params }: HttpContextContract) {
    try {
      let jogador: Jogador | null

      jogador = await Jogador.findOrFail(params.id)

      if (!jogador) {
        return this.customResponse.erro(response, 'Jogador não encontrado!', 400)
      }

      await jogador.delete()

      return this.customResponse.sucesso(response, 'Jogador excluído com sucesso!', jogador)
    } catch (error) {
      return this.customResponse.erro(response, 'Houve um erro ao excluir o item!', error, 500)
    }
  }

  public async handleFileUpload({ request, response }: HttpContextContract) {
    const fotoPersonagem = request.file('foto_personagem', {
      size: '5mb',
      extnames: ['png', 'gif', 'jpg'],
    })

    if (!fotoPersonagem || fotoPersonagem.isValid) {
      return this.customResponse.erro(response, 'Imagem não é válida', fotoPersonagem)
    }

    await fotoPersonagem.move(Application.tmpPath('foto-personagem-upload'))

    console.log(fotoPersonagem)

    return response.send({
      message: 'Success',
    })
  }
}
