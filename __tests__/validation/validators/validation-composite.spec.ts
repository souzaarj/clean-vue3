import { ValidationComposite } from '@/validation/validators/validation-composite'
import { FieldValidationSpy } from '@/tests/validation/mocks/mock-field-validation'
import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpy: FieldValidationSpy[]
}

const makeSut = (field: string): SutTypes => {
  const fieldValidationSpy = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field),
  ]
  const sut = new ValidationComposite(fieldValidationSpy)

  return {
    sut,
    fieldValidationSpy,
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const field = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(field)
    const firstErrorMessage = faker.random.word()
    fieldValidationSpy[0].error = new Error(firstErrorMessage)
    fieldValidationSpy[1].error = new Error(faker.random.word())
    const error = sut.validate(field, faker.random.word())
    expect(error).toBe(firstErrorMessage)
  })

  test('should return error if any validation fails', () => {
    const field = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(field)
    const firstErrorMessage = faker.random.word()
    fieldValidationSpy[0].error = new Error(firstErrorMessage)
    fieldValidationSpy[1].error = new Error(faker.random.word())
    const error = sut.validate(field, faker.random.word())
    expect(error).toBe(firstErrorMessage)
  })
})
