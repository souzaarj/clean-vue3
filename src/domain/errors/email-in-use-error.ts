export class EmailInUseError extends Error {
  constructor() {
    super('O e-mail informado já está cadastrado, favor verificar')
    this.name = 'EmailInUseError'
  }
}
