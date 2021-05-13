import { SaveAccessTokenMock } from '@/tests/data/mocks/mock-storage'
import {
  simulateStatusField,
  testFieldStatus,
  populateField,
} from '@/tests/presentation/helper/form-helper'
import router from '@/presentation/router/router'
import { InvalidCredentialError } from '@/domain/errors/invalid-credential-error'
import { Login } from '@/presentation/pages'
import { mount, VueWrapper, flushPromises } from '@vue/test-utils'
import { testFieldChildCount, ValidationSpy } from '@/tests/presentation/mocks'
import { AuthenticationSpy } from '@/tests/domain/mocks'
import faker from 'faker'

type SutTypes = {
  sut: VueWrapper<any>
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const makeSut = (paramError?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()
  validationSpy.errorMessage = paramError?.validationError || ''
  const authenticationSpy = new AuthenticationSpy()

  const props = {
    validation: validationSpy,
    authentication: authenticationSpy,
    saveAccessToken: saveAccessTokenMock,
  }

  const sut = mount(Login, {
    props,
    global: {
      plugins: [router],
    },
  })

  return { sut, validationSpy, authenticationSpy, saveAccessTokenMock }
}

const simulateValidSubmit = async (
  sut: VueWrapper<any>,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  await populateField(sut, 'email', email)
  await populateField(sut, 'password', password)
  await sut.find('button').trigger('submit')
}

describe('Login', () => {
  test('should start with initial state', async () => {
    const { sut } = makeSut()
    await router.isReady()
    testFieldChildCount(sut, 'status-wrap', 0)

    const submitButton = await sut.find('button')
    expect(submitButton.element.disabled).toBeTruthy()

    await testFieldStatus(sut, 'email', 'Campo obrigatório', '🔴')
    await testFieldStatus(sut, 'password', 'Campo obrigatório', '🔴')
  })

  test('should call validation with correct email', async () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    await populateField(sut, 'email', email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('should call validation with correct password', async () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.email()
    await populateField(sut, 'password', password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('should show email error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await populateField(sut, 'email', faker.internet.email())
    simulateStatusField(sut, 'email', validationError)
  })

  test('should show password error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await populateField(sut, 'password', faker.internet.password())
    simulateStatusField(sut, 'password', validationError)
  })

  test('should show valid email state if Validation success', async () => {
    const { sut } = makeSut()
    await populateField(sut, 'email', faker.internet.email())
    simulateStatusField(sut, 'email')
  })

  test('should show valid password state if Validation success', async () => {
    const { sut } = makeSut()
    await populateField(sut, 'password', faker.internet.password())

    simulateStatusField(sut, 'password')
  })

  test('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    await populateField(sut, 'email', faker.internet.email())
    await populateField(sut, 'password', faker.internet.password())
    const submitButton = sut.find('button')

    expect(submitButton.element.disabled).toBeFalsy()
  })

  test('should spinner on submit', async () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    const spinner = sut.find('[data-test="spinner"]')
    expect(spinner.isVisible).toBeTruthy()
  })

  test('should call Authentication with correct value', async () => {
    const { sut, authenticationSpy } = makeSut()
    const password = faker.internet.password()
    const email = faker.internet.email()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  test('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    await populateField(sut, 'email', faker.internet.email())
    await sut.find('button').trigger('submit')
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    const statusWrap = sut.find('[data-test="status-wrap"]')
    const mainError = sut.find('[data-test="main-error"]')
    expect(mainError.text()).toBe(error.message)
    expect(statusWrap.element.childElementCount).toBe(1)
  })

  test('should call SaveAccessToken with correct token', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()
    const accessToken = authenticationSpy.account.accessToken
    await simulateValidSubmit(sut)
    expect(saveAccessTokenMock.accessToken).toBe(accessToken)
  })

  test('should contains route-link to signup', () => {
    const { sut } = makeSut()
    const signup = sut.find('[data-test="register"]')
    expect(signup.attributes().href).toBe('/signup')
  })

  test('should change the current location when pushing', async () => {
    const { sut } = makeSut()
    sut.vm.$router.push('/signup')
    await flushPromises()
    expect(sut.vm.$route).toMatchObject({
      name: 'signup',
      path: '/signup',
    })
  })
})
