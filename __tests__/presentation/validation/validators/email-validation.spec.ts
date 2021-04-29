import { EmailValidation } from '@/validation/validators'
import { InvalidFieldError } from '@/validation/errors'
import faker from 'faker'

const makeSut = (): EmailValidation => {
  return new EmailValidation(faker.internet.email())
}

describe('EmailValidation', () => {
  test('should return error if e-mail is invalid', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })
})
