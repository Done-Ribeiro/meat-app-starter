import * as jsonServer from 'json-server';
// importando para tipar e ter ajuda do compilador
import { Express } from 'express'
// modulo capaz de ler arquivos do disco
import * as fs from 'fs'
// protocolo https
import * as https from 'https'
// importando o handleAuthentication
import { handleAuthentication } from './auth';

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// ao inves de passar funcao para o login com req e resp --> passa o handleAuthentication
// middleware para login
server.post('/login', handleAuthentication)

// Use default router
server.use(router)

// referenciando a leitura das chaves
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

// criando servidor https
// trocando a porta de 3000 ==> 3001 por conta da mudanca de protocolo
https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on https://localhost:3001')
})
