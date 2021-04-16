import { Login } from '@/presentation/pages'
import { render } from '@testing-library/vue'

describe('Login', () => {
  test('should note render spinner and error on start', () => {
    const { getByTestId } = render(Login)
    const statusWrap = getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)
  })

  test('should disable button on start', () => {
    const { getByText } = render(Login)
    const submitButton = getByText('Entrar') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
  })
})
