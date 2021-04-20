import { Login } from '@/presentation/pages'
import { render, RenderResult, fireEvent } from '@testing-library/vue'
import { ValidationSpy } from '@/tests/presentation/mocks/'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = faker.random.words()
  const sut = render(Login, { props: { validation: validationSpy } })
  return { sut, validationSpy }
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
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    const email = faker.internet.email()
    await fireEvent.update(emailInput, email)
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe(email)
  })

  test('should call validation with correct password', async () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.email()
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    await fireEvent.update(passwordInput, password)
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe(password)
  })

  test('should show email if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    await fireEvent.update(emailInput, email)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationSpy.errorMessage)
    expect(emailStatus.textContent).toBe('🔴')
  })

  test('should show email if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    await fireEvent.update(passwordInput, password)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationSpy.errorMessage)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should show valid email state if Validation success', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = ''
    const email = faker.internet.email()
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    await fireEvent.update(emailInput, email)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  test('should show valid password state if Validation success', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = ''
    const password = faker.internet.password()
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    await fireEvent.update(passwordInput, password)
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })
  test('should enable submit button if form is valid', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.errorMessage = ''
    const password = faker.internet.password()
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    await fireEvent.update(passwordInput, password)
    const email = faker.internet.email()
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    await fireEvent.update(emailInput, email)
    const submitButton = sut.getByText('Entrar') as HTMLButtonElement

    expect(submitButton.disabled).toBeFalsy()
  })
})
