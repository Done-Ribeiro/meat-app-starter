// pra ajudar na tipagem
import { Request, Response } from "express"
// tipando usuario e simulando conexao com banco de dados
import { User, users } from "./users"

// criando funcao para fazer a autenticacao do login
// este codigo ira processar o post que fizemos pro /login
export const handleAuthentication = (req: Request, resp: Response) => {
  // pega o corpo do request
  const user: User = req.body
  // verifica se o usuario eh valido
  if (isValid(user)) {
    // se for atribui ao dbUser o usuario
    const dbUser: User = users[user.email]
    // resposta da aplicacao
    resp.json({ name: dbUser.name, email: dbUser.email })
  } else {
    resp.status(403).json({ message: 'Dados inválidos.' })
  }

  function isValid(user: User): boolean {
    // se o usuario nao existe retorna false
    if (!user) {
      return false
    }
    // obter dados do obj users passando o user.email
    const dbUser = users[user.email]
    // se eke existir e o login existir no "BD" valida
    return dbUser !== undefined && dbUser.matches(user)
  }

}
