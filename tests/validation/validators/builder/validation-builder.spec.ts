import { ValidationBuilder } from '@/validation/validators/builder'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
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

  test('should return CompareFieldValidation ', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const validations = ValidationBuilder.field(field)
      .sameAs(fieldToCompare)
      .build()
    expect(validations).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ])
  })

  test('should return a list of validations', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const length = faker.datatype.number()
    const validations = ValidationBuilder.field(field)
      .required()
      .email()
      .minLength(length)
      .sameAs(fieldToCompare)
      .build()
    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, length),
      new CompareFieldsValidation(field, fieldToCompare),
    ])
  })
})
