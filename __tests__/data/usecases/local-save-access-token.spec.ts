import { LocalSaveAccessToken } from '@/data/usecases/local-save-access-token'
import { SetStorageSpy } from '@/tests/data/mocks/mock-storage'
import faker from 'faker'

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', () => {
    const setStorageSpy = new SetStorageSpy()
    const sut = new LocalSaveAccessToken(setStorageSpy)
    const accessToken = faker.random.alphaNumeric()
    sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
