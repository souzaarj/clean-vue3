import { AddAccount } from './../../../src/domain/usecases/add-account'
import { mockAddAccount } from '@/tests/domain/mocks'
import { AddAccountSpy } from './../../domain/mocks/mock-account'
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
  addAccountSpy: AddAccountSpy
}
type SutParams = {
  validationError: string
}

const makeSut = (paramError?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()

  const props = { validation: validationSpy, addAccount: addAccountSpy }
  validationSpy.errorMessage = paramError?.validationError || ''
  const sut = mount(Signup, {
    props,
    global: {
      plugins: [router],
    },
  })
  return { sut, validationSpy, addAccountSpy }
}

const simulateSignupFormSubmit = async (
  sut: VueWrapper<any>,
  name = faker.internet.userName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
  passwordConfirmation = faker.internet.password()
): Promise<void> => {
  await populateField(sut, 'name', name)
  await populateField(sut, 'email', email)
  await populateField(sut, 'password', password)
  await populateField(sut, 'passwordConfirmation', passwordConfirmation)
  const button = sut.find('button')
  await button.trigger('submit')
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

  test('should show email error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const email = faker.internet.email()
    await populateField(sut, 'email', email)
    simulateStatusField(sut, 'email', validationError)
  })

  test('should show password error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const password = faker.internet.password()
    await populateField(sut, 'password', password)
    simulateStatusField(sut, 'password', validationError)
  })

  test('should show passwordConfirmation error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordConfirmation = faker.internet.password()
    await populateField(sut, 'passwordConfirmation', passwordConfirmation)
    simulateStatusField(sut, 'passwordConfirmation', validationError)
  })

  test('should show valid name state if validation success', async () => {
    const { sut } = makeSut()
    await populateField(sut, 'name', faker.internet.userName())
    simulateStatusField(sut, 'name')
  })

  test('should show valid email state if validation success', async () => {
    const { sut } = makeSut()
    await populateField(sut, 'email', faker.internet.email())
    simulateStatusField(sut, 'email')
  })

  test('should show valid password state if validation success', async () => {
    const { sut } = makeSut()
    await populateField(sut, 'password', faker.internet.password())
    simulateStatusField(sut, 'password')
  })

  test('should show valid passwordConfirmation state if validation success', async () => {
    const { sut } = makeSut()
    await populateField(sut, 'passwordConfirmation', faker.internet.password())
    simulateStatusField(sut, 'passwordConfirmation')
  })

  test('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    await populateField(sut, 'name', faker.internet.userName())
    await populateField(sut, 'email', faker.internet.email())
    await populateField(sut, 'password', faker.internet.password())
    await populateField(sut, 'passwordConfirmation', faker.internet.password())
    const button = sut.find('button')
    expect(button.element.disabled).toBeFalsy()
  })

  test('should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateSignupFormSubmit(sut)
    const spinner = sut.find('[data-test="spinner"]')
    expect(spinner.isVisible).toBeTruthy()
  })

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const addAccountParams = mockAddAccount()

    await simulateSignupFormSubmit(
      sut,
      addAccountParams.name,
      addAccountParams.email,
      addAccountParams.password,
      addAccountParams.passwordConfirmation
    )
    expect(addAccountSpy.params).toEqual(addAccountParams)
  })
})
