import { Login } from '@/presentation/pages'
import { render } from '@testing-library/vue'

describe('Login', () => {
  test('should note render spinner and error on start', () => {
    const { getByTestId } = render(Login)
    const statusWrap = getByTestId('status-wrap')
    expect(statusWrap.childElementCount).toBe(0)
  })
})
