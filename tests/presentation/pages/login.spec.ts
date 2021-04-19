import { Validation } from '@/presentation/protocols/validation'
import { Login } from '@/presentation/pages'
import { render, RenderResult, fireEvent } from '@testing-library/vue'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  fieldName = ''
  fieldValue = ''
  errorMessage = ''
  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(Login, { props: { validation: validationSpy } })
  return { sut, validationSpy }
}

describe('Login', () => {
  test('should start with initial state', () => {
    const { sut } = makeSut()

    const statusWrap = sut.getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)

    const submitButton = sut.getByText('Entrar') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status') as HTMLButtonElement

    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId(
      'password-status'
    ) as HTMLButtonElement

    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  test('should call validation with correct email', async () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByPlaceholderText('Digite seu e-mail')
    await fireEvent.update(emailInput, 'any_email')
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  test('should call validation with correct password', async () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByPlaceholderText('Digite sua senha')
    await fireEvent.update(passwordInput, 'any_password')
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
})
