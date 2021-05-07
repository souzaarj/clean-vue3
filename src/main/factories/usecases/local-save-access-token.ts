import { LocalStorageAdapter } from '@/infra/local-storage-adapter'
import { LocalSaveAccessToken } from '@/data/usecases/local-save-access-token'
import { SaveAccessToken } from '@/domain/usecases/save-access-token'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  const localStorageAdapter = new LocalStorageAdapter()
  return new LocalSaveAccessToken(localStorageAdapter)
}
