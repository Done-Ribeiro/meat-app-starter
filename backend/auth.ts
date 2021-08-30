import { Request, Response } from "express"// pra ajudar na tipagem
import { User, users } from "./users"// tipando usuario e simulando conexao com banco de dados
import * as jwt from 'jsonwebtoken'// biblioteca que cria tokens --> ja previamente declarada no package.json
import { apiConfig } from "./api-config"//local onde esta nossa senha base para gerar o token

// criando funcao para fazer a autenticacao do login
// este codigo ira processar o post que fizemos pro /login
export const handleAuthentication = (req: Request, resp: Response) => {
  const user: User = req.body// pega o corpo do request
  if (isValid(user)) {// verifica se o usuario eh valido
    const dbUser: User = users[user.email]// se for atribui ao dbUser o usuario
    const token = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, apiConfig.secret)/* criando token --> {sub-> destinatario, iss-> remetente}, senha_do_token->''
                                                                                          desta forma nao compartilhamos o passw com o client ('meat-api-password') --> o que impede de gerar chaves
                                                                                        */
    resp.json({ name: dbUser.name, email: dbUser.email,// resposta da aplicacao
      accessToken: token// passo o token na resposta para o usuario
    })
  } else {
    resp.status(403).json({ message: 'Dados inválidos.' })
  }

  function isValid(user: User): boolean {
    if (!user) {// se o usuario nao existe retorna false
      return false
    }
    
    const dbUser = users[user.email]// obter dados do obj users passando o user.email
    return dbUser !== undefined && dbUser.matches(user) // se ele existir e o login existir no "BD" valida
  }

}
