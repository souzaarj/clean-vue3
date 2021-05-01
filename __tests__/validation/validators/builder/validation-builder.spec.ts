import { ValidationBuilder } from '@/validation/validators/builder'
import {
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validators'

describe('ValidationBuilder', () => {
  test('should return requireFieldValidation ', () => {
    const validations = ValidationBuilder.field('any_field').required().build()
    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('should return emailValidation ', () => {
    const validations = ValidationBuilder.field('any_field').email().build()
    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})
