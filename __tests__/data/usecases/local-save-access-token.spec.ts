import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { LocalSaveAccessToken } from '@/data/usecases/local-save-access-token'
import { SetStorageSpy } from '@/tests/data/mocks/mock-storage'
import faker from 'faker'

type SutTypes = {
  sut: SaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy,
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', () => {
    const accessToken = faker.random.alphaNumeric()
    const { sut, setStorageSpy } = makeSut()
    sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
