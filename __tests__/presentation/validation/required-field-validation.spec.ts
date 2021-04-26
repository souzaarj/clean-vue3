import { RequiredFieldValidation } from '@/validation/required-field-validation'
import { RequiredFieldError } from '@/validation/errors'
import faker from 'faker'

describe('RequiredFieldValidation', () => {
  test('should return error if filed is empty', () => {
    const sut = new RequiredFieldValidation(faker.random.word())
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
