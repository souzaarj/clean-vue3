import { Login } from '@/presentation/pages'
// import { mount } from '@vue/test-utils'
import { render } from '@testing-library/vue'

describe('Login', () => {
  test('should ', () => {
    // const wrapper = mount(Login)

    const { queryAllByPlaceholderText } = render(Login)
    const email = queryAllByPlaceholderText('Digite seu e-mail')
    console.log(email)
  })
})
