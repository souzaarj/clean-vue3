import { mount } from '@vue/test-utils'
import Helloworld from '../../src/main/components/helloworld.vue'

/* eslint-disable no-undef */
describe('Name of the group', () => {
  test('should ', () => {
    const wrapper = mount(Helloworld, { props: { msg: 'ok' } })

    expect(wrapper.text()).toContain('ok')
  })
})
