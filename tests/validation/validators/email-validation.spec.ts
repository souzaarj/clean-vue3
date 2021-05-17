import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (field: string): EmailValidation => {
  return new EmailValidation(field)
}

describe('EmailValidation', () => {
  test('should return error if e-mail is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.words() })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const result = sut.validate({ [field]: faker.internet.email() })
    expect(result).toBeFalsy()
  })
})
