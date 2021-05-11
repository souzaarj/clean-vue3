import { CompareFieldsValidation } from '@/validation/validators/compare-fields-validation'
import { InvalidFieldError } from '@/validation/errors/invalid-field-error'
import faker from 'faker'

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word()
    const sut = makeSut(valueToCompare)
    const result = sut.validate(valueToCompare)
    expect(result).toBeFalsy()
  })
})