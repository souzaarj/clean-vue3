import { ValidationBuilder } from '@/validation/validators/builder'
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('should return RequireFieldValidation ', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return EmailValidation ', () => {
    const validations = ValidationBuilder.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('should return MinLengthValidation ', () => {
    const validations = ValidationBuilder.field('any_field')
      .minLength(5)
      .build()
    expect(validations).toEqual([new MinLengthValidation('any_field', 5)])
  })
})
