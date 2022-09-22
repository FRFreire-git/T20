import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class BackgroundValidator {
  public cadastrar() {
    const messages: Object = {
      required: 'O {{field}} é obrigatório!',
    }

    const postSchema = schema.create({
      titulo: schema.string({ trim: true }, [rules.maxLength(50)]),
      subtitulo: schema.string({ trim: true }, [rules.maxLength(100)]),
      historia: schema.string({ trim: true }, [rules.maxLength(5000)]),
      aparencia: schema.string({ trim: true }, [rules.maxLength(5000)]),
    })
    return { schema: postSchema, messages }
  }

  public editar() {
    const postSchema = schema.create({
      titulo: schema.string({ trim: true }, [rules.maxLength(50)]),
      subtitulo: schema.string({ trim: true }, [rules.maxLength(100)]),
      historia: schema.string({ trim: true }, [rules.maxLength(5000)]),
      aparencia: schema.string({ trim: true }, [rules.maxLength(5000)]),
    })
    return { schema: postSchema }
  }
}
