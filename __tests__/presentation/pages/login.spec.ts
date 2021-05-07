import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import router from '@/presentation/components/router'
import { InvalidCredentialError } from '@/domain/errors/invalid-credential-error'
import { Login } from '@/presentation/pages'
import { mount, VueWrapper, flushPromises, config } from '@vue/test-utils'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { AuthenticationSpy } from '@/tests/domain/mocks'
import faker from 'faker'

class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string
  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}

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
  await populateEmailField(sut, email)
  await populatePasswordField(sut, password)
  await sut.find('button').trigger('submit')
}

const populateEmailField = async (
  sut: VueWrapper<any>,
  email = faker.internet.email()
): Promise<void> => {
  await sut.find('input[type="email"]').setValue(email)
}

const populatePasswordField = async (
  sut: VueWrapper<any>,
  password = faker.internet.password()
): Promise<void> => {
  await sut.find('input[type="password"]').setValue(password)
}

const simulateStatusField = (
  sut: VueWrapper<any>,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.find(`[data-test="${fieldName}-status"]`)

  expect(fieldStatus.attributes('title')).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.text()).toBe(validationError ? '🔴' : '🟢')
}

describe('Login', () => {
  test('should start with initial state', async () => {
    const { sut } = makeSut()
    await router.isReady()
    const statusWrap = sut.find('[data-test="status-wrap"]')
    expect(statusWrap.element.childElementCount).toBe(0)

    const submitButton = await sut.find('button')
    expect(submitButton.element.disabled).toBeTruthy()

    const emailStatus = sut.find('[data-test="email-status"]')
    expect(emailStatus.attributes('title')).toBe('Campo obrigatório')
    expect(emailStatus.text()).toBe('🔴')

    const passwordStatus = sut.find('[data-test="password-status"]')
    expect(passwordStatus.attributes('title')).toBe('Campo obrigatório')
    expect(passwordStatus.text()).toBe('🔴')
  })

  test('should call validation with correct email', async () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    await populateEmailField(sut, email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('should call validation with correct password', async () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.email()
    await populatePasswordField(sut, password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('should show email error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await populateEmailField(sut)
    simulateStatusField(sut, 'email', validationError)
  })

  test('should show password error if validation fails', async () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    await populatePasswordField(sut)
    simulateStatusField(sut, 'password', validationError)
  })

  test('should show valid email state if Validation success', async () => {
    const { sut } = makeSut()
    await populateEmailField(sut)
    simulateStatusField(sut, 'email')
  })

  test('should show valid password state if Validation success', async () => {
    const { sut } = makeSut()
    await populatePasswordField(sut)
    simulateStatusField(sut, 'password')
  })

  test('should enable submit button if form is valid', async () => {
    const { sut } = makeSut()
    await populateEmailField(sut)
    await populatePasswordField(sut)
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
    await populateEmailField(sut)
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
