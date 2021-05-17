import { ValidationBuilder } from '@/validation/validators/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeSignupValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('name').required().minLength(5).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().minLength(2).build(),
    ...ValidationBuilder.field('passwordConfirmation')
      .required()
      .sameAs('password')
      .build(),
  ])
