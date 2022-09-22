import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class DefesaValidator {
  public cadastrar() {
    const messages: Object = {
      required: 'O {{field}} é obrigatório!',
    }

    const postSchema = schema.create({
      nome_defesa: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
      descricao_defesa: schema.string({ trim: true }, [rules.maxLength(1000)]),
      tipo_defesa: schema.string({ trim: true }, [rules.maxLength(50)]),
      peso_defesa: schema.string({ trim: true }, [rules.maxLength(50)]),
      bonus_ca: schema.number(),
      penalidade_defesa: schema.string({ trim: true }, [rules.maxLength(500)]),
      preco_defesa: schema.number(),
    })
    return { schema: postSchema, messages }
  }

  public editar() {
    const postSchema = schema.create({
      nome_defesa: schema.string({ trim: true }, [rules.maxLength(50)]),
      descricao_defesa: schema.string({ trim: true }, [rules.maxLength(1000)]),
      tipo_defesa: schema.string({ trim: true }, [rules.maxLength(50)]),
      peso_defesa: schema.string({ trim: true }, [rules.maxLength(50)]),
      bonus_ca: schema.number(),
      penalidade_defesa: schema.string({ trim: true }, [rules.maxLength(500)]),
      preco_defesa: schema.number(),
    })
    return { schema: postSchema }
  }
}
