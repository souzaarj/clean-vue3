import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationSpy implements FieldValidation {
  error: Error
  constructor(readonly field: string) {}
  validate(value: string): Error | null {
    return this.error || null
  }
}
