import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}
  validate(input: any): Error | null {
    const regexEmail = /^\S+@\S+\.\S+$/i
    if (regexEmail.test(input[this.field])) return null
    return new InvalidFieldError()
  }
}
