import { RequiredFieldValidation } from '@/validation/required-field-validation'
import { RequiredFieldError } from '@/validation/errors'
import faker from 'faker'

describe('RequiredFieldValidation', () => {
  test('should return error if field is empty', () => {
    const sut = new RequiredFieldValidation(faker.random.word())
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })

  test('should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidation(faker.random.word())
    const result = sut.validate(faker.random.word())
    expect(result).toBeFalsy()
  })
})
