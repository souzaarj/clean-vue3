import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (): EmailValidation => {
  return new EmailValidation(faker.random.words())
}

describe('EmailValidation', () => {
  test('should return error if e-mail is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.words())
    expect(error).toEqual(new InvalidFieldError())
  })

  test('should return falsy if email is valid', () => {
    const sut = makeSut()
    const result = sut.validate(faker.internet.email())
    expect(result).toBeFalsy()
  })
})
