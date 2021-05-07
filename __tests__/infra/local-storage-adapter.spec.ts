import { LocalStorageAdapter } from '@/infra/local-storage-adapter'
import faker from 'faker'
import 'jest-localstorage-mock'

describe('LocalStorageAdapter', () => {
  beforeEach(() => localStorage.clear())

  test('should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const values = faker.random.word()
    await sut.set(key, values)
    expect(localStorage.setItem).toBeCalledWith(key, values)
  })
})
