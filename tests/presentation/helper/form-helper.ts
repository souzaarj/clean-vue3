import { VueWrapper } from '@vue/test-utils'

export const simulateStatusField = (
  sut: VueWrapper<any>,
  fieldName: string,
  validationError?: string
): void => {
  const fieldStatus = sut.find(`[data-test="${fieldName}-status"]`)

  expect(fieldStatus.attributes('title')).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.text()).toBe(validationError ? '🔴' : '🟢')
}

export const testFieldChildCount = (
  sut: VueWrapper<any>,
  field: string,
  count: number
): void => {
  const statusWrap = sut.find(`[data-test="${field}"]`)
  expect(statusWrap.element.childElementCount).toBe(count)
}

export const testFieldStatus = (
  sut: VueWrapper<any>,
  field: string,
  title: string,
  text: string
): void => {
  const fieldStatus = sut.find(`[data-test=${field}-status]`)

  expect(fieldStatus.attributes('title')).toBe(title)
  expect(fieldStatus.text()).toBe(text)
}

export const populateField = async (
  sut: VueWrapper<any>,
  field: string,
  value: string
): Promise<void> => {
  const input = sut.find(`input[name=${field}]`)
  await input.setValue(value)
}
