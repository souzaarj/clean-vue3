import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { LocalSaveAccessToken } from '@/data/usecases/local-save-access-token'
import { SetStorageMock } from '@/tests/data/mocks/mock-storage'
import faker from 'faker'

type SutTypes = {
  sut: SaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock,
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', () => {
    const accessToken = faker.random.alphaNumeric()
    const { sut, setStorageMock } = makeSut()
    sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})
