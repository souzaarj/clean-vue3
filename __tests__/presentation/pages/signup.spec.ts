import {
  testFieldStatus,
  testFieldChildCount,
} from '@/tests/presentation/helper/test-helper'
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
})
