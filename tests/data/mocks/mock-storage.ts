import { SaveAccessToken } from '@/domain/usecases/save-access-token'
import { SetStorage } from '@/data/protocols/set-storage'

export class SetStorageMock implements SetStorage {
  key: string
  value: any
  async set(key: string, value: any): Promise<void> {
    this.key = key
    this.value = value
  }
}

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string
  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}
