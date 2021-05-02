import { ValidationComposite } from '@/validation/validators/validation-composite'
import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { makeLoginValidation } from '@/main/factories/pages/login-validation-factory'

describe('LoginValidationFactory', () => {
  test('should make compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().minLength(2).build(),
      ])
    )
  })
})
