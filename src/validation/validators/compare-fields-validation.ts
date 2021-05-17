import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}
  validate(input: any): Error | null {
    if (input[this.field] === input[this.fieldToCompare]) return null

    return new InvalidFieldError()
  }
}
