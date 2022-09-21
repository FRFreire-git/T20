export default class CustomResponse {
  public sucesso(response: any, mensagem: string, resultados: object | null, codigo_http = 200) {
    response.status(codigo_http)
    return response.send({
      sucesso: true,
      mensagem,
      resultados,
    })
  }

  public erro(response: any, mensagem: string, erro: any, codigo_http = 500) {
    if (erro?.message?.includes('E_VALIDATION_FAILURE')) {
      response.status(400)
      return response.send({
        sucesso: false,
        mensagem,
        resultados: erro?.messages?.errors,
        erro_de_validacao: true,
      })
    }

    response.status(codigo_http)
    return response.send({
      sucesso: false,
      mensagem,
      resultados: erro.message,
      erro_de_validacao: false,
    })
  }
}
