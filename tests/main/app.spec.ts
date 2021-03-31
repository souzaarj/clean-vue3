import { mount } from '@vue/test-utils'
import Helloworld from '@/main/components/helloworld.vue'
import { render, screen, fireEvent } from '@testing-library/vue'
import faker from 'faker'

/* eslint-disable no-undef */
describe('App', () => {
  test('should print message', () => {
    // const wrapper = shallowMount(Helloworld, { props: { msg: 'ok' } })
    // expect(wrapper.text()).toContain('ok')
    const msg = faker.random.word()
    const sut = render(Helloworld, { props: { msg: msg } })
    const text = sut.queryByTestId('test-msg')
    expect(text.textContent).toBe(msg)
  })
})
