import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { RequiredFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const result = sut.validate({ [field]: faker.random.word() })
    expect(result).toBeFalsy()
  })
})
