import { FieldValidation } from '@/validation/protocols/field-validation'

export class FieldValidationSpy implements FieldValidation {
  error: Error
  constructor(readonly field: string) {}
  validate(input: any): Error | null {
    return this.error || null
  }
}
