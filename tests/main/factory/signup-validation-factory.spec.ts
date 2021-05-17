import { makeSignupValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'

describe('SignupValidationFactory', () => {
  test('should make compose ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('name').required().minLength(5).build(),
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().minLength(2).build(),
        ...ValidationBuilder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build(),
      ])
    )
  })
})
