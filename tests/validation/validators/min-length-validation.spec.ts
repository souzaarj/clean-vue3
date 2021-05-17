import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/'
import faker from 'faker'

const makeSut = (field: string, minLength: number): MinLengthValidation => {
  return new MinLengthValidation(field, minLength)
}

describe('MinLengthValidation', () => {
  test('should returns error if value is invalid', () => {
    const field = faker.database.column()
    const minLength = 5
    const sut = makeSut(field, minLength)
    const error = sut.validate({ [field]: faker.lorem.word(minLength - 1) })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should returns falsy if value is valid', () => {
    const field = faker.database.column()
    const minLength = 5
    const sut = makeSut(field, minLength)
    const result = sut.validate({ [field]: faker.lorem.word(minLength) })
    expect(result).toBeFalsy()
  })

  test('should returns falsy if field does not exist in schema', () => {
    const minLength = 5
    const sut = makeSut(faker.database.column(), minLength)
    const result = sut.validate({
      [faker.database.column()]: faker.lorem.word(minLength),
    })
    expect(result).toBeFalsy()
  })
})
