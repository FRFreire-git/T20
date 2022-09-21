import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ArmaValidator {
  public cadastrar() {
    const messages: Object = {
      required: 'O {{field}} é obrigatório!',
    }

    const postSchema = schema.create({
      nome_arma: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
      descricao_arma: schema.string({ trim: true }, [rules.maxLength(1000)]),
      municao_arma: schema.number(),
      habilidade_arma: schema.string({ trim: true }, [rules.maxLength(1000)]),
      preco_arma: schema.number(),
      dano_arma: schema.string({ trim: true }, [rules.maxLength(50)]),
      critico_arma: schema.string({ trim: true }, [rules.maxLength(50)]),
      alcance_arma: schema.string({ trim: true }, [rules.maxLength(10)]),
      peso_arma: schema.number(),
      tipo_ataque: schema.string({ trim: true }, [rules.maxLength(50)]),
      tipo_arma: schema.string({ trim: true }, [rules.maxLength(50)]),
      qt_mao: schema.number(),
    })
    return { schema: postSchema, messages }
  }

  public editar() {
    const messages: Object = {
      required: 'O {{field}} é obrigatório!',
    }

    const postSchema = schema.create({
      nome_arma: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
      descricao_arma: schema.string({ trim: true }, [rules.maxLength(1000)]),
      municao_arma: schema.number(),
      habilidade_arma: schema.string({ trim: true }, [rules.maxLength(1000)]),
      preco_arma: schema.number(),
      dano_arma: schema.string({ trim: true }, [rules.maxLength(50)]),
      critico_arma: schema.string({ trim: true }, [rules.maxLength(50)]),
      alcance_arma: schema.string({ trim: true }, [rules.maxLength(10)]),
      peso_arma: schema.number(),
      tipo_ataque: schema.string({ trim: true }, [rules.maxLength(50)]),
      tipo_arma: schema.string({ trim: true }, [rules.maxLength(50)]),
      qt_mao: schema.number(),
    })
    return { schema: postSchema, messages }
  }
}
