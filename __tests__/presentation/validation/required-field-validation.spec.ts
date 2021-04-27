import { RequiredFieldValidation } from '@/validation/required-field-validation'
import { RequiredFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(faker.database.column())
}

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const sut = makeSut()
    const result = sut.validate(faker.random.word())
    expect(result).toBeFalsy()
  })
})
