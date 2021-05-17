import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  fieldName: string
  input: any
  errorMessage: string
  validate(fieldName: string, input: any): string {
    this.fieldName = fieldName
    this.input = input
    return this.errorMessage
  }
}
