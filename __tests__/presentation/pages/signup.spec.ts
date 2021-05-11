import { ValidationSpy } from '@/tests/presentation/mocks'
import {
  populateField,
  simulateStatusField,
} from '@/tests/presentation/helper/test-helper'

import {
  testFieldStatus,
  testFieldChildCount,
} from '@/tests/presentation/helper/test-helper'

import { Signup } from '@/presentation/pages'
import { mount, VueWrapper } from '@vue/test-utils'
import router from '@/presentation/router/router'
import faker from 'faker'

type SutTypes = {
  sut: VueWrapper<any>
  validationSpy: ValidationSpy
}
type SutParams = {
  validationError: string
}

const makeSut = (paramError?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const props = { validation: validationSpy }
  validationSpy.errorMessage = paramError?.validationError || ''
  const sut = mount(Signup, {
    props,
    global: {
      plugins: [router],
    },
  })
  return { sut, validationSpy }
}

describe('Signup', () => {
  test('should start with initial state', () => {
    router.isReady()
    const { sut } = makeSut()

    testFieldChildCount(sut, 'status-wrap', 0)

    const button = sut.find('button')
    expect(button.element.disabled).toBeTruthy()

    testFieldStatus(sut, 'name-status', 'Campo obrigatório', '🔴')
    testFieldStatus(sut, 'email-status', 'Campo obrigatório', '🔴')
    testFieldStatus(sut, 'password-status', 'Campo obrigatório', '🔴')
    testFieldStatus(
      sut,
      'passwordConfirmation-status',
      'Campo obrigatório',
      '🔴'
    )
  })
  test('should call Validation with correct name', async () => {
    const { sut, validationSpy } = makeSut()
    const name = faker.internet.userName()

    await populateField(sut, 'name', name)
    expect(validationSpy.fieldName).toBe('name')
    expect(validationSpy.fieldValue).toBe(name)
  })

  test('should call Validation with correct email', async () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()

    await populateField(sut, 'email', email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })
  test('should call Validation with correct password', async () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.userName()

    await populateField(sut, 'password', password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('should call Validation with correct passwordConfirmation', async () => {
    const { sut, validationSpy } = makeSut()
    const passwordConfirmation = faker.internet.userName()

    await populateField(sut, 'passwordConfirmation', passwordConfirmation)
    expect(validationSpy.fieldName).toBe('passwordConfirmation')
    expect(validationSpy.fieldValue).toBe(passwordConfirmation)
  })

  test('should show name error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const name = faker.internet.userName()
    await populateField(sut, 'name', name)
    simulateStatusField(sut, 'name', validationError)
  })
})
