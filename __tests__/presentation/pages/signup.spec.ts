import { Signup } from '@/presentation/pages'
import { mount, VueWrapper } from '@vue/test-utils'
import router from '@/presentation/router/router'

type SutTypes = {
  sut: VueWrapper<any>
}

const makeSut = (): SutTypes => {
  const sut = mount(Signup, { global: { plugins: [router] } })
  return { sut }
}

describe('Signup', () => {
  test('should start with initial state', () => {
    router.isReady()
    const { sut } = makeSut()
    const statusWrap = sut.find('[data-test="status-wrap"]')
    expect(statusWrap.element.childElementCount).toBe(0)

    const button = sut.find('button')
    expect(button.element.disabled).toBeTruthy()

    const nameStatus = sut.find('[data-test="name-status"]')
    expect(nameStatus.attributes('title')).toBe('Campo obrigatório')
    expect(nameStatus.text()).toBe('🔴')

    const emailStatus = sut.find('[data-test="email-status"]')
    expect(emailStatus.attributes('title')).toBe('Campo obrigatório')
    expect(emailStatus.text()).toBe('🔴')

    const passwordStatus = sut.find('[data-test="password-status"]')
    expect(passwordStatus.attributes('title')).toBe('Campo obrigatório')
    expect(passwordStatus.text()).toBe('🔴')

    const passwordConfirmationStatus = sut.find(
      '[data-test="passwordConfirmation-status"]'
    )
    expect(passwordConfirmationStatus.attributes('title')).toBe(
      'Campo obrigatório'
    )
    expect(passwordConfirmationStatus.text()).toBe('🔴')
  })
})
