export class InvalidFieldError extends Error {
  constructor() {
    super(`O valor informado é inválido`)
    this.name = 'InvalidFieldError'
  }
}
