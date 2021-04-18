import { Login } from '@/presentation/pages'
import { getByDisplayValue, render } from '@testing-library/vue'

describe('Login', () => {
  test('should start with initial state', () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(Login)
    const statusWrap = getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)

    const submitButton = getByText('Entrar') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = getByTestId('email-status') as HTMLButtonElement

    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId('password-status') as HTMLButtonElement

    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })
})
