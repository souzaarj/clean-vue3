import { ValidationBuilder } from '@/validation/validators/builder'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators'
import faker from 'faker'

describe('ValidationBuilder', () => {
  test('should return RequireFieldValidation ', () => {
    const field = faker.random.word()
    const validations = ValidationBuilder.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('should return EmailValidation ', () => {
    const field = faker.random.word()
    const validations = ValidationBuilder.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('should return MinLengthValidation ', () => {
    const field = faker.random.word()
    const length = faker.datatype.number()
    const validations = ValidationBuilder.field(field).minLength(length).build()
    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  test('should return a list of validations', () => {
    const field = faker.random.word()
    const length = faker.datatype.number()
    const validations = ValidationBuilder.field(field)
      .required()
      .minLength(length)
      .email()
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
    ])
  })
})
