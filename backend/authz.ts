import { Request, Response } from "express"
import * as jwt from 'jsonwebtoken'
import { apiConfig } from "./api-config"//local onde esta nossa senha base para gerar o token

// o next nao precisa tipar - pois eh so um callback pra dizer quando ta tudo ok
export const handleAuthorization = (req: Request, resp: Response, next) => {
  const token = extractToken(req)// atribui o token
  if (!token) {
    resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')//devolve um Header (para dizer que esperamos um token do tipo JWT)
    resp.status(401).json({ message: 'Você precisa se autenticar.' })
  } else {
    // verify espera os seguintes parametros --> token, password, ()=> de callback
    jwt.verify(token, apiConfig.secret, (error, decoded) => {
      if (decoded) {//se o token passou libera o acesso
        next()
      } else {
        resp.status(403).json({ message: 'Não autorizado.' })
      }
    })
  }
}

function extractToken(req: Request): string {
  let token = undefined
  if (req.headers && req.headers.authorization) {//se existe cabecalho && se existe token
    //Autorization: Bearer ZZZ.ZZZ.ZZZ
    const parts: string[] = req.headers.authorization.split(' ')/*cria um []~para guardar cada parte do token 
                                                                              metodo split(' ') dividide pelo espaco em branco o Bearer do Token*/
    if (parts.length === 2 && parts[0] === 'Bearer') {//se tiver token (2 partes) && primeira parte for a String -> 'Bearer'
      token = parts[1]//deixa somente o token dentro da variavel token | transformando de [key:value] -> variavel
    }
  }
  return token
}
