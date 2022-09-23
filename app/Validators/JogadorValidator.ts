import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class JogadorValidator {
  public cadastrar() {
    const messages: Object = {
      required: 'O {{field}} é obrigatório!',
    }

    const postSchema = schema.create({
      nome_personagem: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
      nome_jogador: schema.string({ trim: true }, [rules.required(), rules.maxLength(1000)]),
      nivel_jogador: schema.number(),
      forca_jogador: schema.number([rules.required()]),
      destreza_jogador: schema.number([rules.required()]),
      constituicao_jogador: schema.number([rules.required()]),
      inteligencia_jogador: schema.number([rules.required()]),
      sabedoria_jogador: schema.number([rules.required()]),
      carisma_jogador: schema.number([rules.required()]),
      ponto_xp: schema.number(),
      foto_personagem: schema.string.optional(),
      valor_total: schema.number(),
    })
    return { schema: postSchema, messages }
  }

  public editar() {
    const postSchema = schema.create({
      nome_personagem: schema.string({ trim: true }, [rules.maxLength(50)]),
      nome_jogador: schema.string({ trim: true }, [rules.maxLength(1000)]),
      nivel_jogador: schema.number(),
      forca_jogador: schema.number(),
      destreza_jogador: schema.number(),
      constituicao_jogador: schema.number(),
      inteligencia_jogador: schema.number(),
      sabedoria_jogador: schema.number(),
      carisma_jogador: schema.number(),
      ponto_xp: schema.number(),
      foto_personagem: schema.string.optional(),
      valor_total: schema.number(),
    })
    return { schema: postSchema }
  }
}
