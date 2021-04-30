import { ValidationComposite } from '@/validation/validators/validation-composite'
import { ValidationSpy } from '@/tests/validation/mocks/mock-field-validation'
import faker from 'faker'

describe('ValidationComposite', () => {
  test('should return error if any validation fails', () => {
    const field = faker.database.column()
    const firstErrorMessage = faker.random.word()
    const secondErrorMessage = faker.random.word()
    const validationSpy = new ValidationSpy(field)
    validationSpy.error = new Error(firstErrorMessage)
    const validationSpy2 = new ValidationSpy(field)
    validationSpy2.error = new Error(secondErrorMessage)

    const sut = new ValidationComposite([validationSpy, validationSpy2])
    const error = sut.validate(field, faker.random.word())
    expect(error).toBe(error)
    expect(error).toBe(firstErrorMessage)
  })
})
