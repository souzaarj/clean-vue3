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
  const sut = ValidationComposite.build(fieldValidationSpy)

  return {
    sut,
    fieldValidationSpy,
  }
}

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpy } = makeSut(fieldName)
    const firstErrorMessage = faker.random.word()
    fieldValidationSpy[0].error = new Error(firstErrorMessage)
    fieldValidationSpy[1].error = new Error(faker.random.word())
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(firstErrorMessage)
  })

  test('should return falsy if validation success', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
