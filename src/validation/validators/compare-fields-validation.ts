import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly valueToCompare: string
  ) {}
  validate(value: string): Error | null {
    if (value === this.valueToCompare) return null

    return new InvalidFieldError()
  }
}
