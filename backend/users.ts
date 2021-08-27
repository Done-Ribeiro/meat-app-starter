export class User {
  constructor(public email: string,
              public name: string,
              private password: string) {}

  // metodo pra comparar usuarios do login
  matches(another: User): boolean {
    return another !== undefined  &&// se ele existir
           another.email === this.email &&// e as senhas forem iguais
           another.password === this.password // e os emails forem iguais
  }
}

export const users = {
  "juliana@gmail.com" : new User('juliana@gmail.com', 'Juliana', 'juliana23'),
  "amanda@gmail.com" : new User('amanda@gmail.com', 'Amanda', 'amanda21')
}