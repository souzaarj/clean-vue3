import { InvalidCredentialError } from '@/domain/errors/invalid-credential-error'
import { Login } from '@/presentation/pages'
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/vue'
import { ValidationSpy } from '@/tests/presentation/mocks/'
import { AuthenticationSpy } from '@/tests/domain/mocks'
import { mockAccountModel } from '@/tests/domain/mocks/mock-account'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (paramError?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = paramError?.validationError || ''
  const authenticationSpy = new AuthenticationSpy()
  const sut = render(Login, {
    props: { validation: validationSpy, authentication: authenticationSpy },
  })
  return { sut, validationSpy, authenticationSpy }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  await populateEmailField(sut, email)
  await populatePasswordField(sut, password)
  const submitButton = sut.getByText('Entrar')
  await fireEvent.click(submitButton)
}

const populateEmailField = async (
  sut: RenderResult,
  email = faker.internet.email()
): Promise<void> => {
  const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
  await fireEvent.update(emailInput, email)
}

const populatePasswordField = async (
  sut: RenderResult,
  password = faker.internet.password()
): Promise<void> => {
  const passwordInput = sut.getByPlaceholderText('Digite sua senha')
  await fireEvent.update(passwordInput, password)
}

const simulateStatusField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login', () => {
  test('should start with initial state', () => {
    const { sut } = makeSut()

    const statusWrap = sut.getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement
    expect(submitButton.disabled).toBeTruthy()

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
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
    const submitButton = sut.getByText('Entrar') as HTMLButtonElement

    expect(submitButton.disabled).toBeFalsy()
  })

  test('should spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
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
    fireEvent.submit(sut.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    const statusWrap = sut.getByTestId('status-wrap')
    await waitFor(() => statusWrap)
    const mainError = sut.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
    expect(statusWrap.childElementCount).toBe(1)
  })
})
