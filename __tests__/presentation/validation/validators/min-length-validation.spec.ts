import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/'
import faker from 'faker'

const makeSut = (minLength: number): MinLengthValidation => {
  return new MinLengthValidation(faker.database.column(), minLength)
}

describe('MinLengthValidation', () => {
  test('should returns error if value is invalid', () => {
    const minLength = 5
    const sut = makeSut(minLength)
    const error = sut.validate(faker.lorem.word(minLength - 1))
    expect(error).toEqual(new InvalidFieldError())
  })
})
